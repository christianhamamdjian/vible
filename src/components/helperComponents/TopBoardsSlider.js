import React, { useState } from 'react'
import Confirm from "./Confirm"
import { MoodboardContext } from "../../context/moodboardContext"

const TopBoardsSlider = () => {
    const { boards, boardIndex, handleChangeBoard, handleAddNewBoard, handleDeleteBoard, activeBoard, handleBoardIndexUpdate } = React.useContext(MoodboardContext)

    const [onShow, setOnShow] = useState(false)
    const [item, setItem] = useState("")

    const chunkArray = (arr, size) =>
        arr.length > size
            ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
            : [arr];

    const chunkContent = chunkArray(boards, 2)[boardIndex]

    const chunkButtons = () => {
        if (chunkContent && chunkContent.length > 0) {
            return chunkArray(boards, 2)[boardIndex]
        }
    }
    const chunk = (<div>
        {chunkButtons() && chunkButtons().map((el, i) => {
            return (<button
                // className={`${boardIndex === 0 ? "active-board-button" : "board-button"}`}
                className="board-button"
                style={{ backgroundColor: el.id === activeBoard.id ? "red" : "" }}
                key={i}
                onClick={() => handleChangeBoard(el.id)}
            >
                {el.name}
            </button>
            )
        })}
    </div>
    )

    const maxIndex = chunkArray(boards, 2).length - 1

    const confirmClear = (foo) => {
        if (foo === "board") {
            handleDeleteBoard(chunkContent)
        }
        hideConfirm()
    }
    const confirmCancel = () => {
        hideConfirm()
        return
    }
    const showConfirm = (bar) => {
        setItem(bar)
        setOnShow(true)
    }
    const hideConfirm = () => {
        setOnShow(false)
    }
    return (
        <>
            <div
                className='inputs-boards_objects'
            >

                <label>Boards:</label>
                <button
                    style={{
                        backgroundColor: `${boardIndex === 0 ? "transparent" : "#8e8e93"}`,
                        color: `${boardIndex === 0 ? "transparent" : "#ffffff"}`,
                    }}
                    onClick={() => handleBoardIndexUpdate(boardIndex - 1)}
                    className="inputs-boards_objects-nav"
                    disabled={boardIndex === 0}
                >
                    <svg
                        height="15"
                        width="15"
                        transform='rotate(180)'
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                    >
                        <path
                            fill="currentColor"
                            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                        />
                    </svg>
                </button>
                <button
                    className='inputs-boards_objects-button'
                    title="Add new board"
                    onClick={handleAddNewBoard}
                >+</button>
                <button
                    className='inputs-boards_objects-button'
                    title="Remove active board"
                    disabled={boards.length < 2}
                    onClick={() => showConfirm("board")}
                >-</button>
                {chunk}
                <button
                    style={{
                        backgroundColor: `${boardIndex === maxIndex ? "transparent" : "#8e8e93"} `,
                        color: `${boardIndex === maxIndex ? "transparent" : "#ffffff"}`,
                    }}
                    onClick={() => handleBoardIndexUpdate(boardIndex + 1)}
                    className="inputs-boards_objects-nav"
                    disabled={boardIndex === maxIndex}
                >
                    <svg
                        height="15"
                        width="15"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                    >
                        <path
                            fill="currentColor"
                            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                        />
                    </svg>
                </button>

            </div>
            {onShow &&
                // <div className='inputs-boards_objects'>
                <Confirm confirmCancel={confirmCancel} item={item} confirmClear={confirmClear} position="board-slider" />
                // </div>
            }
        </>
    )
}

export default TopBoardsSlider
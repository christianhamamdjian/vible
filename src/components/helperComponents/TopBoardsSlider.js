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
                {boardIndex !== 0 && <button
                    style={{
                        backgroundColor: `${boardIndex === 0 ? "transparent" : "#ffffff"}`,
                        color: `${boardIndex === 0 ? "transparent" : "#8e8e93"}`,
                    }}
                    onClick={() => handleBoardIndexUpdate(boardIndex - 1)}
                    className="inputs-boards_objects-nav"
                    disabled={boardIndex === 0}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>}
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
                {boardIndex !== maxIndex && <button
                    style={{
                        backgroundColor: `${boardIndex === maxIndex ? "transparent" : "#ffffff"} `,
                        color: `${boardIndex === maxIndex ? "transparent" : "#8e8e93"}`,
                    }}
                    onClick={() => handleBoardIndexUpdate(boardIndex + 1)}
                    className="inputs-boards_objects-nav"
                    disabled={boardIndex === maxIndex}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>}

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
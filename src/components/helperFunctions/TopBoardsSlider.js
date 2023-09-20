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
    console.log(boardIndex)
    const chunk = (<div>
        {chunkButtons() && chunkButtons().map((el, i) => {
            return (<button
                className={`${boardIndex === 0 ? "active-board" : ""}`}
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
                {onShow &&
                    <div className='inputs-boards_objects'>
                        <Confirm confirmCancel={confirmCancel} item={item} confirmClear={confirmClear} />
                    </div>}
                <label>Boards:</label>
                <button
                    style={{
                        backgroundColor: `${boardIndex === 0 ? "#ffffff" : "#8e8e93"}`,
                        color: `${boardIndex === 0 ? "#ffffff" : "#ffffff"}`,
                    }}
                    onClick={() => handleBoardIndexUpdate(boardIndex - 1)}
                    className="inputs-boards_objects-nav"
                    disabled={boardIndex === 0}
                >&lt;</button>
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
                        backgroundColor: `${boardIndex === maxIndex ? "#ffffff" : "#8e8e93"} `,
                        color: `${boardIndex === maxIndex ? "#ffffff" : "#ffffff"}`,
                    }}
                    onClick={() => handleBoardIndexUpdate(boardIndex + 1)}
                    className="inputs-boards_objects-nav"
                    disabled={boardIndex === maxIndex}
                >&gt;</button>

            </div>

        </>
    )
}

export default TopBoardsSlider
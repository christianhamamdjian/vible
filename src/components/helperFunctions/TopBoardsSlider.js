import React from 'react'
import { MoodboardContext } from "../../context/moodboardContext"

const TopBoardsSlider = () => {
    const { boards, boardIndex, handleChangeBoard, handleAddNewBoard, handleDeleteBoard, activeBoard, handleBoardIndexUpdate } = React.useContext(MoodboardContext)

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

    return (
        <>
            <div
                className='inputs-top_objects'
            // style={{ position: "absolute", right: "12%", top: "5rem", zIndex: "100" }}
            >
                <h4>Boards:</h4>
                <button style={{
                    backgroundColor: `${boardIndex === 0 ? "#ffffff" : "#8e8e93"}`,
                    color: "#cccccc",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    border: "1px solid #dddddd"
                }}
                    onClick={() => handleBoardIndexUpdate(boardIndex - 1)}
                    className="prev"
                    disabled={boardIndex === 0}
                >&lt;</button>
                <button style={{
                    backgroundColor: `${boardIndex === 0 ? "#ffffff" : "#8e8e93"}`,
                    color: "#cccccc",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    border: "1px solid #dddddd"
                }}
                    onClick={handleAddNewBoard}
                >+</button>
                <button style={{
                    backgroundColor: `${boardIndex === 0 ? "#ffffff" : "#8e8e93"}`,
                    color: "#cccccc",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    border: "1px solid #dddddd"
                }}
                    disabled={boards.length < 2}
                    onClick={() => handleDeleteBoard(chunkContent)}
                >-</button>
                {chunk}
                <button
                    style={{
                        backgroundColor: `${boardIndex === maxIndex ? "#ffffff" : "#8e8e93"} `,
                        color: "#dddddd",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        border: "1px solid #cccccc"
                    }}
                    onClick={() => handleBoardIndexUpdate(boardIndex + 1)}
                    className="next"
                    disabled={boardIndex === maxIndex}
                >&gt;</button>
            </div>
        </>
    )
}

export default TopBoardsSlider
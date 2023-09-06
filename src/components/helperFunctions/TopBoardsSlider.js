import React, { useState } from 'react'

const TopBoardsSlider = ({ boards = { board1: "1", board2: "2", board3: "3" }, changeBoard, addNewBoard }) => {

    const allBoards = Object.entries(boards)
    const [boardsList, setBoardsList] = useState(allBoards);
    const [index, setIndex] = useState(0);

    const chunkArray = (arr, size) =>
        arr.length > size
            ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
            : [arr];

    const chunk = (<div>
        {chunkArray(boardsList, 2)[index].map((el, i) => {
            return (<button key={i} onClick={() => changeBoard(el[0])}>{el[1]}</button>)
        })}
    </div>)

    const maxIndex = chunkArray(boardsList, 2).length - 1

    return (
        <>

            <div className='inputs-top_objects' style={{ position: "absolute", right: "12%", top: "1rem", zIndex: "100" }} >
                <h4>Boards:</h4>
                <button style={{
                    backgroundColor: `${index === 0 ? "#ffffff" : "#8e8e93"}`,
                    color: "#cccccc",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    border: "1px solid #dddddd"
                }}
                    onClick={() => setIndex(index - 1)}
                    className="prev"
                    disabled={index === 0}
                >&lt;</button>
                <button style={{
                    backgroundColor: `${index === 0 ? "#ffffff" : "#8e8e93"}`,
                    color: "#cccccc",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    border: "1px solid #dddddd"
                }}
                    onClick={addNewBoard}
                >+</button>
                {chunk}
                <button
                    style={{
                        backgroundColor: `${index === maxIndex ? "#ffffff" : "#8e8e93"} `,
                        color: "#dddddd",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        border: "1px solid #cccccc"
                    }}
                    onClick={() => setIndex(index + 1)}
                    className="next"
                    disabled={index === maxIndex}
                >&gt;</button>
            </div>
        </>
    )
}

export default TopBoardsSlider
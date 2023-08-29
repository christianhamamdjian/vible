import React, { useState } from 'react'

const TopButtonsSlider = ({ toolButtons, changeTool }) => {

    const allButtons = Object.entries(toolButtons)
    const [buttons, setButtons] = useState(allButtons);
    const [index, setIndex] = useState(0);

    const chunkArray = (arr, size) =>
        arr.length > size
            ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
            : [arr];

    const chunk = (<div>
        {chunkArray(buttons, 4)[index].map((el, i) => {
            return (<button key={i} onClick={() => changeTool(el[0])}>{el[1]}</button>)
        })}
    </div>)

    const maxIndex = chunkArray(buttons, 4).length - 1

    return (
        <>
            <button style={{ backgroundColor: "#ffffff", color: "#cccccc", border: "1px solid #cccccc" }}
                onClick={() => setIndex(index - 1)}
                className="prev"
                disabled={index === 0}
            >&lt;</button>
            {chunk}
            <button
                style={{ backgroundColor: "#ffffff", color: "#cccccc", border: "1px solid #cccccc" }}
                onClick={() => setIndex(index + 1)}
                className="next"
                disabled={index === maxIndex}
            >&gt;</button>
        </>
    )
}

export default TopButtonsSlider
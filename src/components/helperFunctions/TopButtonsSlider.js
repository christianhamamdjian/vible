import React, { useState } from 'react'

const TopButtonsSlider = ({ toolButtons, changeTool }) => {

    const allButtons = Object.entries(toolButtons)
    const [buttons, setButtons] = useState(allButtons);
    const [index, setIndex] = useState(0);

    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 800;
    React.useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    const chunkArray = (arr, size) =>
        arr.length > size
            ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
            : [arr];

    const chunk = (<div>
        {chunkArray(buttons, width > breakpoint ? 5 : 2)[index].map((el, i) => {
            return (<button key={i} onClick={() => changeTool(el[0])}>{el[1]}</button>)
        })}
    </div>)

    const maxIndex = chunkArray(buttons, width > breakpoint ? 5 : 2).length - 1

    return (
        <>

            <button style={{
                backgroundColor: `${index === 0 ? "#ffffff" : "#8e8e93"}`,
                color: "#cccccc",
                fontWeight: "bold",
                fontSize: "1.4rem",
                // border: "1px solid #dddddd",
                borderRadius: "2rem"
            }}
                onClick={() => setIndex(index - 1)}
                className="prev"
                disabled={index === 0}
            >&lt;</button>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    // width: "32rem"
                }}>
                {chunk}
            </div>
            <button
                style={{
                    backgroundColor: `${index === maxIndex ? "#ffffff" : "#8e8e93"} `,
                    color: "#dddddd",
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    // border: "1px solid #dddddd",
                    borderRadius: "2rem"
                }}
                onClick={() => setIndex(index + 1)}
                className="next"
                disabled={index === maxIndex}
            >&gt;</button>

        </>
    )
}

export default TopButtonsSlider
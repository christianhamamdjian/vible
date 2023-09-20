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

            <button
                onClick={() => setIndex(index - 1)}
                className={`${index === 0 ? "top-buttons-slider-disabled" : "top-buttons-slider-prev"}`}
                disabled={index === 0}
            >&lt;</button>
            <div
                className='top-buttons-slider-chunk'
            >
                {chunk}
            </div>
            <button
                onClick={() => setIndex(index + 1)}
                className={`${index === maxIndex ? "top-buttons-slider-disabled" : "top-buttons-slider-next"}`}
                disabled={index === maxIndex}
            >&gt;</button>

        </>
    )
}

export default TopButtonsSlider
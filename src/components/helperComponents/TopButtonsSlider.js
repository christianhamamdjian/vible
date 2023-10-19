import React, { useState } from 'react'
import { MoodboardContext } from "../../context/moodboardContext";

const TopButtonsSlider = ({ toolButtons, changeTool }) => {
    const { tool } = React.useContext(MoodboardContext);
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

    const chunk = (
        <div>
            {chunkArray(buttons, width > breakpoint ? 5 : 2)[index].map((el, i) => {
                return (
                    <button
                        key={i}
                        className={`${tool === el[0] ? "active-tool" : ""}`}
                        onClick={() => changeTool(el[0])}
                    >
                        {el[1]}
                    </button>
                )
            })}
        </div>
    )

    const maxIndex = chunkArray(buttons, width > breakpoint ? 5 : 2).length - 1

    return (
        <>

            {index !== 0 && <button
                onClick={() => setIndex(index - 1)}
                className={`${index === 0 ? "top-buttons-slider-disabled" : "top-buttons-slider-prev"}`}
                disabled={index === 0}
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
            <div
                className='top-buttons-slider-chunk'
            >
                {chunk}
            </div>
            {index !== maxIndex && <button
                onClick={() => setIndex(index + 1)}
                className={`${index === maxIndex ? "top-buttons-slider-disabled" : "top-buttons-slider-next"}`}
                disabled={index === maxIndex}
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
        </>
    )
}

export default TopButtonsSlider
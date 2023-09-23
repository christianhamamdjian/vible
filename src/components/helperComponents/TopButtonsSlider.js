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
            <div
                className='top-buttons-slider-chunk'
            >
                {chunk}
            </div>
            <button
                onClick={() => setIndex(index + 1)}
                className={`${index === maxIndex ? "top-buttons-slider-disabled" : "top-buttons-slider-next"}`}
                disabled={index === maxIndex}
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

        </>
    )
}

export default TopButtonsSlider
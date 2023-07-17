import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import { printPdf } from '../utils/printPdf'
import Calculator from "../../calculator/Calculator"
import { MoodboardContext } from "../../context/moodboardContext";

const RightSidebard = () => {
    const { divRef, handleClearBoard, handleClearPaths, handleZoomIn, handleZoomOut } = React.useContext(MoodboardContext);

    return (
        <div className='right-sidebar'>
            <ThemeSwitcher />
            <button onClick={() => printPdf(divRef.current)}>Download as PDF</button>
            <button onClick={handleClearBoard}>Clear board</button>
            <button onClick={handleClearPaths}>Clear drawings</button>
            <div className='sidebar-zoom'>
                <h3>Zoom:</h3>
                <button onClick={handleZoomIn}>+</button>
                <button onClick={handleZoomOut}>-</button>
            </div>
            <Calculator />
        </div>
    )
}

export default RightSidebard

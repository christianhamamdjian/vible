import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import { printPdf } from '../utils/printPdf'
import { MoodboardContext } from "../../context/moodboardContext";

const RightSidebard = () => {
    const { divRef, handlePdfDownload, handleClearBoard, handleClearPaths, handleZoomIn, handleZoomOut } = React.useContext(MoodboardContext);

    return (
        <div className='right-sidebar'>
            <ThemeSwitcher />
            {/* <button onClick={handlePdfDownload}>Download as PDF</button> */}
            <button onClick={() => printPdf(divRef.current)}>Download as PDF</button>
            <button onClick={handleClearBoard}>Clear board</button>
            <button onClick={handleClearPaths}>Clear drawings</button>
            {/* <button onClick={handleEditingBoard}>Edit items</button> */}
            <div style={{ display: "flex", justifyContent: "center", gap: '1rem' }}>
                <button onClick={handleZoomIn}>Zoom in</button>
                <button onClick={handleZoomOut}>Zoom out</button>
            </div>
        </div>
    )
}

export default RightSidebard

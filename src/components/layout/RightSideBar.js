import React from 'react'

import { MoodboardContext } from "../../context/moodboardContext";

const RightSidebard = () => {
    const { handlePdfDownload, handleClearBoard, handleEditingBoard, handleZoomIn, handleZoomOut, isMovingObjects, handleMoveObjects } = React.useContext(MoodboardContext);

    return (
        <div className='right-sidebar'>
            <button onClick={handlePdfDownload}>Download as PDF</button>
            <button onClick={handleClearBoard}>Clear board</button>
            {/* <button onClick={handleEditingBoard}>Edit items</button> */}
            <div style={{ display: "flex", justifyContent: "center", gap: '1rem' }}>
                <button onClick={handleZoomIn}>Zoom in</button>
                <button onClick={handleZoomOut}>Zoom out</button>
            </div>
            {/* <button style={isMovingObjects ? { backgroundColor: "#aabbcc" } : null} onClick={handleMoveObjects}>Move objects</button> */}
        </div>
    )
}

export default RightSidebard

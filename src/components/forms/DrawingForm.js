import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const DrawingForm = () => {
    const { isDrawing, erasing, color, line, handleDraw, handleEraser, handelLineColor, handelLineWidth, handleDownload } = React.useContext(MoodboardContext);
    return (
        <div className='itemForms'>
            <h2>Drawing:</h2>
            <div className='inputs'>
                <input
                    type="color"
                    value={color}
                    onChange={(event) => handelLineColor(event)} />
                <input
                    type="number"
                    value={line}
                    onChange={(event) => handelLineWidth(event)} />
                <button
                    style={isDrawing ? { backgroundColor: "#aabbcc" } : null}
                    onClick={handleDraw}>Add drawing</button>
                <button
                    style={erasing ? { backgroundColor: "#aabbcc" } : null}
                    onClick={handleEraser}>Delete lines</button>
                <button
                    onClick={handleDownload}>Download SVG</button>
            </div>
        </div>
    )
}
export default DrawingForm
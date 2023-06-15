import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const DrawingForm = () => {
    const { isDrawing, isErasing, color, line, handleDrawing, handleEraser, handleLineColor, handleLineWidth } = React.useContext(MoodboardContext);
    return (
        <div className='itemForms'>
            <h2>Drawing:</h2>
            <div className='inputs'>
                <label>Line color:</label>
                <input
                    type="color"
                    value={color}
                    onChange={(event) => handleLineColor(event)} />
                <label>Link thickness:</label>
                <input
                    type="number"
                    value={line}
                    onChange={(event) => handleLineWidth(event)} />
                <button
                    style={isDrawing ? { backgroundColor: "#aabbcc" } : null}
                    onClick={handleDrawing}>Add drawing</button>
                <button
                    style={isErasing ? { backgroundColor: "#aabbcc" } : null}
                    onClick={handleEraser}>Delete lines</button>
            </div>
        </div>
    )
}
export default DrawingForm
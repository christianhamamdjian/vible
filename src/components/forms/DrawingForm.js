import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const DrawingForm = () => {
    const { isDrawing, isPathMoving, handleMovePath, isErasing, color, line, handleDrawing, handleEraser, handelLineColor, handelLineWidth } = React.useContext(MoodboardContext);
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
                    onClick={handleDrawing}>Add drawing</button>
                <button
                    style={isPathMoving ? { backgroundColor: "#aabbcc" } : null}
                    onClick={handleMovePath}>Move lines</button>
                <button
                    style={isErasing ? { backgroundColor: "#aabbcc" } : null}
                    onClick={handleEraser}>Delete lines</button>
            </div>
        </div>
    )
}
export default DrawingForm
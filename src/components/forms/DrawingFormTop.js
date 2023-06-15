import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const DrawingFormTop = () => {
    const { paths, handleLineWidthChange, handleLineColorChange, handleLineAngleChange, handleScaleChange, rotation, scale, stopLineEditing, isDrawing, isEditingPath, isErasing, color, line, handleDrawing, handleEraser, handleLineColor, handleLineWidth } = React.useContext(MoodboardContext);
    return (
        <div className='itemForms-top'>
            {!isEditingPath && (
                <>
                    <h2>Drawing:</h2>
                    <div className='inputs-top'>
                        <label>Line color:</label>
                        <input
                            type="color"
                            value={color}
                            onChange={(event) => handleLineColor(event)} />
                        <label>Line width:</label>
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
                </>
            )
            }
            {paths.length > 0 && isEditingPath && (
                <>
                    <h2>Drawing:</h2>
                    <div className='inputs-top'>
                        <label>Line color:</label>
                        <input
                            type="color"
                            value={paths.find(path => path.id === isEditingPath.id).color}
                            onChange={(event) => handleLineColorChange(event, isEditingPath.id)} />
                        <label>Line width:</label>
                        <input
                            type="number"
                            value={paths.find(path => path.id === isEditingPath.id).line}
                            onChange={(event) => handleLineWidthChange(event, isEditingPath.id)} />
                        <label>Line angle:</label>
                        <input
                            type="range"
                            min="0"
                            max="360"
                            // value={paths.find(path => path.id === isEditingPath.id).angle}
                            value={rotation}
                            onChange={(event) => handleLineAngleChange(event, isEditingPath.id)} />
                        <label>Scale:</label>
                        <input
                            type="range"
                            min="0.01"
                            max="10"
                            step="0.01"
                            value={scale}
                            onChange={(event) => handleScaleChange(event, isEditingPath.id)}
                        />
                        <button
                            onClick={stopLineEditing}>
                            Done
                        </button>
                    </div>
                </>
            )}
        </div>)
}
export default DrawingFormTop
import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const DrawingFormTop = () => {
    const { paths, rotation, scaling, stopLineEditing, isDrawing, isEditingPaths, handleEditPaths, isEditingPath, isErasing, pathColor, pathLine, handleDrawing, handleEraser, handleLineColor, handleLineColorChange, handleLineWidth, handleLineWidthChange, selectedPath, handleRotateChange, handleScaleChange } = React.useContext(MoodboardContext);
    console.log(isEditingPaths);
    return (
        <div className='itemForms-top'>
            {!isEditingPath && (
                <>
                    <button
                        style={isDrawing ? { backgroundColor: "#aabbcc" } : null}
                        onClick={handleDrawing}>Add drawing</button>
                    <button
                        style={isEditingPaths ? { backgroundColor: "#aabbcc" } : null}
                        onClick={handleEditPaths}>Edit lines</button>
                    <button
                        style={isErasing ? { backgroundColor: "#aabbcc" } : null}
                        onClick={handleEraser}>Delete lines</button>
                    {/* <h2>Drawing:</h2> */}
                    {isDrawing && (<div className='inputs-top'>
                        <label>Line color:</label>
                        <input
                            type="color"
                            value={pathColor}
                            onChange={(event) => handleLineColor(event)} />
                        <label>Line width:</label>
                        <input
                            type="number"
                            value={pathLine}
                            onChange={(event) => handleLineWidth(event)} />


                    </div>)}
                </>
            )
            }
            {paths.length > 0 && isEditingPath && (
                <>
                    {/* <h2>Drawing:</h2> */}
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
                        <div>
                            {selectedPath !== null ? (
                                <>
                                    <div>
                                        <label htmlFor="rotate">Rotate:</label>
                                        <input
                                            type="range"
                                            id="rotate"
                                            min="0"
                                            max="360"
                                            step="1"
                                            value={rotation || 0}
                                            onChange={handleRotateChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="scale">Scale:</label>
                                        <input
                                            type="range"
                                            id="scale"
                                            min="0.1"
                                            max="2"
                                            step="0.1"
                                            value={scaling || 1}
                                            onChange={handleScaleChange}
                                        />
                                    </div>
                                </>
                            ) : (
                                <p>No path selected.</p>
                            )}
                        </div>
                        <button
                            onClick={stopLineEditing}>
                            Done
                        </button>
                    </div>
                </>
            )
            }
        </div >)
}
export default DrawingFormTop
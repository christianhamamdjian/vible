import React from 'react';
import BoxForm from "../forms/BoxForm"
import { MoodboardContext } from "../../context/moodboardContext";

const DrawingFormTop = () => {
    const { items, paths, rotation, scaling, stopLineEditing, isDrawing, isEditingPaths, handleEditPaths, isEditingPath, isErasing, pathColor, pathLine, handleDrawing, handleEraser, handleLineColor, handleLineColorChange, handleLineWidth, handleLineWidthChange, selectedPath, handleRotateChange, handleScaleChange, handleEditingBoard, isEditingBoard, handleAddBox, write, selectedItem, handleWrite } = React.useContext(MoodboardContext);

    return (
        <div className='itemForms-top'>
            <>
                <div className='top-buttons'>
                    <button
                        style={isDrawing ? { backgroundColor: "#aabbcc" } : null}
                        onClick={handleDrawing}>Add drawing</button>
                    <button
                        style={isDrawing ? { backgroundColor: "#aabbcc" } : null}
                        onClick={handleAddBox}>Add text</button>
                    {paths.length > 0 && (
                        <>
                            <button
                                style={isEditingPaths ? { backgroundColor: "#aabbcc" } : null}
                                onClick={handleEditPaths}>Edit lines</button>

                            <button
                                style={isErasing ? { backgroundColor: "#aabbcc" } : null}
                                onClick={handleEraser}>Delete lines</button>
                        </>
                    )
                    }
                    {items.length > 0 && (
                        <>
                            <button
                                style={isEditingBoard ? { backgroundColor: "#aabbcc" } : null}
                                onClick={handleEditingBoard}>Edit items</button>
                        </>
                    )
                    }
                    {items.length > 0 && (<button style={write ? { backgroundColor: "#aabbcc" } : null} type="button" onClick={handleWrite}>Edit box</button>)}

                </div>

                {/* <h2>Drawing:</h2> */}
                {isDrawing && (<div className='inputs-top'>
                    {/* <label>Line color:</label> */}
                    <input
                        type="color"
                        value={pathColor}
                        onChange={(event) => handleLineColor(event)} />
                    {/* <label>Line width:</label> */}
                    <input
                        type="number"
                        style={{ width: '1.5rem' }}
                        value={pathLine}
                        onChange={(event) => handleLineWidth(event)} />


                </div>)}
            </>{write && items.length > 0 && <div className='inputs-top'><BoxForm /></div>}
            {paths.length > 0 && isEditingPath && (
                <>
                    <div className='inputs-top'>
                        <input
                            type="color"
                            value={paths.find(path => path.id === isEditingPath.id).color}
                            onChange={(event) => handleLineColorChange(event, isEditingPath.id)} />
                        <input
                            type="number"
                            style={{ width: '1.5rem' }}

                            value={paths.find(path => path.id === isEditingPath.id).line}
                            onChange={(event) => handleLineWidthChange(event, isEditingPath.id)} />
                        {selectedPath !== null ? (
                            <>
                                <div className='path-edit-form'>
                                    <label htmlFor="rotate">Rotate:</label>
                                    {/* <input
                                        type="range"
                                        id="rotate"
                                        min="0"
                                        max="36"
                                        //step="1"
                                        value={rotation || 0}
                                        onChange={handleRotateChange}
                                    /> */}
                                    <button onClick={e => handleRotateChange(e, "decrease")}>&lt;</button>
                                    <button onClick={e => handleRotateChange(e, "increase")}>&gt;</button>
                                </div>
                                <div>
                                    <label htmlFor="scale">Scale:</label>
                                    {/* <input
                                        type="range"
                                        id="scale"
                                        min="1"
                                        max="10"
                                        //step="0.1"
                                        value={scaling || 1}
                                        onChange={handleScaleChange}
                                    /> */}
                                    <button onClick={e => handleScaleChange(e, "decrease")}>-</button>
                                    <button onClick={e => handleScaleChange(e, "increase")}>+</button>
                                </div>
                            </>
                        ) : (
                            <p>No path selected.</p>
                        )}
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
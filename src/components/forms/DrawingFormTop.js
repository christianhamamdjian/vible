import React from 'react';
import BoxFormTop from "../forms/BoxFormTop"
import { MoodboardContext } from "../../context/moodboardContext";

const DrawingFormTop = () => {
    const { items, paths, stopLineEditing, isDrawing, isEditingPaths, handleEditPaths, isEditingPath, isErasing, pathColor, pathLine, handleDrawing, handleEraser, handleLineColor, handleLineColorChange, handleLineWidth, handleLineWidthChange, selectedPath, handleRotateChange, handleScaleChange, handleEditingBoard, isEditingBoard, handleAddBox, write } = React.useContext(MoodboardContext);

    return (
        <div className='itemForms-top'>
            <>
                <div className='top-buttons'>
                    <button
                        className={isDrawing ? "selected-button" : null}
                        onClick={handleDrawing}>Add drawing</button>
                    <button
                        onClick={handleAddBox}>Add text</button>
                    {paths.length > 0 && (
                        <>
                            <button
                                className={isEditingPaths ? "selected-button" : null}
                                onClick={handleEditPaths}>Edit lines</button>

                            <button
                                className={isErasing ? "selected-button" : null}
                                onClick={handleEraser}>Delete lines</button>
                        </>
                    )
                    }
                    {items.length > 0 && (
                        <>
                            <button
                                className={isEditingBoard ? "selected-button" : null}
                                onClick={handleEditingBoard}>Edit items</button>
                        </>
                    )
                    }

                </div>

                {/* <h2>Drawing:</h2> */}
                {isDrawing && (<div className='inputs-top_draw'>
                    {/* <label>Line color:</label> */}
                    <input
                        type="color"
                        value={pathColor}
                        onChange={(event) => handleLineColor(event)} />
                    {/* <label>Line width:</label> */}
                    <input
                        type="number"
                        style={{ width: '3rem' }}
                        value={pathLine}
                        onChange={(event) => handleLineWidth(event)} />


                </div>)}
            </>
            {write && items.length > 0 && <BoxFormTop />}

            {paths.length > 0 && isEditingPath && !isErasing && (
                <>
                    <div className='inputs-top_draw'>
                        <input
                            type="color"
                            value={paths.find(path => path.id === isEditingPath.id).color}
                            onChange={(event) => handleLineColorChange(event, isEditingPath.id)} />
                        <input
                            type="number"
                            style={{ width: '3rem' }}

                            value={paths.find(path => path.id === isEditingPath.id).line}
                            onChange={(event) => handleLineWidthChange(event, isEditingPath.id)} />
                        {selectedPath !== null ? (
                            <>
                                <div className='path-edit-form'>
                                    <label htmlFor="rotate">Rotate:</label>
                                    <button onClick={e => handleRotateChange(e, "decrease")}>&lt;</button>
                                    <button onClick={e => handleRotateChange(e, "increase")}>&gt;</button>
                                </div>
                                <div>
                                    <label htmlFor="scale">Scale:</label>
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
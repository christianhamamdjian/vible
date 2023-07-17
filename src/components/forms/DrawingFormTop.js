import React from 'react';
import BoxFormTop from "../forms/BoxFormTop"
import { MoodboardContext } from "../../context/moodboardContext";

const DrawingFormTop = () => {
    const { items, paths, stopLineEditing, isDrawing, isEditingPath, isErasing, pathColor, pathLine, handleDrawing, handleEraser, handleLineColor, handleLineColorChange, handleLineWidth, handleLineWidthChange, selectedPath, handleRotateChange, handleScaleChange, handleEditingBoard, isEditingBoard, handleAddBox, write, handleDeletePath } = React.useContext(MoodboardContext);

    return (
        <div className='itemForms-top'>
            <>
                <div className='top-buttons'>
                    <button
                        className={isDrawing ? "selected-button" : null}
                        onClick={handleDrawing}>
                        <div className="drawing-sign">
                            <div className="drawing-sign-container">
                                <span className="drawing-sign-sign">
                                    ~
                                </span>
                            </div>
                        </div>
                    </button>
                    <button
                        onClick={handleAddBox}>
                        <div className='writing-sign'>
                            T
                        </div>
                    </button>
                    {paths.length > 0 && (
                        <>
                            <button
                                className={isErasing ? "selected-button" : null}
                                onClick={handleEraser}>
                                <div className='erasing-sign'>
                                    <div className='erasing-sign-box-top'></div>
                                    <div className='erasing-sign-box-bottom'></div></div>
                            </button>
                        </>
                    )
                    }
                    {items.length > 0 && (
                        <>
                            <button
                                className={isEditingBoard ? "selected-button" : null}
                                onClick={handleEditingBoard}>
                                <div className='editing-sign'>
                                    <span className='editing-sign-line'>_ </span>
                                    <span className='editing-sign-pen'>
                                        /
                                    </span></div>
                            </button>
                        </>
                    )
                    }

                </div>

                {/* <h2>Drawing:</h2> */}
                {isDrawing && !isEditingPath && (
                    <div className='inputs-top_draw'>
                        {/* <label>Line color:</label> */}
                        <input
                            type="color"
                            value={pathColor}
                            onChange={(event) => handleLineColor(event)} />
                        {/* <label>Line width:</label> */}
                        <input
                            type="number"
                            className='input-line-width'
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
                            className='input-line-width'
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
                            onClick={() => handleDeletePath(isEditingPath.id)}>
                            Delete
                        </button>
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
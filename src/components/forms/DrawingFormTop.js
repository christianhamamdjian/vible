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
                        <div style={{ width: "1rem" }}>
                            <div style={{ fontSize: "1.8rem", transform: "rotate(45deg)", marginTop: "-.1rem" }}>≈</div>
                        </div>
                    </button>
                    <button
                        onClick={handleAddBox}><div style={{ fontSize: "1.6rem", fontWeight: "bold" }}>T</div></button>
                    {paths.length > 0 && (
                        <>
                            <button
                                className={isErasing ? "selected-button" : null}
                                onClick={handleEraser}>
                                <div style={{ transform: "rotate(35deg)" }}>
                                    <div style={{ width: ".75rem", height: ".75rem", border: "1.5px solid #ffffff", borderRadius: ".2rem .2rem 0 0" }}></div>
                                    <div style={{ width: ".75rem", height: ".75rem", border: "1px solid #ffffff", backgroundColor: "#ffffff", borderRadius: " 0 0  .2rem .2rem  " }}></div></div>
                            </button>
                        </>
                    )
                    }
                    {items.length > 0 && (
                        <>
                            <button
                                className={isEditingBoard ? "selected-button" : null}
                                onClick={handleEditingBoard}>
                                <div style={{ minWidth: "1.2rem", letterSpacing: "-.1rem" }}>
                                    <span style={{ fontSize: "1.4rem", marginLeft: "-.4rem" }}>_ </span>
                                    <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
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
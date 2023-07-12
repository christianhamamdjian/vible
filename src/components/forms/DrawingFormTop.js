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
                        <div style={{ fontSize: "2rem", transform: "rotate(45deg)", marginLeft: ".4rem" }}>≈</div>
                    </button>
                    <button
                        onClick={handleAddBox}><div style={{ fontSize: "2rem", fontWeight: "bold" }}>T</div></button>
                    {paths.length > 0 && (
                        <>
                            <button
                                className={isErasing ? "selected-button" : null}
                                onClick={handleEraser}>
                                <div style={{ transform: "rotate(35deg)" }}>
                                    <div style={{ width: "1rem", height: "1rem", border: "2px solid #ffffff" }}></div>
                                    <div style={{ width: "1rem", height: "1rem", border: "2px solid #ffffff", backgroundColor: "#ffffff" }}></div></div>
                            </button>
                        </>
                    )
                    }
                    {items.length > 0 && (
                        <>
                            <button
                                className={isEditingBoard ? "selected-button" : null}
                                onClick={handleEditingBoard}>
                                <div style={{ minWidth: "2rem", fontSize: "2rem", letterSpacing: "-.2rem" }}>
                                    <span style={{ fontSize: "2rem" }}>_ </span>
                                    <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
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
import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const DrawingFormTop = () => {
    const { paths, stopLineEditing, isEditingPath, isDrawing, isErasing, pathColor, handleLineColor, pathLine, handleLineWidth, handleLineColorChange, handleLineWidthChange, selectedPath, handleRotateChange, handleScaleChange, handleDeletePath, handleLineFillChange, handleLineClosedChange, handleMoveToFront, handleMoveToBack, handleMoveForward,
        handleMoveBackward } = React.useContext(MoodboardContext);

    return (
        <>
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
                        <input
                            type="color"
                            className='input-line-fill'
                            value={paths.find(path => path.id === isEditingPath.id).fill}
                            onChange={(event) => handleLineFillChange(event, isEditingPath.id)} />
                        <input
                            type="checkbox"
                            className='input-line-closed'
                            value={paths.find(path => path.id === isEditingPath.id).closed}
                            checked={paths.find(path => path.id === isEditingPath.id).closed}
                            onChange={(event) => handleLineClosedChange(event, isEditingPath.id)} />

                        {selectedPath !== null && (
                            <>
                                <div className='path-edit-form'>
                                    <label htmlFor="rotate"><h3>Rotate:</h3></label>
                                    <button onClick={e => handleRotateChange(e, "decrease")}>&lt;</button>
                                    <button onClick={e => handleRotateChange(e, "increase")}>&gt;</button>
                                </div>
                                <div className='path-edit-form'>
                                    <label htmlFor="scale"><h3>Scale:</h3></label>
                                    <button onClick={e => handleScaleChange(e, "decrease")}>-</button>
                                    <button onClick={e => handleScaleChange(e, "increase")}>+</button>
                                </div>
                            </>
                        )}
                        <div className='path-edit-form'>
                            <h3>Move:</h3>
                            <button
                                onClick={() => handleMoveToBack(isEditingPath.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&lt;&lt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveToFront(isEditingPath.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&gt;&gt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveBackward(isEditingPath.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&lt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveForward(isEditingPath.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&gt;</div>
                            </button>
                        </div>
                        <button
                            onClick={() => handleDeletePath(isEditingPath.id)}>
                            &times;
                        </button>
                        <button
                            style={{ padding: ".3rem .6rem" }}
                            onClick={stopLineEditing}>
                            <svg
                                x="0"
                                y="0"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="transparent"
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "-.2rem"
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
                                    fill="#ffffff"
                                />
                            </svg>
                        </button>
                    </div>
                </>
            )
            }
        </>
    )
}

export default DrawingFormTop
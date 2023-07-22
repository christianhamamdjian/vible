import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const DrawingFormTop = () => {
    const { paths, stopLineEditing, isEditingPath, isDrawing, isErasing, pathColor, handleLineColor, pathLine, handleLineWidth, handleLineColorChange, handleLineWidthChange, selectedPath, handleRotateChange, handleScaleChange, handleDeletePath, handleLineFillChange, handleLineClosedChange } = React.useContext(MoodboardContext);

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
                            onChange={(event) => handleLineClosedChange(event, isEditingPath.id)} />

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
        </>
    )
}

export default DrawingFormTop
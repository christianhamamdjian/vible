import React, { useState } from 'react';
// import Circle from "../helperFunctions/CircleCursor"
import TopButtonsSlider from "../helperFunctions/TopButtonsSlider"
import { MoodboardContext } from "../../context/moodboardContext";

const DrawingFormTop = () => {
    const { paths, tool, changeTool, stopLineEditing, isEditingPath, isDrawing, isErasing, pathColor, handleLineColor, pathLine, handleLineWidth, handleLineColorChange, handleLineWidthChange, handleRotateChange, handleScaleChange, handleDeletePath, handleLineFillChange, handleLineClosedChange, handleLineOpacityChange, handleMoveToFront, handleMoveToBack, handleMoveForward, handleMoveBackward, handleDuplicatePath, handleUndoErase, handleRedoErase, canUndoErase, canRedoErase, isGrouping, handleGroupRotateChange, handleGroupScaleChange, handleLineDashedChange, handleLineArrowStartChange, handleLineArrowEndChange, handleGroupColorChange, handleGroupLineChange } = React.useContext(MoodboardContext);

    const [rotating, setRotating] = useState(180)
    const [scaling, setScaling] = useState(20)

    const toolButtons = {
        lineColor: "Line Color",
        lineWidth: "Line width",
        fillColor: "Fill color",
        shapeLine: "Shape/Line",
        dashedLine: "Dashed line",
        arrowStart: "Arrow Start",
        arrowEnd: "Arrow End",
        changeOpacity: "Change Opacity",
        rotate: "Rotate",
        scale: "Scale",
        order: "Order",
        duplicate: "Duplicate",
        delete: "Delete",
        done: "Done",
    }
    const groupToolButtons = {
        linesWidth: "Width",
        linesColor: "Color",
        linesRotate: "Rotate",
        linesScale: "Scale",
    }

    const handleRotation = (e) => {
        if (e.target.value < 180) {
            setRotating(+rotating - 1)
            handleRotateChange(e, "decrease")
        }
        if (e.target.value > 180) {
            setRotating(+rotating + 1)
            handleRotateChange(e, "increase")
        }
    }
    const handleRotationReset = () => {
        setRotating(180)
    }

    const handleScale = (e) => {
        if (e.target.value < 20) {
            setScaling(+scaling - 1)
            handleScaleChange(e, "decrease")
        }
        if (e.target.value > 20) {
            setScaling(+scaling + 1)
            handleScaleChange(e, "increase")
        }
    }
    const handleScaleReset = () => {
        setScaling(20)
    }

    const handleGroupRotation = (e) => {
        if (e.target.value < 180) {
            setRotating(+rotating - 1)
            handleGroupRotateChange(e, "decrease")
        }
        if (e.target.value > 180) {
            setRotating(+rotating + 1)
            handleGroupRotateChange(e, "increase")
        }
    }
    const handleGroupRotationReset = () => {
        setRotating(180)
    }

    const handleGroupScale = (e) => {
        if (e.target.value < 20) {
            setScaling(+scaling - 1)
            handleGroupScaleChange(e, "decrease")
        }
        if (e.target.value > 20) {
            setScaling(+scaling + 1)
            handleGroupScaleChange(e, "increase")
        }
    }
    const handleGroupScaleReset = () => {
        setScaling(20)
    }


    return (
        <>
            {isDrawing && !isEditingPath && (
                <div className='inputs-top_draw'>
                    <label>Line color: </label>
                    <input
                        type="color"
                        value={pathColor}
                        onChange={(event) => handleLineColor(event)} />
                    <label>Line width: </label>
                    <input
                        type="number"
                        className='input-line-width'
                        value={pathLine}
                        onChange={(event) => handleLineWidth(event)} />
                </div>
            )}
            {paths.length > 0 && isEditingPath && !isErasing && !isGrouping && (
                <>
                    <div className='inputs-top_objects' >
                        <TopButtonsSlider toolButtons={toolButtons} changeTool={changeTool} />
                    </div>
                    {tool !== "" && <div className='inputs-top_draw-form'>
                        {tool === "lineColor" && <>
                            <label>Line color: </label>
                            <input
                                type="color"
                                value={paths.find(path => path.id === isEditingPath.id).color}
                                onChange={(event) => handleLineColorChange(event, isEditingPath.id)} />
                        </>}
                        {tool === "lineWidth" && <><label>Line width: </label>
                            {/* <input
                                type="number"
                                className='input-line-width'
                                value={paths.find(path => path.id === isEditingPath.id).line}
                                onChange={(event) => handleLineWidthChange(event, isEditingPath.id)} /> */}
                            <span>{paths.find(path => path.id === isEditingPath.id).line}</span>
                            <button onClick={e => handleLineWidthChange(e, isEditingPath.id, "decrease")}>&lt;</button>
                            <button onClick={e => handleLineWidthChange(e, isEditingPath.id, "increase")}>&gt;</button>
                        </>}

                        {tool === "fillColor" && <>
                            <label>Fill color: </label>
                            <input
                                type="color"
                                className='input-line-fill'
                                value={paths.find(path => path.id === isEditingPath.id).fill}
                                onChange={(event) => handleLineFillChange(event, isEditingPath.id)} />
                        </>
                        }


                        {tool === "shapeLine" && <label className='checkbox-container'>Shape/Line
                            <input
                                type="checkbox"
                                className='input-line-closed'
                                value={paths.find(path => path.id === isEditingPath.id).closed}
                                checked={paths.find(path => path.id === isEditingPath.id).closed}
                                onChange={(event) => handleLineClosedChange(event, isEditingPath.id)} />
                            <span className="checkmark"></span>
                        </label>}


                        {tool === "dashedLine" && <label className='checkbox-container'>Dashed line
                            <input
                                type="checkbox"
                                className='input-line-dashed'
                                value={paths.find(path => path.id === isEditingPath.id).dashed}
                                checked={paths.find(path => path.id === isEditingPath.id).dashed}
                                onChange={(event) => handleLineDashedChange(event, isEditingPath.id)} />
                            <span className="checkmark"></span>
                        </label>}


                        {tool === "arrowStart" && <label className='checkbox-container'>Arrow Start
                            <input
                                type="checkbox"
                                className='input-line-arrowstart'
                                value={paths.find(path => path.id === isEditingPath.id).arrowStart}
                                checked={paths.find(path => path.id === isEditingPath.id).arrowStart}
                                onChange={(event) => handleLineArrowStartChange(event, isEditingPath.id)} />
                            <span className="checkmark"></span>
                        </label>}


                        {tool === "arrowEnd" && <label className='checkbox-container'>Arrow End
                            <input
                                type="checkbox"
                                className='input-line-arrowend'
                                value={paths.find(path => path.id === isEditingPath.id).arrowEnd}
                                checked={paths.find(path => path.id === isEditingPath.id).arrowEnd}
                                onChange={(event) => handleLineArrowEndChange(event, isEditingPath.id)} />
                            <span className="checkmark"></span>
                        </label>}


                        {tool === "changeOpacity" && <> <label>Change Opacity: </label>
                            <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.1"
                                name="opacity"
                                value={paths.find(path => path.id === isEditingPath.id).opacity}
                                onChange={(e) => handleLineOpacityChange(e, isEditingPath.id, "opacity")}
                            /></>}

                        {tool === "rotate" && <div className='path-edit-form'>
                            <label htmlFor="rotate"><label>Rotate: </label></label>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                step="1"
                                name="rotate"
                                value={rotating}
                                onChange={(e) => handleRotation(e)}
                                onPointerUp={handleRotationReset}
                            />
                            <button onClick={e => handleRotateChange(e, "decrease")}>&lt;</button>
                            <button onClick={e => handleRotateChange(e, "increase")}>&gt;</button>
                        </div>}

                        {tool === "scale" && <div className='path-edit-form'>
                            <label htmlFor="scale"><label>Scale: </label></label>
                            <input
                                type="range"
                                min="10"
                                max="30"
                                step="1"
                                name="scale"
                                value={scaling}
                                onChange={(e) => handleScale(e)}
                                onPointerUp={handleScaleReset}
                            />
                            <button onClick={e => handleScaleChange(e, "decrease")}>-</button>
                            <button onClick={e => handleScaleChange(e, "increase")}>+</button>
                        </div>}

                        {/* </>
                        )}
                       */}

                        {tool === "order" && <div className='path-edit-form'>
                            <label>Order: </label>
                            <button
                                onClick={() => handleMoveToBack(isEditingPath.id)}>
                                <div className='move-item'
                                >&gt;&gt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveToFront(isEditingPath.id)}>
                                <div className='move-item'
                                >&lt;&lt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveBackward(isEditingPath.id)}>
                                <div className='move-item'
                                >&gt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveForward(isEditingPath.id)}>
                                <div className='move-item'
                                >&lt;</div>
                            </button>
                        </div>}


                        {tool === "duplicate" && <div className='path-edit-form'>
                            <label>Duplicate: </label>
                            <button
                                onClick={() => handleDuplicatePath(isEditingPath.id)}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5 5H15V8H8V15H5V5Z" fill="currentColor" />
                                    <path d="M19 9H9V19H19V9Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>}


                        {tool === "delete" && <button
                            onClick={() => handleDeletePath(isEditingPath.id)}>
                            &times;
                        </button>}

                        {tool === "done" && <button
                            className='path-edit-form-button'
                            onClick={stopLineEditing}>
                            <svg
                                x="0"
                                y="0"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="transparent"
                                className='path-edit-form-svg'
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
                                    fill="#ffffff"
                                />
                            </svg>
                        </button>}

                    </div>}

                </>
            )
            }
            {paths.length > -1 && isErasing && (
                <>
                    <div className='inputs-top_draw'>
                        <button onClick={handleUndoErase} disabled={!canUndoErase}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.33929 4.46777H7.33929V7.02487C8.52931 6.08978 10.0299 5.53207 11.6607 5.53207C15.5267 5.53207 18.6607 8.66608 18.6607 12.5321C18.6607 16.3981 15.5267 19.5321 11.6607 19.5321C9.51025 19.5321 7.58625 18.5623 6.30219 17.0363L7.92151 15.8515C8.83741 16.8825 10.1732 17.5321 11.6607 17.5321C14.4222 17.5321 16.6607 15.2935 16.6607 12.5321C16.6607 9.77065 14.4222 7.53207 11.6607 7.53207C10.5739 7.53207 9.56805 7.87884 8.74779 8.46777L11.3393 8.46777V10.4678H5.33929V4.46777Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                        <button onClick={handleRedoErase} disabled={!canRedoErase}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.1459 11.0499L12.9716 9.05752L15.3462 8.84977C14.4471 7.98322 13.2242 7.4503 11.8769 7.4503C9.11547 7.4503 6.87689 9.68888 6.87689 12.4503C6.87689 15.2117 9.11547 17.4503 11.8769 17.4503C13.6977 17.4503 15.2911 16.4771 16.1654 15.0224L18.1682 15.5231C17.0301 17.8487 14.6405 19.4503 11.8769 19.4503C8.0109 19.4503 4.87689 16.3163 4.87689 12.4503C4.87689 8.58431 8.0109 5.4503 11.8769 5.4503C13.8233 5.4503 15.5842 6.24474 16.853 7.52706L16.6078 4.72412L18.6002 4.5498L19.1231 10.527L13.1459 11.0499Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </div>
                </>
            )}

            {paths.length > 1 && isGrouping && (
                <>
                    <div className='inputs-top_objects' >
                        {Object.entries(groupToolButtons).map((el, i) => {
                            return (<button key={i} onClick={() => changeTool(el[0])}>{el[1]}</button>)
                        })}
                    </div>
                    {tool !== "" && <div className='inputs-top_draw'>
                        {tool === "linesColor" && <>
                            <label>Lines color: </label>
                            <input
                                type="color"
                                value={pathColor}
                                onChange={(event) => handleGroupColorChange(event, isEditingPath.id)} />
                        </>}
                        {tool === "linesWidth" && <>
                            <label>Lines width: </label>
                            {/* <input
                                type="number"
                                className='input-line-width'
                                value={pathLine >= 2 && pathLine}
                                onChange={(event) => handleGroupLineChange(event, isEditingPath.id)} />*/}
                            <span>{pathLine}</span>
                            <button onClick={e => handleGroupLineChange(e, "decrease")}>&lt;</button>
                            <button onClick={e => handleGroupLineChange(e, "increase")}>&gt;</button>
                        </>}
                        {tool === "linesRotate" && <>
                            <div className='path-edit-form'>
                                <label htmlFor="rotate"><label>Group Rotate: </label></label>
                                <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    step="1"
                                    name="rotate"
                                    value={rotating}
                                    onChange={(e) => handleGroupRotation(e)}
                                    onPointerUp={handleGroupRotationReset}
                                />
                                <button onClick={e => handleGroupRotateChange(e, "decrease")}>&lt;</button>
                                <button onClick={e => handleGroupRotateChange(e, "increase")}>&gt;</button>
                            </div>
                        </>}
                        {tool === "linesScale" && <>
                            <div className='path-edit-form'>
                                <label htmlFor="scale"><label>Group Scale: </label></label>
                                <input
                                    type="range"
                                    min="10"
                                    max="30"
                                    step="1"
                                    name="scale"
                                    value={scaling}
                                    onChange={(e) => handleGroupScale(e)}
                                    onPointerUp={handleGroupScaleReset}
                                />
                                <button onClick={e => handleGroupScaleChange(e, "decrease")}>-</button>
                                <button onClick={e => handleGroupScaleChange(e, "increase")}>+</button>
                            </div>
                        </>}
                    </div>}
                </>
            )}
        </>
    )
}

export default DrawingFormTop



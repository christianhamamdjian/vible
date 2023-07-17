import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const ButtonsTop = () => {
    const { items, paths, isDrawing, isErasing, handleDrawing, handleEraser, handleEditingBoard, isEditingBoard, handleAddBox } = React.useContext(MoodboardContext);

    return (
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
        </>
    )
}

export default ButtonsTop
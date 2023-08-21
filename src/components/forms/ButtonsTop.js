import React from 'react'
import Tooltips from '../tooltips/Tooltips'
import { MoodboardContext } from "../../context/moodboardContext"

const ButtonsTop = () => {
    const { items, paths, isDrawing, isErasing, isPartialErasing, handlePartialEraser, isGrouping, handleGrouping, handleDrawing, handleEraser, handleEditingBoard, isEditingBoard, handleAddBox, handleInfo, info } = React.useContext(MoodboardContext);

    return (
        <>
            <div className='top-buttons'>
                <button
                    className={isDrawing ? "selected-button" : null}
                    onClick={handleDrawing}>
                    <div className="drawing-sign">
                        <div className="drawing-sign-container">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </div>
                </button>
                <Tooltips
                    position="bottom"
                    width="3.5rem"
                    height="3.7rem"
                    top="-3rem"
                    bottom="90%"
                    left="-1.5rem"
                    right=""
                    marginRight=""
                    marginLeft=""
                    tipTop="-.7rem"
                    tipLeft="50%"
                    text="Click to start drawing"
                />
                <button
                    onClick={handleAddBox}>
                    <div className='writing-sign'>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M6.5 3H3V6.5H4V4H6.5V3Z" fill="currentColor" />
                            <path d="M8.5 4V3H11V4H8.5Z" fill="currentColor" />
                            <path d="M13 4H15.5V3H13V4Z" fill="currentColor" />
                            <path d="M17.5 3V4H20V6.5H21V3H17.5Z" fill="currentColor" />
                            <path d="M21 8.5H20V11H21V8.5Z" fill="currentColor" />
                            <path d="M21 13H20V15.5H21V13Z" fill="currentColor" />
                            <path d="M21 17.5H20V20H17.5V21H21V17.5Z" fill="currentColor" />
                            <path d="M15.5 21V20H13V21H15.5Z" fill="currentColor" />
                            <path d="M11 21V20H8.5V21H11Z" fill="currentColor" />
                            <path d="M6.5 21V20H4V17.5H3V21H6.5Z" fill="currentColor" />
                            <path d="M3 15.5H4V13H3V15.5Z" fill="currentColor" />
                            <path d="M3 11H4V8.5H3V11Z" fill="currentColor" />
                            <path d="M11 9.5H7V7.5H17V9.5H13V16.5H11V9.5Z" fill="currentColor" />
                        </svg>
                    </div>
                </button>
                <Tooltips
                    position="bottom"
                    width="3.5rem"
                    height="4.5rem"
                    top="-3rem"
                    bottom="90%"
                    left="-1rem"
                    right=""
                    marginRight=""
                    marginLeft=""
                    tipTop="-.7rem"
                    tipLeft="40%"
                    text="Click to add a text box"
                />
                {paths.length > 0 && (
                    <>

                        <button
                            className={isErasing ? "selected-button" : null}
                            onClick={handleEraser}>
                            <div className='erasing-sign'>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M3.49997 12.8995C2.71892 13.6805 2.71892 14.9468 3.49997 15.7279L7.35785 19.5858H4.08576C3.53347 19.5858 3.08576 20.0335 3.08576 20.5858C3.08576 21.1381 3.53347 21.5858 4.08576 21.5858H20.0858C20.638 21.5858 21.0858 21.1381 21.0858 20.5858C21.0858 20.0335 20.638 19.5858 20.0858 19.5858H10.9558L20.4705 10.071C21.2516 9.28999 21.2516 8.02366 20.4705 7.24261L16.2279 2.99997C15.4468 2.21892 14.1805 2.21892 13.3995 2.99997L3.49997 12.8995ZM7.82579 11.4021L4.91418 14.3137L9.15683 18.5563L12.0684 15.6447L7.82579 11.4021ZM9.24 9.98787L13.4826 14.2305L19.0563 8.65683L14.8137 4.41418L9.24 9.98787Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        </button>
                        <Tooltips
                            position="bottom"
                            width="3.5rem"
                            height="3.7rem"
                            top="-3rem"
                            bottom="90%"
                            left="-.5rem"
                            right=""
                            marginRight=""
                            marginLeft=""
                            tipTop="-.7rem"
                            tipLeft="30%"
                            text="Click to erase lines" />
                    </>
                )}

                {paths.length > 0 && (
                    <>

                        <button
                            className={isPartialErasing ? "selected-button" : null}
                            onClick={handlePartialEraser}>
                            <div className='erasing-sign'>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M15.966,2.841 L20.471,7.248 C21.252,8.029 21.252,9.295 20.471,10.076 L10.956,19.591 L20.086,19.591 C20.638,19.591 21.086,20.039 21.086,20.591 C21.086,21.143 20.638,21.591 20.086,21.591 L4.086,21.591 C3.533,21.591 3.086,21.143 3.086,20.591 C3.086,20.039 3.533,19.591 4.086,19.591 L7.358,19.591 L3.5,15.733 C2.719,14.952 2.719,13.686 3.5,12.905 L13.4,3.005 C13.858,2.49 15.029,2.051 15.966,2.841 z M10.783,19.661 L7.386,19.661 L7.386,21.591 L10.783,21.591 L10.783,19.661 z M7.826,11.407 L4.914,14.319 L9.157,18.562 L12.068,15.65 L7.826,11.407 z M14.814,4.419 L9.24,9.993 L13.483,14.236 L19.056,8.662 L14.814,4.419 z" fill="#FFFFFF" />
                                </svg>
                            </div>
                        </button>
                        <Tooltips
                            position="bottom"
                            width="3.5rem"
                            height="3.7rem"
                            top="-3rem"
                            bottom="90%"
                            left="-.5rem"
                            right=""
                            marginRight=""
                            marginLeft=""
                            tipTop="-.7rem"
                            tipLeft="30%"
                            text="Click to erase lines" />
                    </>
                )}


                {paths.length > 0 && (
                    <>
                        <button
                            className={isGrouping ? "selected-button" : null}
                            onClick={handleGrouping}>
                            <div className='grouping-sign'>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M15 5H5V15H9V19H19V9H15V5Z" fill="currentColor" />
                                </svg>
                            </div>
                        </button>
                        <Tooltips
                            position="bottom"
                            width="3.5rem"
                            height="3.7rem"
                            top="-3rem"
                            bottom="90%"
                            left="-.5rem"
                            right=""
                            marginRight=""
                            marginLeft=""
                            tipTop="-.7rem"
                            tipLeft="30%"
                            text="Click to group lines" />
                    </>
                )
                }

                {items.length > 0 && (
                    <>
                        <button
                            className={isEditingBoard ? "selected-button" : null}
                            onClick={handleEditingBoard}>
                            <div className='editing-sign'>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11 7V9H9V11H11V13H13V11H15V9H13V7H11ZM9 15V17H15V15H9Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        </button>
                        <Tooltips
                            position="bottom"
                            width="3.5rem"
                            height="3.8rem"
                            top="-3rem"
                            bottom="90%"
                            left="0rem"
                            right=""
                            marginRight=""
                            marginLeft=""
                            tipTop="-.7rem"
                            tipLeft="25%"
                            text="Click to edit objects"
                        />
                    </>
                )
                }
                <>
                    <button
                        className={info ? "selected-button" : null}
                        onClick={handleInfo}>
                        <div className='info-sign'>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11 10.9794C11 10.4271 11.4477 9.97937 12 9.97937C12.5523 9.97937 13 10.4271 13 10.9794V16.9794C13 17.5317 12.5523 17.9794 12 17.9794C11.4477 17.9794 11 17.5317 11 16.9794V10.9794Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M12 6.05115C11.4477 6.05115 11 6.49886 11 7.05115C11 7.60343 11.4477 8.05115 12 8.05115C12.5523 8.05115 13 7.60343 13 7.05115C13 6.49886 12.5523 6.05115 12 6.05115Z"
                                    fill="currentColor"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </button>
                </>

            </div>
        </>
    )
}

export default ButtonsTop
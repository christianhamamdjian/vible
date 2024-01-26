import React from 'react'
import Tooltips from '../tooltips/Tooltips'
import { MoodboardContext } from "../../context/moodboardContext"

const ButtonsTop = () => {
    const { items, paths, isDrawing, isErasing, isPartialErasing, handlePartialEraser, isGrouping, handleGrouping, handleDrawing, handleEraser, handleEditingBoard, isEditingBoard, handleAddBox, handleInfo, handleShowBoards, info, showBoards, activeBoard, clipBoard, editingText, handlePaste, handleCopy, handleClearClipBoard, getTextColor, getRandomQuote } = React.useContext(MoodboardContext);
    const buttonsColor = activeBoard.buttonsColor
    return (
        <>
            <div className='top-buttons'>
                <button
                    className={`${isDrawing ? "selected-button" : ""} themable`}
                    style={{ backgroundColor: isDrawing ? "rgb(130, 70, 186)" : buttonsColor }}
                    title="Start drawing"
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
                                    fill={getTextColor(buttonsColor)}
                                />
                                <path
                                    d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z"
                                    fill={getTextColor(buttonsColor)}
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
                    left="-3.8rem"
                    right=""
                    marginRight=""
                    marginLeft=""
                    tipTop="-.7rem"
                    tipLeft="70%"
                    text="Click to start drawing"
                />
                <button
                    className="themable"
                    style={{ backgroundColor: buttonsColor }}
                    onClick={handleAddBox}
                    title="Add a text box"
                >
                    <div className='writing-sign'>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M6.5 3H3V6.5H4V4H6.5V3Z" fill={getTextColor(buttonsColor)} />
                            <path d="M8.5 4V3H11V4H8.5Z" fill={getTextColor(buttonsColor)} />
                            <path d="M13 4H15.5V3H13V4Z" fill={getTextColor(buttonsColor)} />
                            <path d="M17.5 3V4H20V6.5H21V3H17.5Z" fill={getTextColor(buttonsColor)} />
                            <path d="M21 8.5H20V11H21V8.5Z" fill={getTextColor(buttonsColor)} />
                            <path d="M21 13H20V15.5H21V13Z" fill={getTextColor(buttonsColor)} />
                            <path d="M21 17.5H20V20H17.5V21H21V17.5Z" fill={getTextColor(buttonsColor)} />
                            <path d="M15.5 21V20H13V21H15.5Z" fill={getTextColor(buttonsColor)} />
                            <path d="M11 21V20H8.5V21H11Z" fill={getTextColor(buttonsColor)} />
                            <path d="M6.5 21V20H4V17.5H3V21H6.5Z" fill={getTextColor(buttonsColor)} />
                            <path d="M3 15.5H4V13H3V15.5Z" fill={getTextColor(buttonsColor)} />
                            <path d="M3 11H4V8.5H3V11Z" fill={getTextColor(buttonsColor)} />
                            <path d="M11 9.5H7V7.5H17V9.5H13V16.5H11V9.5Z" fill={getTextColor(buttonsColor)} />
                        </svg>
                    </div>
                </button>
                <Tooltips
                    position="bottom"
                    width="3.5rem"
                    height="4.5rem"
                    top="-3rem"
                    bottom="90%"
                    left="-3.4rem"
                    right=""
                    marginRight=""
                    marginLeft=""
                    tipTop="-.7rem"
                    tipLeft="70%"
                    text="Click to add a text box"
                />
                {paths.length > 0 && (
                    <>
                        <button
                            className={`${isErasing ? "selected-button" : "null"} themable`}
                            style={{ backgroundColor: isErasing ? "rgb(130, 70, 186)" : buttonsColor }}
                            title="Drag Eraser"
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
                                        fill={getTextColor(buttonsColor)}
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
                            left="-3rem"
                            right=""
                            marginRight=""
                            marginLeft=""
                            tipTop="-.7rem"
                            tipLeft="60%"
                            text="Click to erase lines" />
                    </>
                )}

                {paths.length > 0 && (
                    <>

                        <button
                            className={`${isPartialErasing ? "selected-button" : null} themable`}
                            style={{ backgroundColor: isPartialErasing ? "rgb(130, 70, 186)" : buttonsColor }}
                            title="Partial Eraser"
                            onClick={handlePartialEraser}>
                            <div className='erasing-sign'>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M15.966,2.841 L20.471,7.248 C21.252,8.029 21.252,9.295 20.471,10.076 L10.956,19.591 L20.086,19.591 C20.638,19.591 21.086,20.039 21.086,20.591 C21.086,21.143 20.638,21.591 20.086,21.591 L4.086,21.591 C3.533,21.591 3.086,21.143 3.086,20.591 C3.086,20.039 3.533,19.591 4.086,19.591 L7.358,19.591 L3.5,15.733 C2.719,14.952 2.719,13.686 3.5,12.905 L13.4,3.005 C13.858,2.49 15.029,2.051 15.966,2.841 z M10.783,19.661 L7.386,19.661 L7.386,21.591 L10.783,21.591 L10.783,19.661 z M7.826,11.407 L4.914,14.319 L9.157,18.562 L12.068,15.65 L7.826,11.407 z M14.814,4.419 L9.24,9.993 L13.483,14.236 L19.056,8.662 L14.814,4.419 z" fill={getTextColor(buttonsColor)} />
                                </svg>
                            </div>
                        </button>
                        <Tooltips
                            position="bottom"
                            width="3.5rem"
                            height="4.7rem"
                            top="-3rem"
                            bottom="90%"
                            left="-2.6rem"
                            right=""
                            marginRight=""
                            marginLeft=""
                            tipTop="-.7rem"
                            tipLeft="55%"
                            text="Click to partially erase lines" />
                    </>
                )}


                {paths.length > 0 && (
                    <>
                        <button
                            className={`${isGrouping ? "selected-button" : null} themable`}
                            style={{ backgroundColor: isGrouping ? "rgb(130, 70, 186)" : buttonsColor }}
                            title="Drag select multiple lines"
                            onClick={handleGrouping}>
                            <div className='grouping-sign'>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M15 5H5V15H9V19H19V9H15V5Z" fill={getTextColor(buttonsColor)} />
                                </svg>
                            </div>
                        </button>
                        <Tooltips
                            position="bottom"
                            width="3.5rem"
                            height="3.7rem"
                            top="-3rem"
                            bottom="90%"
                            left="-2.2rem"
                            right=""
                            marginRight=""
                            marginLeft=""
                            tipTop="-.7rem"
                            tipLeft="50%"
                            text="Click to group lines" />
                    </>
                )
                }

                {/* {items.length > 0 && (
                    <>
                        <button
                            className={`${isEditingBoard ? "selected-button" : null} themable`}
                            style={{ backgroundColor: isEditingBoard ? "rgb(130, 70, 186)" : buttonsColor }}
                            title="Activate board editing"
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
                                        fill={getTextColor(buttonsColor)}
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
                            left="-1.8rem"
                            right=""
                            marginRight=""
                            marginLeft=""
                            tipTop="-.7rem"
                            tipLeft="45%"
                            text="Click to edit objects"
                        />
                    </>
                )
                } */}
                <>
                    <button
                        className={`${showBoards ? "selected-button" : null} themable`}
                        style={{ backgroundColor: showBoards ? "rgb(130, 70, 186)" : buttonsColor }}
                        title="Add and edit boards"
                        onClick={handleShowBoards}>
                        <div className='boards-sign'>
                            <svg
                                x="0"
                                y="0"
                                width="28"
                                height="28"
                                viewBox="0, 0, 28, 28"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g>
                                    <path d="M23.75,2.5 C25.821,2.5 27.5,4.179 27.5,6.25 L27.5,23.75 C27.5,25.821 25.821,27.5 23.75,27.5 L6.25,27.5 C4.179,27.5 2.5,25.821 2.5,23.75 L2.5,6.25 C2.5,4.179 4.179,2.5 6.25,2.5 L23.75,2.5 z" fillOpacity="0" stroke={getTextColor(buttonsColor)} strokeWidth="1.25" />
                                    <path d="M11.894,17.129 C12.446,17.129 12.894,17.577 12.894,18.129 L12.894,23.886 C12.894,24.438 12.446,24.886 11.894,24.886 L6.009,24.886 C5.457,24.886 5.009,24.438 5.009,23.886 L5.009,18.129 C5.009,17.577 5.457,17.129 6.009,17.129 L11.894,17.129 z" fill={getTextColor(buttonsColor)} />
                                    <path d="M23.991,17.129 C24.543,17.129 24.991,17.577 24.991,18.129 L24.991,23.886 C24.991,24.438 24.543,24.886 23.991,24.886 L18.106,24.886 C17.554,24.886 17.106,24.438 17.106,23.886 L17.106,18.129 C17.106,17.577 17.554,17.129 18.106,17.129 L23.991,17.129 z" fill={getTextColor(buttonsColor)} />
                                    <path d="M11.894,5.16 C12.446,5.16 12.894,5.608 12.894,6.16 L12.894,11.917 C12.894,12.469 12.446,12.917 11.894,12.917 L6.009,12.917 C5.457,12.917 5.009,12.469 5.009,11.917 L5.009,6.16 C5.009,5.608 5.457,5.16 6.009,5.16 L11.894,5.16 z" fill={getTextColor(buttonsColor)} />
                                    <path d="M23.991,5.16 C24.543,5.16 24.991,5.608 24.991,6.16 L24.991,11.917 C24.991,12.469 24.543,12.917 23.991,12.917 L18.106,12.917 C17.554,12.917 17.106,12.469 17.106,11.917 L17.106,6.16 C17.106,5.608 17.554,5.16 18.106,5.16 L23.991,5.16 z" fill={getTextColor(buttonsColor)} />
                                </g>
                            </svg>
                            <div className='buttons-top-activeboard'>{activeBoard.name}</div>
                        </div>
                    </button>
                    <Tooltips
                        position="bottom"
                        width="3.5rem"
                        height="3.8rem"
                        top="-3rem"
                        bottom="90%"
                        left="-1.4rem"
                        right=""
                        marginRight=""
                        marginLeft=""
                        tipTop="-.7rem"
                        tipLeft="35%"
                        text="Click to edit boards"
                    />
                </>

                <>
                    <button
                        className={`${info ? "selected-button" : null} themable`}
                        style={{ backgroundColor: buttonsColor }}
                        title="Add inspirational quote"
                        onClick={getRandomQuote}>
                        <div className='info-sign'>
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M18.571,10.286 C18.571,14.862 14.862,18.571 10.286,18.571 C5.71,18.571 2,14.862 2,10.286 C2,5.71 5.71,2 10.286,2 C14.862,2 18.571,5.71 18.571,10.286 z" fill={getTextColor(buttonsColor)} />
                                <path d="M3.012,10.286 C3.012,6.269 6.269,3.012 10.286,3.012 C14.303,3.012 17.559,6.269 17.559,10.286 C17.559,14.303 14.303,17.559 10.286,17.559 C6.269,17.559 3.012,14.303 3.012,10.286 z" fill="#FFFFFF" />
                                <path d="M10.286,3.012 C8.277,3.012 6.649,4.641 6.649,6.649 C6.649,8.658 8.277,10.286 10.286,10.286 L10.286,10.287 C10.307,10.286 10.328,10.286 10.349,10.286 C12.358,10.286 13.986,11.914 13.986,13.923 C13.986,15.896 12.414,17.502 10.453,17.557 C14.393,17.468 17.56,14.247 17.56,10.286 C17.56,6.3 14.354,3.063 10.38,3.013 C10.38,3.013 10.38,3.013 10.379,3.013 C10.348,3.012 10.317,3.012 10.286,3.012 z M10.286,5.605 C10.793,5.605 11.203,6.016 11.203,6.522 C11.203,7.029 10.793,7.44 10.286,7.44 C9.78,7.44 9.369,7.029 9.369,6.522 C9.369,6.016 9.78,5.605 10.286,5.605 z M10.286,17.559 L10.286,17.559 C10.3,17.559 10.314,17.559 10.328,17.559 C10.314,17.559 10.3,17.559 10.286,17.559 z" fill={getTextColor(buttonsColor)} />
                                <path d="M11.79,14.154 C11.79,14.923 11.167,15.546 10.399,15.546 C9.63,15.546 9.007,14.923 9.007,14.154 C9.007,13.386 9.63,12.763 10.399,12.763 C11.167,12.763 11.79,13.386 11.79,14.154 z" fill={getTextColor(buttonsColor)} />
                                <path d="M10.286,17.559 C12.294,17.559 13.923,15.931 13.923,13.923 C13.923,11.914 12.294,10.286 10.286,10.286 L10.286,10.285 C10.265,10.286 10.244,10.286 10.223,10.286 C8.214,10.286 6.586,8.658 6.586,6.649 C6.586,4.675 8.158,3.07 10.118,3.014 C6.178,3.104 3.012,6.325 3.012,10.286 C3.012,14.272 6.218,17.508 10.191,17.559 C10.192,17.559 10.192,17.559 10.192,17.559 C10.223,17.56 10.254,17.559 10.286,17.559 z M10.286,14.967 C9.779,14.967 9.369,14.556 9.369,14.049 C9.369,13.543 9.779,13.132 10.286,13.132 C10.792,13.132 11.203,13.543 11.203,14.049 C11.203,14.556 10.792,14.967 10.286,14.967 z M10.286,3.013 L10.286,3.012 C10.271,3.012 10.257,3.012 10.243,3.012 C10.257,3.012 10.271,3.013 10.286,3.013 z" fill="#FFFFFF" />
                            </svg>
                        </div>
                    </button>
                    <Tooltips
                        position="bottom"
                        width="5rem"
                        height="4.8rem"
                        top="-3rem"
                        bottom="90%"
                        left="-1rem"
                        right=""
                        marginRight=""
                        marginLeft=""
                        tipTop="-.7rem"
                        tipLeft="18%"
                        text="Click to add inspirational quote"
                    />
                </>
                <>
                    <button
                        className={`${info ? "selected-button" : null} themable`}
                        style={{ backgroundColor: info ? "rgb(130, 70, 186)" : buttonsColor }}
                        title="Show buttons info"
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
                                    fill={getTextColor(buttonsColor)}
                                />
                                <path
                                    d="M12 6.05115C11.4477 6.05115 11 6.49886 11 7.05115C11 7.60343 11.4477 8.05115 12 8.05115C12.5523 8.05115 13 7.60343 13 7.05115C13 6.49886 12.5523 6.05115 12 6.05115Z"
                                    fill={getTextColor(buttonsColor)}
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
                                    fill={getTextColor(buttonsColor)}
                                />
                            </svg>
                        </div>
                    </button>
                </>
                {editingText && !clipBoard && <>
                    <div className='copy-sign'>
                        <button
                            title="Copy selected item"
                            className="themable"
                            style={{
                                backgroundColor: buttonsColor, color: getTextColor(buttonsColor)
                            }}
                            onClick={e => handleCopy(e, editingText.id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                width="1.6rem"
                                height="1.6rem"
                                viewBox="0 0 70 70"
                                fill={getTextColor(buttonsColor)}
                                style={{ marginLeft: "-.2rem" }}>
                                <g>
                                    <path d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228   C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999   c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64   h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002   C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228   c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999   c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z    M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699   c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946   c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999   h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z" />
                                    <path d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005   c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997   C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z" />
                                    <path d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986   c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016   C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z" />
                                    <path d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997   s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997   S39.16465,29.4603004,38.6031494,29.4603004z" />
                                    <path d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997   s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997   S29.0059509,37.5872993,28.4444485,37.5872993z" />
                                </g>
                            </svg>
                        </button>
                    </div>
                </>}
                {clipBoard && <>
                    <button
                        className="clipboard-button themable"
                        title="Paste clipboard content"
                        onClick={handlePaste}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className='clipboard-svg'
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3 19V1H17V5H21V23H7V19H3ZM15  "
                                fill={getTextColor(buttonsColor)}
                            />
                            <path
                                d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V12.1578L16.2428 8.91501L17.657 10.3292L12.0001 15.9861L6.34326 10.3292L7.75748 8.91501L11 12.1575V5Z"
                                fill="#ddddee"
                            />
                        </svg>

                    </button>
                    <button
                        title="Clear the clipboard"
                        onClick={handleClearClipBoard}
                        className='clear-clipboard'
                    >
                        &times;
                    </button>
                </>}
            </div >
        </>
    )
}

export default ButtonsTop



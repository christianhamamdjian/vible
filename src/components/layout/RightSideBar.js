import React, { useState } from 'react'
import ThemeSwitcher from '../helperComponents/ThemeSwitcher'
import { printPdf } from '../utils/printPdf'
import Calculator from "../calculator/Calculator"
import Calendar from "../calendar/Calendar"
import Tooltips from '../tooltips/Tooltips'
import Confirm from "../helperComponents/Confirm"
import DownloadUploadData from "../helperComponents/DownloadUploadData"
import { downloadTexts } from "../utils/downloadTexts"
import { downloadSvg } from "../utils/downloadSvg"
import { MoodboardContext } from "../../context/moodboardContext";

const RightSidebard = () => {
    const { items, divRef, svgRef, handleClearBoard, handleClearPaths, handleZoomIn, handleZoomOut, handleZoomSlider, handleResetZoom, zoom, handleBoardColorChange, handleButtonsColorChange, handleColorReset, handleShowBackgroundPattern, activeBoard } = React.useContext(MoodboardContext);

    const [onShow, setOnShow] = useState(false)
    const [item, setItem] = useState("")

    const confirmClear = (foo) => {
        if (foo === "board items") {
            handleClearBoard()
        }
        if (foo === "board lines") {
            handleClearPaths()
        }
        hideConfirm()
    }
    const confirmCancel = () => {
        hideConfirm()
        return
    }
    const showConfirm = (bar) => {
        setItem(bar)
        setOnShow(true)
    }
    const hideConfirm = () => {
        setOnShow(false)
    }
    const backgroundOptions = [
        {
            value: "plainColour",
            label: "Plain colour"
        },
        {
            value: "cork",
            label: "Cork"
        },
        {
            value: "lines",
            label: "Lines"
        },
        {
            value: "squares",
            label: "Squares"
        },
    ]


    const boxes = items.filter(item => item.type === "box" && item.board === activeBoard.id)
    const textContents = boxes.map(box => box.text)
    const texts = textContents.join("\n\n")

    return (
        <div className='right-sidebar'>
            <ThemeSwitcher />
            <div className='board-style'>
                <div
                    className='right-sidebar-buttons'
                >
                    <label>Board color: </label>
                    <input
                        type="color"
                        className='board-color'
                        value={activeBoard.boardColor}
                        onChange={(e) => handleBoardColorChange(e)}
                    />
                    <label>Buttons color: </label>
                    <input
                        type="color"
                        className='theme-color'
                        value={activeBoard.buttonsColor}
                        onChange={(e) => handleButtonsColorChange(e)}
                    />
                </div>
                <div
                    className='right-sidebar-buttons'
                >
                    <button
                        style={{ fontWeight: "bold", border: "1px solid #dddddd" }}
                        onClick={handleColorReset}
                    >Reset Colors</button>
                    {/* <button
                        onClick={handleShowBackgroundPattern}
                    >{!backgroundPattern ? "Show Background" : "Hide Background"}</button> */}
                    {/* <label htmlFor="backgrounds">Background:</label> */}
                </div>
                <div
                    className='right-sidebar-buttons'
                >
                    <label htmlFor="backgrounds">Background pattern:</label>
                    <select
                        name="backgrounds"
                        id="backgrounds"
                        className='box-form-top-select'
                        //value={boards.find(board => board.id === activeBoard.id).boardBackground}
                        value={activeBoard.boardBackground}
                        onChange={(e) => handleShowBackgroundPattern(e, activeBoard.id)}
                    // defaultValue="plainColour"
                    >
                        {backgroundOptions.map((option) => (
                            <option
                                className='box-form-top-select-option'
                                key={option.value}
                                value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={`confirm-${onShow ? "show" : ""}`}>
                {onShow &&
                    <Confirm confirmCancel={confirmCancel} item={item} confirmClear={confirmClear} onshow={onShow} />
                }
            </div>
            <div className='right-sidebar-buttons'>
                <Tooltips
                    position="top"
                    width="5rem"
                    height="4rem"
                    top="-4rem"
                    bottom="90%"
                    left="-.5rem"
                    right=""
                    marginRight=""
                    marginLeft=""
                    tipTop="4rem"
                    tipLeft="50%"
                    text="Click to download a pdf copy!"
                >
                    <button
                        title="Click to download a pdf copy"
                        className='toggler'
                        onClick={() => printPdf(divRef.current)}>
                        <div className="print-board">
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
                                    d="M8 4H16V6H8V4ZM18 6H22V18H18V22H6V18H2V6H6V2H18V6ZM20 16H18V14H6V16H4V8H20V16ZM8 16H16V20H8V16ZM8 10H6V12H8V10Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </button>

                </Tooltips>
                <Tooltips
                    position="top"
                    width="5rem"
                    height="4rem"
                    top="-4rem"
                    bottom="90%"
                    left="-.5rem"
                    right=""
                    marginRight=""
                    marginLeft=""
                    tipTop="4rem"
                    tipLeft="50%"
                    text="Click to clear all items!"
                >
                    <button
                        title="Click to clear all items"
                        className='toggler'
                        onClick={() => showConfirm("board items")}>
                        <div className="clear-board">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H8Z"
                                    fill="currentColor"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1 5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5ZM5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </button>
                </Tooltips>
                <Tooltips
                    position="top"
                    width="5rem"
                    height="4rem"
                    top="-4rem"
                    bottom="90%"
                    left="-.5rem"
                    right=""
                    marginRight=""
                    marginLeft=""
                    tipTop="4rem"
                    tipLeft="50%"
                    text="Click to clear all lines!"
                >
                    <button
                        title="Click to clear all lines"
                        className='toggler'
                        onClick={() => showConfirm("board lines")}>
                        <div className="clear-lines">
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9.833,5.22643 C6.21967,6.09793,3.96442,4.63379,3.96442,4.63379 C3.96442,4.63379,3.96442,6.63379,3.96442,6.63379 C3.96442,6.63379,6.16699,8.37026,9.96441,7.38602 C13.6231,6.43774,15.9644,6.63379,15.9644,6.63379 C15.9644,6.63379,14.6145,4.07319,9.833,5.22643 z" fill="currentColor" />
                                <path d="M9.833,9.36263 C6.21967,10.2341,3.96442,8.76999,3.96442,8.76999 C3.96442,8.76999,3.96442,10.77,3.96442,10.77 C3.96442,10.77,6.16699,12.5065,9.96441,11.5222 C13.6231,10.5739,15.9644,10.77,15.9644,10.77 C15.9644,10.77,14.6145,8.20939,9.833,9.36263 z" fill="currentColor" />
                                <path d="M11.3319,12.9145 C11.3319,12.9145,10.4858,13.0805,9.25828,13.3273 C5.61427,14.06,3.96442,12.6131,3.96442,12.6131 C3.96442,12.6131,3.96442,14.6131,3.96442,14.6131 C3.96442,14.6131,6.16157,16.3284,9.96441,15.3653 C10.8898,15.131,11.3319,12.9145,11.3319,12.9145 z" fill="currentColor" />
                                <path
                                    d="M12.9645 13.7093L14.3787 12.295L16.5 14.4163L18.6213 12.2951L20.0355 13.7093L17.9142 15.8305L20.0356 17.9519L18.6214 19.3661L16.5 17.2447L14.3786 19.3661L12.9644 17.9519L15.0858 15.8305L12.9645 13.7093Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </button>
                </Tooltips>
            </div>
            <div className='right-sidebar-buttons'>
                <Tooltips
                    position="bottom"
                    width="4.3rem"
                    height="4rem"
                    top="-6rem"
                    bottom="90%"
                    left="-4rem"
                    right=""
                    marginRight=""
                    marginLeft=""
                    tipTop="-.7rem"
                    tipLeft="50%"
                    text="Download board as text"
                >
                    <button
                        title="Click to download all texts"
                        className='toggler'
                        // style={{ border: "1px solid #dddddd", color: "#3c3c3c" }}
                        onClick={() => downloadTexts("Vible.txt", texts)}>
                        <div
                        // className="print-board"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g transform="matrix(1.23569,0,0,1.23569,-2.35778,-2.3553)">
                                    <path d="M5.417,2.5L2.5,2.5L2.5,5.417L3.333,5.417L3.333,3.333L5.417,3.333L5.417,2.5Z" fill="currentColor" />
                                </g>
                                <g transform="matrix(1.23569,0,0,1.23569,-2.35778,-2.3553)">
                                    <rect x="7.083" y="2.5" width="2.083" height="0.833" />
                                </g>
                                <g transform="matrix(1.23569,0,0,1.23569,-2.35778,-2.3553)">
                                    <rect x="10.833" y="2.5" width="2.083" height="0.833" />
                                </g>
                                <g transform="matrix(1.23569,0,0,1.23569,-2.35778,-2.3553)">
                                    <path d="M14.583,2.5L14.583,3.333L16.667,3.333L16.667,5.417L17.5,5.417L17.5,2.5L14.583,2.5Z" fill="currentColor" />
                                </g>
                                <g transform="matrix(1.23569,0,0,1.23569,-2.35778,-2.3553)">
                                    <rect x="16.667" y="7.083" width="0.833" height="2.083" />
                                </g>
                                <g transform="matrix(1.23569,0,0,1.23569,-2.35778,-2.3553)">
                                    <rect x="16.667" y="10.833" width="0.833" height="2.083" />
                                </g>
                                <g transform="matrix(1.23569,0,0,1.23569,-2.35778,-2.3553)">
                                    <rect x="2.5" y="10.833" width="0.833" height="2.083" />
                                </g>
                                <g transform="matrix(1.23569,0,0,1.23569,-2.35778,-2.3553)">
                                    <rect x="2.5" y="7.083" width="0.833" height="2.083" />
                                </g>
                                <g transform="matrix(1.23569,0,0,1.23569,-2.35778,-2.3553)">
                                    <path d="M9.167,7.917L5.833,7.917L5.833,6.25L14.167,6.25L14.167,7.917L10.833,7.917L10.833,11.037L9.167,11.037L9.167,7.917Z" fill="currentColor" />
                                </g>
                                <g transform="matrix(1.23569,0,0,1.23569,-2.35778,-2.3553)">
                                    <path d="M10.833,13.424L12.426,11.831L13.244,12.649L9.972,15.921L6.701,12.649L7.519,11.831L9.167,13.479L9.167,11.645L10.833,11.645L10.833,13.424Z"
                                        fill="currentColor" />
                                </g>
                                <g transform="matrix(1.15727,0,0,0.714616,-3.86914,4.96045)">
                                    <path d="M4,14L4.856,14L4.856,18.538L19.068,18.538L19.068,14L20,14L20,18C20,19.105 19.105,20 18,20L6,20C4.895,20 4,19.105 4,18L4,14Z" fill="currentColor" />
                                </g>
                            </svg>
                        </div>
                    </button>
                </Tooltips>
                <Tooltips
                    position="bottom"
                    width="4.3rem"
                    height="4rem"
                    top="-6rem"
                    bottom="90%"
                    left="-4rem"
                    right=""
                    marginRight=""
                    marginLeft=""
                    tipTop="-.7rem"
                    tipLeft="50%"
                    text="Download board as SVG"
                >
                    <button
                        title="Click to download as SVG"
                        className='toggler'
                        // style={{ border: "1px solid #dddddd", color: "#3c3c3c" }}
                        onClick={() => downloadSvg(svgRef.current)}>
                        <div
                        // className="print-board"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g transform="matrix(1,0,0,1,0,1.36381)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M11,8.953L13,8.953L13,12.158L16.243,8.915L17.657,10.329L12,15.986L6.343,10.329L7.757,8.915L11,12.158L11,8.953Z"
                                        fill="currentColor" />
                                </g>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4,14L6,14L6,18L18,18L18,14L20,14L20,18C20,19.105 19.105,20 18,20L6,20C4.895,20 4,19.105 4,18L4,14Z"
                                    fill="currentColor" />
                                <g transform="matrix(1.64424,0,0,1.37727,-7.74214,-3.28137)">
                                    <g>
                                        <g transform="matrix(1.05311,0,0,1.05311,-0.8072,1.07489)">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M10.306,4.653L9.16,4.653L9.16,4.302C9.16,4.138 9.146,4.033 9.116,3.988C9.087,3.943 9.038,3.921 8.97,3.921C8.896,3.921 8.84,3.951 8.801,4.012C8.763,4.072 8.744,4.164 8.744,4.287C8.744,4.445 8.766,4.564 8.809,4.644C8.85,4.724 8.966,4.821 9.157,4.934C9.706,5.261 10.052,5.528 10.195,5.737C10.337,5.946 10.408,6.283 10.408,6.748C10.408,7.086 10.369,7.335 10.29,7.495C10.211,7.655 10.058,7.789 9.831,7.898C9.605,8.006 9.341,8.06 9.04,8.06C8.71,8.06 8.428,7.998 8.195,7.873C7.962,7.748 7.809,7.589 7.737,7.395C7.664,7.202 7.628,6.928 7.628,6.572L7.628,6.262L8.774,6.262L8.774,6.839C8.774,7.016 8.79,7.131 8.822,7.181C8.854,7.232 8.911,7.258 8.993,7.258C9.075,7.258 9.136,7.225 9.176,7.161C9.217,7.097 9.237,7.001 9.237,6.874C9.237,6.595 9.198,6.412 9.122,6.326C9.044,6.24 8.852,6.097 8.545,5.895C8.238,5.692 8.035,5.545 7.936,5.453C7.836,5.361 7.754,5.234 7.688,5.072C7.623,4.91 7.59,4.703 7.59,4.451C7.59,4.088 7.636,3.822 7.729,3.654C7.822,3.486 7.972,3.355 8.179,3.26C8.386,3.165 8.636,3.118 8.929,3.118C9.249,3.118 9.522,3.17 9.748,3.273C9.973,3.377 10.123,3.507 10.196,3.664C10.269,3.822 10.306,4.089 10.306,4.466L10.306,4.653Z"
                                                fill="currentColor" />
                                        </g>
                                        <g transform="matrix(1.05311,0,0,1.05311,-0.8072,1.07489)">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M13.725,3.218L13.098,7.961L11.226,7.961L10.514,3.218L11.815,3.218C11.965,4.524 12.072,5.629 12.137,6.531C12.201,5.619 12.269,4.808 12.339,4.099L12.424,3.218L13.725,3.218Z"
                                                fill="currentColor" />
                                        </g>
                                        <g transform="matrix(1.05311,0,0,1.05311,-0.8072,1.07489)">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16.766,4.964L15.532,4.964L15.532,4.533C15.532,4.262 15.521,4.092 15.497,4.023C15.474,3.955 15.418,3.921 15.33,3.921C15.254,3.921 15.202,3.95 15.175,4.009C15.148,4.067 15.134,4.218 15.134,4.46L15.134,6.736C15.134,6.949 15.148,7.089 15.175,7.157C15.202,7.224 15.257,7.258 15.339,7.258C15.429,7.258 15.49,7.22 15.522,7.143C15.554,7.067 15.571,6.919 15.571,6.698L15.571,6.136L15.321,6.136L15.321,5.415L16.766,5.415L16.766,7.961L15.989,7.961L15.875,7.621C15.791,7.767 15.685,7.877 15.557,7.951C15.429,8.024 15.279,8.06 15.105,8.06C14.898,8.06 14.704,8.01 14.523,7.909C14.342,7.809 14.205,7.684 14.112,7.536C14.018,7.388 13.959,7.232 13.936,7.069C13.912,6.906 13.901,6.661 13.901,6.335L13.901,4.926C13.901,4.472 13.925,4.143 13.974,3.938C14.023,3.733 14.163,3.545 14.394,3.374C14.626,3.203 14.925,3.118 15.292,3.118C15.654,3.118 15.953,3.192 16.192,3.341C16.43,3.489 16.585,3.665 16.657,3.869C16.73,4.074 16.766,4.37 16.766,4.759L16.766,4.964Z"
                                                fill="currentColor" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </button>
                </Tooltips>
            </div>
            {/* <button
                title="Click to download as PNG"
                // className='toggler'
                style={{ border: "1px solid #dddddd", color: "#3c3c3c" }}
                onClick={(e) => downloadPng(e, svgRef.current)}>
                <div
                // className="print-board"
                >
                    Download board as PNG
                </div>
            </button> */}
            <DownloadUploadData />
            <div className='sidebar-zoom'>
                <button
                    className='toggler'
                    onClick={handleZoomIn}>
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
                            d="M15.3431 15.2426C17.6863 12.8995 17.6863 9.1005 15.3431 6.75736C13 4.41421 9.20101 4.41421 6.85786 6.75736C4.51472 9.1005 4.51472 12.8995 6.85786 15.2426C9.20101 17.5858 13 17.5858 15.3431 15.2426ZM16.7574 5.34315C19.6425 8.22833 19.8633 12.769 17.4195 15.9075C17.4348 15.921 17.4498 15.9351 17.4645 15.9497L21.7071 20.1924C22.0976 20.5829 22.0976 21.2161 21.7071 21.6066C21.3166 21.9971 20.6834 21.9971 20.2929 21.6066L16.0503 17.364C16.0356 17.3493 16.0215 17.3343 16.008 17.319C12.8695 19.7628 8.32883 19.542 5.44365 16.6569C2.31946 13.5327 2.31946 8.46734 5.44365 5.34315C8.56785 2.21895 13.6332 2.21895 16.7574 5.34315ZM10.1005 7H12.1005V10H15.1005V12H12.1005V15H10.1005V12H7.10052V10H10.1005V7Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
                <button
                    className='toggler'
                    onClick={handleResetZoom}>
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
                            d="M15.343,15.243 C17.686,12.9 17.686,9.101 15.343,6.757 C13,4.414 9.201,4.414 6.858,6.757 C4.515,9.101 4.515,12.9 6.858,15.243 C9.201,17.586 13,17.586 15.343,15.243 z M16.757,5.343 C19.642,8.228 19.863,12.769 17.42,15.908 C17.435,15.921 17.45,15.935 17.465,15.95 L21.707,20.192 C22.098,20.583 22.098,21.216 21.707,21.607 C21.317,21.997 20.683,21.997 20.293,21.607 L16.05,17.364 C16.036,17.349 16.021,17.334 16.008,17.319 C12.87,19.763 8.329,19.542 5.444,16.657 C2.319,13.533 2.319,8.467 5.444,5.343 C8.568,2.219 13.633,2.219 16.757,5.343 z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
                <button
                    className='toggler'
                    onClick={handleZoomOut}>
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
                            d="M15.3431 15.2426C17.6863 12.8995 17.6863 9.1005 15.3431 6.75736C13 4.41421 9.20101 4.41421 6.85786 6.75736C4.51472 9.1005 4.51472 12.8995 6.85786 15.2426C9.20101 17.5858 13 17.5858 15.3431 15.2426ZM16.7574 5.34315C19.6425 8.22833 19.8633 12.769 17.4195 15.9075C17.4348 15.921 17.4498 15.9351 17.4645 15.9497L21.7071 20.1924C22.0976 20.5829 22.0976 21.2161 21.7071 21.6066C21.3166 21.9971 20.6834 21.9971 20.2929 21.6066L16.0503 17.364C16.0356 17.3493 16.0215 17.3343 16.008 17.319C12.8695 19.7628 8.32883 19.542 5.44365 16.6569C2.31946 13.5327 2.31946 8.46734 5.44365 5.34315C8.56785 2.21895 13.6332 2.21895 16.7574 5.34315ZM7.10052 10V12H15.1005V10L7.10052 10Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>
            <div className='zoom-slider' >
                <label
                >Zoom:</label>
                <input
                    type="range"
                    min="5000"
                    max="30000"
                    step="400"
                    name="zoomSlider"
                    value={zoom}
                    onChange={(e) => handleZoomSlider(e)}
                />
            </div>
            <Calculator />
            <Calendar />
        </div >
    )
}

export default RightSidebard
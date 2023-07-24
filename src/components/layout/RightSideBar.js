import React, { useState } from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import { printPdf } from '../utils/printPdf'
import Calculator from "../calculator/Calculator"
import Calendar from "../calendar/Calendar"
import Tooltips from '../tooltips/Tooltips'
import Confirm from "../Helpers/Confirm"
import { MoodboardContext } from "../../context/moodboardContext";


const RightSidebard = () => {
    const { divRef, handleClearBoard, handleClearPaths, handleZoomIn, handleZoomOut } = React.useContext(MoodboardContext);

    const [onShow, setOnShow] = useState(false)
    const [item, setItem] = useState("")

    const confirmClear = (foo) => {
        if (foo === "board") {
            handleClearBoard()
        }
        if (foo === "lines") {
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

    return (
        <div className='right-sidebar'>
            <ThemeSwitcher />
            {onShow &&
                <Confirm confirmCancel={confirmCancel} item={item} confirmClear={confirmClear} />
            }
            <div className='right-sidebar-buttons'>
                <Tooltips
                    position="top"
                    width="5rem"
                    height="5rem"
                    top="-4rem"
                    bottom="90%"
                    left=".5rem"
                    right=""
                    marginRight=""
                    marginLeft=""
                    tipTop="5rem"
                    tipLeft="50%"
                    text="Click to download a pdf copy!"
                >
                    <button className='toggler' onClick={() => printPdf(divRef.current)}>
                        <div className="prnt-board">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V12.1578L16.2428 8.91501L17.657 10.3292L12.0001 15.9861L6.34326 10.3292L7.75748 8.91501L11 12.1575V5Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
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
                    top="-3rem"
                    bottom="90%"
                    left="0"
                    right=""
                    marginRight=""
                    marginLeft=""
                    tipTop="4rem"
                    tipLeft="50%"
                    text="Click to clear the board!"
                >
                    <button className='toggler' onClick={() => showConfirm("board")}>
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
                    top="-3rem"
                    bottom="90%"
                    left="-.5rem"
                    right=""
                    marginRight=""
                    marginLeft=""
                    tipTop="4rem"
                    tipLeft="70%"
                    text="Click to clear all lines!"
                >
                    <button className='toggler' onClick={() => showConfirm("lines")}>
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

            <div className='sidebar-zoom'>
                <button onClick={handleZoomIn}>
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
                <button onClick={handleZoomOut}>
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
            <Calculator />
            <Calendar />
        </div>
    )
}

export default RightSidebard

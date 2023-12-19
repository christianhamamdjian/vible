import React, { useState, useEffect } from 'react'
import { isSafari } from "../utils/browserDetector"
import { MoodboardContext } from "../../context/moodboardContext";

const TopControls = ({ item }) => {
    const { handleDeleteItem, handleEditItem, editingItem, handleStopEditItem, isEditingBoard } = React.useContext(MoodboardContext);
    const [onShow, setOnShow] = useState(false)

    const confirmDelete = (id) => {
        handleDeleteItem(id);
        setOnShow(false)
    }

    const showConfirm = () => {
        setOnShow(true)
    }

    const safariBrowser = () => {
        return isSafari && (item.type === "video" || item.type === "mapUrl" || item.type === "pdf")
    }

    useEffect(() => {
        setOnShow(false)
    }, [editingItem])

    return (
        <>
            {onShow && isEditingBoard && editingItem.id === item.id && <>
                <rect
                    id="delete-confirmation"
                    x={item.type === "box" ? item.x : "0"}
                    // y="-64"
                    y={item.type === "box" ? `${safariBrowser() ? item.y - 74 : item.y - 44}` : `${safariBrowser() ? - 74 : - 44}`}
                    height="50"
                    width="124"
                    rx="6"
                    fill="purple"
                    // onPointerOver={(e) => handleEditItem(e, item.id)}
                    // onPointerOut={(e) => handleEditItem(e, item.id)}
                    className="box-control"
                />
                <text
                    x={item.type === "box" ? item.x + 18 : "18"}
                    // y="-42"
                    y={item.type === "box" ? `${safariBrowser() ? item.y - 47 : item.y - 17}` : `${safariBrowser() ? - 47 : - 17}`}
                    width="24"
                    height="20"
                    fill="white"
                    className="box-control-sign"
                >Delete?</text>
                <g>
                    <svg

                        x={item.type === "box" ? item.x + 78 : "78"}
                        // y="-57"
                        y={item.type === "box" ? `${safariBrowser() ? item.y - 62 : item.y - 32}` : `${safariBrowser() ? - 62 : - 32}`}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="transparent"
                        className='box-control-cursor'
                        onClick={() => confirmDelete(item.id)}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
                            fill="#ffffff"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                            fill="#ffffff"
                        />
                        {/* <path
                            d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z"
                            fill="#ffffff"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                            fill="#ffffff"
                        /> */}
                    </svg>
                    <rect
                        id="delete-confirm"
                        x={item.type === "box" ? item.x + 78 : "78"}
                        // y="-57"
                        y={item.type === "box" ? `${safariBrowser() ? item.y - 62 : item.y - 32}` : `${safariBrowser() ? - 62 : - 32}`}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="transparent"
                        className='box-control-cursor'
                        onClick={() => confirmDelete(item.id)}
                    />
                </g>
                {/* <g>
                    <svg
                        x={item.type === "box" ? item.x + 104 : "104"}
                        // y="-57"
                        y={item.type === "box" ? `${safariBrowser() ? item.y - 67 : item.y - 37}` : `${safariBrowser() ? - 67 : - 37}`}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="transparent"
                        className='box-control-cursor'
                        onClick={() => confirmDelete(item.id)}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
                            fill="#ffffff"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                            fill="#ffffff"
                        />
                    </svg>
                    <rect
                        x={item.type === "box" ? item.x + 104 : "104"}
                        // y="-57"
                        y={item.type === "box" ? `${safariBrowser() ? item.y - 67 : item.y - 37}` : `${safariBrowser() ? - 67 : - 37}`}
                        width="24"
                        height="24"
                        fill="transparent"
                        className='box-control-cursor'
                        onClick={() => confirmDelete(item.id)}
                    />
                    <title>Confirm Delete</title>
                </g> */}
            </>}
            {isEditingBoard && <>
                {editingItem && editingItem.id === item.id && !onShow && <>
                    <g>
                        <rect
                            // x={item.type === "box" ? item.x + 60 : "60"}
                            // // y="-22"
                            // y={item.type === "box" ? `${safariBrowser() ? item.y - 52 : item.y - 22}` : `${safariBrowser() ? - 52 : - 22}`}
                            x={item.type === "box" ? item.x + 10 : "10"}
                            y={item.type === "box" ? `${safariBrowser() ? item.y - 52 : item.y - 22}` : `${safariBrowser() ? - 52 : - 22}`}
                            height="15"
                            width="20"
                            rx="4"
                            fill="red"
                            id="delete-button"
                            className='box-control'
                            onClick={() => showConfirm(item.id)}
                            onPointerOver={(e) => handleEditItem(e, item.id)}
                        // onPointerOut={(e) => handleEditItem(e, item.id)}
                        />
                        <title>Delete box</title>
                        <text
                            id="delete-text"
                            // x={item.type === "box" ? item.x + 66 : "66"}
                            // y={item.type === "box" ? `${safariBrowser() ? item.y - 11 : item.y - 11}` : `${safariBrowser() ? - 41 : - 11}`}
                            x={item.type === "box" ? item.x + 16 : "16"}
                            y={item.type === "box" ? `${safariBrowser() ? item.y - 31 : item.y - 11}` : `${safariBrowser() ? 31 : -11}`}
                            width="24"
                            height="20"
                            fill="pink"
                            className="box-control-sign"
                            onClick={() => showConfirm(item.id)}
                            style={{ userSelect: "none", fontWeight: "bold" }}
                            onPointerOver={(e) => handleEditItem(e, item.id)}
                        // onPointerOut={(e) => handleEditItem(e, item.id)}
                        >&times;</text>
                    </g>
                </>
                }
                {/* <g>
                    <rect
                        x={item.type === "box" ? item.x + 10 : "10"}
                        // y="-22"
                        y={item.type === "box" ? `${safariBrowser() ? item.y - 52 : item.y - 22}` : `${safariBrowser() ? - 52 : - 22}`}
                        height="15"
                        width="20"
                        rx="4"
                        fill="green"
                        className='box-control'
                        onClick={(e) => handleEditItem(e, item.id)}
                    />
                </g>

                <title>Activate editing</title>
                {editingItem && editingItem.id === item.id && <>
                    <g>  <rect
                        x={item.type === "box" ? item.x + 35 : "35"}
                        y={item.type === "box" ? `${safariBrowser() ? item.y - 52 : item.y - 22}` : `${safariBrowser() ? - 52 : - 22}`}
                        height="15"
                        width="20"
                        rx="4"
                        fill="orange"
                        className='box-control'
                        onClick={handleStopEditItem}
                    />
                        <title>Deactivate editing</title>
                    </g>
                </> */}
            </>
            }
        </>
    )
}

export default TopControls
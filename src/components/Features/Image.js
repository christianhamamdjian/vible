import React, { useState, useEffect } from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Image = ({ item }) => {
    const { itemRef, handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleDeleteItem, handleEditImage, editingImage, handleStopEditItem, isEditingBoard } = React.useContext(MoodboardContext);

    const [loadedImage, setLoadedImage] = useState(null)

    const [onShow, setOnShow] = useState(false)

    const confirmDelete = (id) => {
        handleDeleteItem(id);
        hideConfirm()
    }
    const confirmCancel = () => {
        hideConfirm()
        return
    }
    const showConfirm = () => {
        setOnShow(true)
    }
    const hideConfirm = () => {
        setOnShow(false)
    }

    useEffect(() => {
        setLoadedImage(item.type === "image" && itemRef.current)
    }, [])

    return (
        <>
            {item.type === "image" &&
                <>
                    <g
                        x="0"
                        y="0"
                        transform={`rotate(${item.angle || 0}, 
                        ${(loadedImage && (loadedImage.naturalHeight * item.width / 100)) / 2}, 
                        ${(loadedImage && (loadedImage.naturalHeight * item.width / 100)) / 2}
                        )`}
                        onPointerDown={e => { handleRectPointerDown(e, item.id) }}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                        onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                        onDoubleClick={(e) => handleEditImage(e, item.id)}
                        style={{
                            minWidth: "100px",
                            maxWidth: "500px",
                            minHeight: "100px",
                            maxHeight: "500px",
                        }}
                    >
                        {isEditingBoard && (
                            <>
                                <circle
                                    id="rotate"
                                    fill="#cccccc"
                                    cx="-15"
                                    cy={`${(loadedImage && (loadedImage.naturalHeight * item.width / 100)) / 2}`}
                                    width="20"
                                    height="20"
                                    r='12'
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="#cccccc"
                                    x={(loadedImage && (loadedImage.naturalWidth * item.width / 100)) - 15}
                                    y={(loadedImage && (loadedImage.naturalHeight * item.width / 100)) - 15}
                                    width="20"
                                    height="20"
                                    rx="4"
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="white"
                                    x={(loadedImage && (loadedImage.naturalWidth * item.width / 100)) - 18}
                                    y={(loadedImage && (loadedImage.naturalHeight * item.width / 100)) - 18}
                                    width="20"
                                    height="20"
                                    rx="2"
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                />
                            </>)}
                        <foreignObject
                            className='image-object'
                            width={loadedImage && (loadedImage.naturalWidth * item.width / 100)}
                            height={loadedImage && (loadedImage.naturalHeight * item.width / 100)}
                            style={{
                                // transform: `rotate(${item.angle || 0}deg)`,
                                // transformOrigin: `${item.width / 2, item.height / 2}`,
                                display: "block",
                                zIndex: "999999",
                                position: "absolute",
                                top: "0",
                                right: "0",
                                bottom: "0",
                                left: "0",
                                opacity: item.opacity,
                                // minWidth: "100px",
                                // maxWidth: "500px",
                                // minHeight: "100px",
                                // maxHeight: "500px",
                            }}
                        >
                            <img
                                ref={itemRef}
                                src={item.src}
                                // x="100"
                                // y="100"
                                width={loadedImage && (loadedImage.naturalWidth * item.width / 100)}
                                height={loadedImage && (loadedImage.naturalHeight * item.width / 100)}
                                fill="#ffffff"
                                className='image-media'
                                alt="uploaded-image"
                                style={{
                                    borderRadius: ".5rem",
                                    // opacity: item.opacity,
                                    //     minWidth: "100px",
                                    //     maxWidth: "500px",
                                    //     minHeight: "100px",
                                    //     maxHeight: "500px",
                                }}
                            />
                        </foreignObject>
                        <rect
                            fill="transparent"
                            width={loadedImage && (loadedImage.naturalWidth * item.width / 100)}
                            height={loadedImage && (loadedImage.naturalHeight * item.width / 100)}
                        />
                        {onShow && <>
                            <rect
                                x="10"
                                y="-64"
                                height="40"
                                width="124"
                                rx="6"
                                fill="purple"
                                className="box-control"
                            />
                            <text
                                x="18"
                                y="-42"
                                width="24"
                                height="20"
                                fill="white"
                                className="box-control-sign"
                            >Really?</text>
                            <svg
                                x="68"
                                y="-57"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="transparent"
                                style={{
                                    cursor: "pointer"
                                }}
                                onClick={confirmCancel}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z"
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
                                x="68"
                                y="-57"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="transparent"
                                style={{
                                    cursor: "pointer"
                                }}
                                onClick={confirmCancel}
                            />
                            <svg
                                x="104"
                                y="-57"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="transparent"
                                style={{
                                    cursor: "pointer"
                                }}
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
                                x="104"
                                y="-57"
                                width="24"
                                height="24"
                                fill="transparent"
                                style={{
                                    cursor: "pointer"
                                }}
                                onClick={() => confirmDelete(item.id)}
                            />
                        </>}
                        {isEditingBoard && <>
                            <rect
                                x="10"
                                y="-22"
                                height="20"
                                width="24"
                                rx="6"
                                fill="red"
                                stroke="white"
                                strokeWidth="2"
                                className='box-control'
                                onClick={() => showConfirm(item.id)}
                                style={{ userSelect: "none" }}
                            />
                            <text
                                x="18"
                                y="-9"
                                width="24"
                                height="20"
                                fill="white"
                                className="box-control-sign"
                                onClick={() => showConfirm(item.id)}
                                style={{ userSelect: "none" }}
                            >&times;</text>
                            <rect
                                x="60"
                                y="-22"
                                height="20"
                                width="24"
                                rx="6"
                                fill="green"
                                stroke="white"
                                strokeWidth="2"
                                className='box-control'
                                onClick={(e) => handleEditImage(e, item.id)}
                            />
                            <text
                                x="68"
                                y="-9"
                                width="24"
                                height="20"
                                fill="white"
                                className="box-control-sign"
                                style={{ userSelect: "none" }}
                                onClick={(e) => handleEditImage(e, item.id)}
                            >+</text>

                            {editingImage && editingImage.id === item.id && <>
                                <rect
                                    x="35"
                                    y="-22"
                                    height="20"
                                    width="24"
                                    rx="6"
                                    fill="orange"
                                    stroke="white"
                                    strokeWidth="2"
                                    className='box-control'
                                    style={{ userSelect: "none" }}
                                    onClick={handleStopEditItem}
                                />
                                <text
                                    x="43"
                                    y="-9"
                                    width="24"
                                    height="20"
                                    fill="white"
                                    className="box-control-sign"
                                    style={{ userSelect: "none" }}
                                    onClick={handleStopEditItem}
                                >-</text>
                            </>
                            }
                        </>
                        }</g>
                </>
            }
        </>
    )
}
export default Image
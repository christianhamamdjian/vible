import React, { useState, useEffect } from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Image = ({ item }) => {
    const { itemRef, handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleDeleteItem, handleEditImage, editingImage, handleStopEditItem, isEditingBoard } = React.useContext(MoodboardContext);

    const [loadedImage, setLoadedImage] = useState(null)

    useEffect(() => {
        setLoadedImage(item.type === "image" && itemRef.current)
    }, [])
    return (
        <>
            {item.type === "image" &&
                <>
                    <g
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
                                    cx="-30"
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
                                // minWidth: "100px",
                                // maxWidth: "500px",
                                // minHeight: "100px",
                                // maxHeight: "500px",
                            }}
                        >
                            <img
                                ref={itemRef}
                                src={item.src}
                                x="0"
                                y="0"
                                width={loadedImage && (loadedImage.naturalWidth * item.width / 100)}
                                height={loadedImage && (loadedImage.naturalHeight * item.width / 100)}
                                fill="#ffffff"
                                className='image-media'
                                style={{
                                    opacity: `${item.opacity}`,
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
                                onClick={() => handleDeleteItem(item.id)}
                                style={{
                                    minWidth: "100px",
                                    maxWidth: "500px",
                                    minHeight: "100px",
                                    maxHeight: "500px",
                                }}
                            />
                            <text
                                x="18"
                                y="-9"
                                width="24"
                                height="20"
                                fill="white"
                                className="box-control-sign"
                                onClick={() => handleDeleteItem(item.id)}
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
                                onClick={() => handleEditImage(item.id)}
                            />
                            <text
                                x="68"
                                y="-9"
                                width="24"
                                height="20"
                                fill="white"
                                className="box-control-sign"
                                onClick={() => handleEditImage(item.id)}
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
                                    onClick={handleStopEditItem}
                                />
                                <text
                                    x="43"
                                    y="-9"
                                    width="24"
                                    height="20"
                                    fill="white"
                                    className="box-control-sign"
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
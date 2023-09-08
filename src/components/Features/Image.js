import React, { useState, useEffect } from 'react';
import TopControls from "../helperFunctions/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const Image = ({ item }) => {
    const { activeBoard, itemRef, handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleEditItem, isEditingBoard, } = React.useContext(MoodboardContext);

    const [loadedImage, setLoadedImage] = useState(null)

    useEffect(() => {
        if (item.type === "image" && item.board === activeBoard.id) {
            const imageSource = itemRef.current.href.baseVal
            const newImage = document.createElement("img")
            newImage.src = imageSource
            setLoadedImage(newImage)
        }
    }, [])
    const calculatedHeight = loadedImage && ((loadedImage.naturalHeight / loadedImage.naturalWidth) * item.width)

    return (
        <>
            {item.type === "image" && item.board === activeBoard.id &&
                <>
                    <g
                        transform={`rotate(${item.angle || 0}, ${item.width / 2}, ${calculatedHeight / 2})`}
                    >
                        <image
                            ref={itemRef}
                            href={item.src}
                            x="0"
                            y="0"
                            clipPath={`inset(${item.cropHeight}% ${item.cropWidth}% round ${item.roundCorners}px)`}
                            width={item.width}
                            height={calculatedHeight}
                            onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                            onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                            onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                            onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                            onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                            onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                            onDoubleClick={(e) => handleEditItem(e, item.id)}
                            className='image-media'
                            style={{
                                display: "block",
                                zIndex: "999999",
                                position: "absolute",
                                top: "0",
                                right: "0",
                                bottom: "0",
                                left: "0",
                                opacity: item.opacity,
                            }}
                        />
                        <TopControls item={item} />
                        {isEditingBoard && (
                            <>
                                <circle
                                    id="rotate"
                                    fill="#cccccc"
                                    cx="-20"
                                    cy={calculatedHeight / 2}
                                    width="20"
                                    height="20"
                                    r='12'
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="#cccccc"
                                    x={item.width}
                                    y={calculatedHeight}
                                    width="20"
                                    height="20"
                                    rx="4"
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                />
                            </>)}
                    </g >
                </>
            }
        </>
    )
}
export default Image
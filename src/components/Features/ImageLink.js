import React, { useState, useEffect } from 'react';
import TopControls from "../helperComponents/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const ImageLink = ({ item }) => {
    const { activeBoard, itemRef, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, handleEditItem, isEditingBoard, isDraggingRect, selectedRectId } = React.useContext(MoodboardContext);

    const [loadedImage, setLoadedImage] = useState(null)

    useEffect(() => {
        if (item.type === "imageUrl" && item.board === activeBoard.id) {
            // const imageSource = itemRef.current.href.baseVal
            const imageSource = item.imageUrl
            const newImage = document.createElement("img")
            newImage.src = imageSource
            setLoadedImage(newImage)
        }
    }, [item, activeBoard])
    const calculatedHeight = loadedImage && ((loadedImage.naturalHeight / loadedImage.naturalWidth) * item.width)
    return (
        <>
            {item.type === "imageUrl" && item.board === activeBoard.id &&
                <>
                    <g
                        transform={`rotate(${item.angle || 0}, ${item.width / 2}, ${calculatedHeight / 2})`}
                        style={{ opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1 }}
                    >
                        <image
                            ref={itemRef}
                            href={item.imageUrl}
                            x="0"
                            y="0"
                            width={item.width}
                            height={calculatedHeight && calculatedHeight}
                            clipPath={`inset(${item.cropHeight}% ${item.cropWidth}% round ${item.roundCorners}px)`}
                            onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                            onPointerMove={(e) => handleSvgPointerMove(e, item.id)}
                            onPointerUp={(e) => handleSvgPointerUp(e, item.id)}
                            onTouchStart={e => handleSvgPointerDown(e, item.id)}
                            onTouchMove={(e) => handleSvgPointerMove(e, item.id)}
                            onTouchEnd={(e) => handleSvgPointerUp(e, item.id)}
                            onDoubleClick={(e) => handleEditItem(e, item.id)}
                            className='imagelink-media'
                            style={{
                                opacity: item.opacity,
                            }}
                        />
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
                                    onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="#cccccc"
                                    x={item.width}
                                    y={calculatedHeight}
                                    width="20"
                                    height="20"
                                    rx="4"
                                    onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                />
                            </>)}
                        {isEditingBoard && <TopControls item={item} />}
                    </g >
                </>
            }
        </>
    )
}
export default ImageLink
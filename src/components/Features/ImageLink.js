import React, { useState, useEffect } from 'react';
import TopControls from "../helperComponents/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const ImageLink = ({ item }) => {
    const { activeBoard, itemRef, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, handleEditItem, isEditingBoard, isDraggingRect, selectedRectId, editingItem } = React.useContext(MoodboardContext);

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
                        style={{ opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1 }}
                    >
                        <image
                            ref={itemRef}
                            href={item.imageUrl}
                            x={item.x}
                            y={item.y}
                            width={item.width}
                            height={calculatedHeight && calculatedHeight}
                            transform={`rotate(${item.angle % 360 || 0}, ${item.x + item.width / 2}, ${item.y + calculatedHeight / 2})`}
                            clipPath={`inset(${item.cropTop || 0}% ${item.cropRight || 0}% ${item.cropBottom || 0}% ${item.cropLeft || 0}% round ${item.roundCorners || 0}px)`}
                            onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                            onPointerMove={(e) => handleSvgPointerMove(e, item.id)}
                            onPointerUp={(e) => handleSvgPointerUp(e, item.id)}
                            onTouchStart={e => handleSvgPointerDown(e, item.id)}
                            onTouchMove={(e) => handleSvgPointerMove(e, item.id)}
                            onTouchEnd={(e) => handleSvgPointerUp(e, item.id)}
                            // onDoubleClick={(e) => handleEditItem(e, item.id)}
                            onClick={(e) => handleEditItem(e, item.id)}
                            id="image-url"
                            className='imagelink-media'
                            style={{
                                opacity: item.opacity,
                            }}
                        />
                        <g key={item.id}
                            transform={`rotate(${item.angle % 360 || 0}, ${item.x + item.width / 2}, ${item.y + calculatedHeight / 2})`}
                            style={{
                                transform: `translate(${item.x},${item.y})`
                            }}
                        >
                            {isEditingBoard && <TopControls item={item} />}
                            {isEditingBoard && editingItem && editingItem.id === item.id && (
                                <>
                                    <circle
                                        id="rotate"
                                        fill="#cccccc"
                                        cx={item.x - 20}
                                        cy={`${item.y + (calculatedHeight / 2)}`}
                                        width="20"
                                        height="20"
                                        r='12'
                                        onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                    />
                                    <rect
                                        id="resize"
                                        fill="#cccccc"
                                        x={`${item.x + item.width}`}
                                        y={`${item.y + calculatedHeight}`}
                                        width="20"
                                        height="20"
                                        rx="4"
                                        onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                    />
                                </>)}

                        </g >
                    </g>
                </>
            }
        </>
    )
}
export default ImageLink
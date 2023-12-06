import React, { useState, useEffect } from 'react';
import TopControls from "../helperComponents/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const Image = ({ item }) => {
    const { activeBoard, itemRef, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, handleEditItem, isEditingBoard, isDraggingRect, selectedRectId, editingItem } = React.useContext(MoodboardContext);

    const [loadedImage, setLoadedImage] = useState(null)

    useEffect(() => {
        if (item.type === "image" && item.board === activeBoard.id) {
            let newImage = document.createElement("img")
            newImage.src = item.src
            setLoadedImage(newImage)
        }
    }, [item, activeBoard])

    const calculatedHeight = loadedImage && ((loadedImage.naturalHeight / loadedImage.naturalWidth) * item.width)

    return (
        <>
            {item.type === "image" && item.board === activeBoard.id &&
                <>
                    <g key={item.id}
                        transform={`translate(${item.x},${item.y})`}
                    >
                        <g
                            transform={`rotate(${item.angle || 0}, ${item.width / 2}, ${calculatedHeight / 2})`}
                            style={{ opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1 }}
                        >
                            <image
                                ref={itemRef}
                                href={item.src}
                                x="0"
                                y="0"
                                clipPath={`inset(${item.cropHeight}% ${item.cropWidth}% round ${item.roundCorners}px)`}
                                width={item.width}
                                height={calculatedHeight}
                                onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                onPointerMove={(e) => handleSvgPointerMove(e, item.id)}
                                onPointerUp={(e) => handleSvgPointerUp(e, item.id)}
                                onTouchStart={e => { handleSvgPointerDown(e, item.id) }}
                                onTouchMove={(e) => handleSvgPointerMove(e, item.id)}
                                onTouchEnd={(e) => handleSvgPointerUp(e, item.id)}
                                onDoubleClick={(e) => handleEditItem(e, item.id)}
                                className='image-media'
                                style={{
                                    opacity: item.opacity,
                                }}
                            />
                            {isEditingBoard && <TopControls item={item} />}
                            {isEditingBoard && editingItem && editingItem.id === item.id && (
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
                        </g >
                    </g>
                </>
            }
        </>
    )
}
export default Image
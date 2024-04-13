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
                    <image
                        key={item.id}
                        ref={itemRef}
                        href={item.src}
                        x={item.x}
                        y={item.y}
                        transform={`rotate(${item.angle % 360 || 0}, ${item.x + item.width / 2}, ${item.y + calculatedHeight / 2})`}
                        clipPath={`inset(${item.cropTop}% ${item.cropRight}% ${item.cropBottom}% ${item.cropLeft}% round ${item.roundCorners}px)`}
                        width={item.width}
                        height={calculatedHeight}
                        onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                        onPointerMove={(e) => handleSvgPointerMove(e, item.id)}
                        onPointerUp={(e) => handleSvgPointerUp(e, item.id)}
                        onTouchStart={(e) => handleSvgPointerDown(e, item.id)}
                        onTouchMove={(e) => handleSvgPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleSvgPointerUp(e, item.id)}
                        // onDoubleClick={(e) => handleEditItem(e, item.id)}
                        onClick={(e) => handleEditItem(e, item.id)}
                        id="image"
                        className='image-media'
                        style={{
                            opacity: item.opacity,
                            // clipPath: `inset(${item.cropTop}% ${item.cropRight}% ${item.cropBottom}% ${item.cropLeft}% round ${item.roundCorners}px)`,
                            // transform: `rotate(${item.angle || 0}, ${item.x + item.width / 2}, ${item.y + calculatedHeight / 2})`,
                            // transition: 'transform 0.3s ease',
                        }}
                    />
                    <g
                        transform={`rotate(${item.angle % 360 || 0}, ${item.x + item.width / 2}, ${item.y + calculatedHeight / 2})`}
                        style={{
                            //opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1 ,
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
                </>
            }
        </>
    )
}
export default Image
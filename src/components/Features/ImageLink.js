import React, { useState, useEffect } from 'react';
import TopControls from "../helperFunctions/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const ImageLink = ({ item }) => {
    const { itemRef, handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleEditItem, isEditingBoard } = React.useContext(MoodboardContext);
    const [loadedImage, setLoadedImage] = useState(null)

    useEffect(() => {
        if (item.type === "imageUrl") {
            const imageSource = itemRef.current.href.baseVal
            const newImage = document.createElement("img")
            newImage.src = imageSource
            setLoadedImage(newImage)
        }
    }, [])
    const calculatedHeight = loadedImage && ((loadedImage.naturalHeight / loadedImage.naturalWidth) * item.width)
    return (
        <>
            {item.type === "imageUrl" &&
                <>
                    <g
                        style={{
                            transform: `rotate(${item.angle || 0}deg)`,
                            transformOrigin: `${item.width / 2}, ${calculatedHeight / 2}`,
                        }}
                    >
                        {isEditingBoard && (
                            <>
                                <circle
                                    id="rotate"
                                    fill="#cccccc"
                                    cx="-15"
                                    cy={calculatedHeight / 2}
                                    width="20"
                                    height="20"
                                    r='12'
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="#cccccc"
                                    x={item.width - 15}
                                    y={calculatedHeight - 15}
                                    width="20"
                                    height="20"
                                    rx="4"
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="white"
                                    x={item.width - 18}
                                    y={calculatedHeight - 18}
                                    width="20"
                                    height="20"
                                    rx="2"
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                />
                            </>)}
                        {/* <rect
                            width="120"
                            height="20"
                            fill="transparent"
                            className='imagelink-object'
                        /> */}
                        <image
                            ref={itemRef}
                            href={item.imageUrl}
                            x="0"
                            y="0"
                            width={item.width}
                            // height={calculatedHeight}
                            onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                            onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                            onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                            onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                            onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                            onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                            onDoubleClick={(e) => handleEditItem(e, item.id)}
                            className='imagelink-media'
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
                    </g >
                </>
            }
        </>
    )
}
export default ImageLink
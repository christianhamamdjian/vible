import React, { useState, useEffect } from 'react';
import TopControls from "../helpers/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const Image = ({ item }) => {
    const { itemRef, handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleEditItem, isEditingBoard, } = React.useContext(MoodboardContext);

    const [loadedImage, setLoadedImage] = useState(null)

    useEffect(() => {
        if (item.type === "image") {
            const imageSource = itemRef.current.href.baseVal
            const newImage = document.createElement("img")
            newImage.src = imageSource
            setLoadedImage(newImage)
        }
    }, [])

    return (
        <>
            {item.type === "image" &&
                <>
                    <g
                        style={{
                            transform: `rotate(${item.angle || 0}deg)`,
                            transformOrigin: `${(loadedImage && (loadedImage.naturalWidth * item.width / 100)) / 2}, ${(loadedImage && (loadedImage.naturalHeight * item.width / 100)) / 2}`,
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
                        <image
                            ref={itemRef}
                            href={item.src}
                            x="0"
                            y="0"
                            width={loadedImage && (loadedImage.naturalWidth * item.width / 100) || "100"}
                            height={loadedImage && (loadedImage.naturalHeight * item.width / 100) || "100"}
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
                    </g >
                </>
            }
        </>
    )
}
export default Image
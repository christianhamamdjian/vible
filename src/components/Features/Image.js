import React, { useState, useEffect } from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Image = ({ item }) => {
    const { itemRef, handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleDeleteItem, handleEditImage, editingImage, handleStopEditImage, isEditingBoard } = React.useContext(MoodboardContext);

    const [loadedImage, setLoadedImage] = useState(null)

    useEffect(() => {
        setLoadedImage(item.type === "image" && itemRef.current)
    }, [])
    return (
        <>
            {item.type === "image" &&
                <>
                    <foreignObject
                        style={{ cursor: 'move', boxShadow: "2px 20px 30px rgba(0, 0, 0, 0.2" }}
                        width={loadedImage && (loadedImage.naturalWidth * item.width / 100 || loadedImage.naturalWidth * 10 / 100)}
                        height={loadedImage && (loadedImage.naturalHeight * item.width / 100 || loadedImage.naturalHeight * 10 / 100)}
                    >
                        <img
                            ref={itemRef}
                            src={item.src}
                            x="0"
                            y="0"
                            width={loadedImage && (loadedImage.naturalWidth * item.width / 100 || loadedImage.naturalWidth * 10 / 100)}
                            height={loadedImage && (loadedImage.naturalHeight * item.width / 100 || loadedImage.naturalHeight * 10 / 100)}
                            fill="#ffffff"
                            onPointerDown={e => { handleRectPointerDown(e, item.id) }}
                            onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                            onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                            onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                            onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                            onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                            style={{
                                cursor: 'move',
                                boxShadow: "2px 20px 30px rgba(0, 0, 0, 0.2"
                            }} />
                    </foreignObject>
                    {isEditingBoard && <><circle
                        cx="0"
                        cy="0"
                        r="8"
                        fill="red"
                        stroke="white"
                        strokeWidth="2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteItem(item.id)}
                    />
                        <circle
                            cx="40"
                            cy="0"
                            r="8"
                            fill="orange"
                            stroke="white"
                            strokeWidth="2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEditImage(item.id)}
                        />
                        {editingImage && editingImage.id === item.id && <circle
                            cx="20"
                            cy="0"
                            r="8"
                            fill="green"
                            stroke="white"
                            strokeWidth="2"
                            style={{ cursor: 'pointer' }}
                            onClick={handleStopEditImage}
                        />
                        }</>}

                </>
            }
        </>
    )
}
export default Image
import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const ImageLink = ({ item }) => {
    const { handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleDeleteItem, handleEditImage, editingImage, handleStopEditImage, isEditingBoard } = React.useContext(MoodboardContext);
    return (
        <>
            {item.type === "imageUrl" &&
                <>
                    <rect
                        width="120"
                        height="20"
                        fill="transparent"
                        style={{ border: '1px solid black', backgroundColor: "transparent", cursor: 'move' }}
                    />
                    <image
                        href={item.imageUrl}
                        x="0"
                        y="0"
                        width={item.width || "100"}
                        onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                        onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                        style={{ cursor: 'move', userSelect: "none", }} />
                    {isEditingBoard && <><rect
                        x="10"
                        y="-12"
                        height="10"
                        width="24"
                        fill="red"
                        stroke="white"
                        strokeWidth="2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteItem(item.id)}
                    />
                        <rect
                            x="60"
                            y="-12"
                            height="10"
                            width="24"
                            fill="orange"
                            stroke="white"
                            strokeWidth="2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEditImage(item.id)}
                        />
                        {editingImage && editingImage.id === item.id && <rect
                            x="35"
                            y="-12"
                            height="10"
                            width="24"
                            fill="green"
                            stroke="white"
                            strokeWidth="2"
                            style={{ cursor: 'pointer' }}
                            onClick={handleStopEditImage}
                        />}</>}
                </>}
        </>
    )
}
export default ImageLink
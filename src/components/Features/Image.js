import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Image = ({ item }) => {
    const { handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleDeleteItem, handleEditImage, editingImage, handleStopEditImage, isEditingBoard } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "image" &&
                <>
                    <rect
                        width="120"
                        height="120"
                        fill="transparent"
                        style={{ border: '1px solid black', backgroundColor: "red", cursor: 'move' }}
                    />
                    <image
                        href={item.src}
                        x="0"
                        y="0"
                        width={item.width || "100"}
                        onPointerDown={e => { handleRectPointerDown(e, item.id) }}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                        onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                        style={{ cursor: 'move' }} />
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
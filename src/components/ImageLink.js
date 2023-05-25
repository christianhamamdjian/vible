import React from 'react';
import { MoodboardContext } from "../context/moodboard";

const ImageLink = ({ item }) => {
    const { handleMouseDown, handleDeleteItem, handleEditImage, editingImage, handleStopEditImage } = React.useContext(MoodboardContext);
    return (
        <>
            {item.type === "imageUrl" &&
                <>
                    <rect
                        width="120"
                        height="120"
                        fill="transparent"
                        style={{ border: '1px solid black', backgroundColor: "transparent", cursor: 'move' }}
                    />
                    <image href={item.imageUrl}
                        x="0"
                        y="0"
                        width={item.width || "100"}
                        height={item.width || "100"}
                        onMouseDown={e => {
                            handleMouseDown(e, item.id)
                        }}
                        style={{ cursor: 'move' }} />
                    <circle
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
                    />}
                </>}
        </>
    )
}
export default ImageLink
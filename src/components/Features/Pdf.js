import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Pdf = ({ item }) => {
    const { handleMouseDown, handleMouseUp, handleDeleteItem, handleEditImage, editingImage, handleStopEditImage, isEditingBoard } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "pdf" &&
                <>
                    <foreignObject
                        x="0"
                        y="0"
                        width="160"
                        height="160"
                        draggable="true"
                        style={{
                            cursor: 'move', backgroundColor: item.color, padding: "1rem", borderRadius: "6px"
                        }}
                        onMouseDown={(e) => handleMouseDown(e, item.id)}
                        onMouseUp={handleMouseUp}
                        onTouchStart={(e) => handleMouseDown(e, item.id)}
                        onTouchEnd={handleMouseUp}
                    >
                        <object data={item.data} type="application/pdf"
                            x="100"
                            y="100"
                            width={item.width || "300"}
                            height={item.width || "300"}
                            onMouseDown={e => { handleMouseDown(e, item.id) }}
                            onMouseUp={handleMouseUp}
                            onTouchStart={(e) => handleMouseDown(e, item.id)}
                            onTouchEnd={handleMouseUp}
                            style={{ cursor: 'move' }}>
                        </object>
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
export default Pdf
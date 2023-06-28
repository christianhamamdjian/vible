import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Image = ({ item }) => {
    const { handleMouseDown, handleDeleteItem, handleMouseUp, handleEditBox, editingText, handleStopEditBox, getTextColor, isEditingBoard } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "box" && (
                <>
                    <foreignObject
                        x="0"
                        y="0"
                        width="160"
                        height="160"
                        //draggable={editingText ? "false" : "true"}
                        style={{
                            cursor: 'move',
                            backgroundColor: item.color,
                            padding: "1rem",
                            borderRadius: "6px",
                            // transform: 'rotate(-5deg)'
                        }}
                        onMouseDown={(e) => handleMouseDown(e, item.id)}
                        onMouseUp={handleMouseUp}
                        onTouchStart={(e) => handleMouseDown(e, item.id)}
                        onTouchEnd={handleMouseUp}
                    >
                        <p
                            className="text"
                            //draggable={editingText ? "false" : "true"}
                            fill={item.color}
                            style={{
                                color: getTextColor(item.color), fontFamily: "sans-serif"
                            }}
                        >
                            {item.text}
                        </p>

                    </foreignObject>
                    <a
                        xlinkHref={item.url}
                        target="__blank">
                        <text x="80" y="30" fill="#aabbcc">{item.link}</text>
                    </a>
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
                            onClick={() => handleEditBox(item.id)}
                        />
                        {editingText && (editingText.id === item.id) && <circle
                            cx="20"
                            cy="0"
                            r="8"
                            fill="green"
                            stroke="white"
                            strokeWidth="2"
                            style={{ cursor: 'pointer' }}
                            onClick={handleStopEditBox}
                        />}</>}
                </>)}
        </>
    )
}
export default Image
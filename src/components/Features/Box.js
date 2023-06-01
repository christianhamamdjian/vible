import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Image = ({ item }) => {
    const { handleMouseDown, handleDeleteItem, handleMouseUp, handleEditBox, editingText, handleStopEditBox, getTextColor } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "box" && (
                <>
                    <foreignObject
                        x="00"
                        y="0"
                        width="160"
                        height="160"
                        style={{ cursor: 'move', backgroundColor: item.color, padding: "1rem", borderRadius: "12px" }}
                        onMouseDown={(e) => handleMouseDown(e, item.id)}
                        onMouseUp={handleMouseUp}
                        onTouchStart={(e) => handleMouseDown(e, item.id)}
                        onTouchEnd={handleMouseUp}
                    >
                        <p
                            className="text"
                            fill={item.color}
                            style={{ color: getTextColor(item.color), userSelect: "none" }}
                            draggable="true">
                            {item.text}
                        </p>
                    </foreignObject>
                    <a
                        xlinkHref={item.url}
                        target="__blank">
                        <text x="120" y="40" fill="blue">{item.link}</text>
                    </a>
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
                        onClick={() => handleEditBox(item.id)}
                    />
                    {editingText && editingText.id === item.id && <circle
                        cx="20"
                        cy="0"
                        r="8"
                        fill="green"
                        stroke="white"
                        strokeWidth="2"
                        style={{ cursor: 'pointer' }}
                        onClick={handleStopEditBox}
                    />}
                </>)}
        </>
    )
}
export default Image
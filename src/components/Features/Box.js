import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Image = ({ item }) => {
    const { items, handleItemTextChange, handleMouseDown, handleDeleteItem, handleMouseUp, handleEditBox, editingText, handleStopEditBox, getTextColor, isEditingBoard, focusRef } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "box" && (
                <>
                    <foreignObject
                        x="0"
                        y="0"
                        width={`${item.width || 160}`}
                        height={`${item.height || 160}`}
                        style={{
                            cursor: 'move',
                            backgroundColor: item.color,
                            padding: "1rem",
                            borderRadius: "6px",
                            transform: `rotate(${item.angle || 0}deg)`,
                            transformOrigin: `${item.width / 2, item.height / 2}`
                        }}
                        onMouseDown={(e) => handleMouseDown(e, item.id)}
                        onMouseUp={handleMouseUp}
                        onTouchStart={(e) => handleMouseDown(e, item.id)}
                        onTouchEnd={handleMouseUp}
                        onDoubleClick={() => handleEditBox(item.id)}
                    >
                        <p
                            className="text"
                            fill={item.color}
                            style={{
                                color: getTextColor(item.color), fontFamily: "sans-serif"
                            }}
                        >
                            {editingText && (item.id === editingText.id) ? (<textarea
                                name=""
                                id=""
                                value={(item.id === editingText.id) ? items.find(item => item.id === editingText.id).text : ""}
                                onChange={(event) =>
                                    handleItemTextChange(event, editingText.id)}
                                style={{ backgroundColor: "transparent" }}
                                cols="10"
                                rows="10"
                                ref={focusRef}
                                onBlur={handleStopEditBox}
                            >
                            </textarea>) : item.text}
                        </p>

                    </foreignObject>
                    <a
                        xlinkHref={item.url}
                        target="__blank">
                        <text x="80" y="30" fill="rgb(244, 180, 22)">{item.link}</text>
                    </a>
                    {editingText && (editingText.id === item.id) && <circle
                        cx="0"
                        cy="0"
                        r="8"
                        fill="green"
                        stroke="white"
                        strokeWidth="2"
                        style={{ cursor: 'pointer' }}
                        onClick={handleStopEditBox}
                    />}
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
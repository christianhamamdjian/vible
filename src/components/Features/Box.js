import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Box = ({ item }) => {
    const { items, handleItemTextChange, handleRectPointerDown, handleRectPointerMove, handleDeleteItem, handleRectPointerUp, handleEditBox, editingText, handleStopEditBox, getTextColor, isEditingBoard } = React.useContext(MoodboardContext);

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
                        onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={() => handleRectPointerUp(item.id)}
                        onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                        onDoubleClick={(e) => handleEditBox(e, item.id)}
                    >
                        <a
                            href={item.url}
                            target="__blank">
                            <span x="80" y="30" fill={getTextColor(item.color)}>{item.link}</span>
                        </a>
                        {editingText && isEditingBoard && (item.id === editingText.id) ? (<textarea
                            name=""
                            id=""
                            value={(item.id === editingText.id) ? items.find(item => item.id === editingText.id).text : ""}
                            onChange={(event) => handleItemTextChange(event, editingText.id)}
                            style={{
                                backgroundColor: "transparent",
                                color: getTextColor(item.color),
                                fontFamily: "sans-serif"
                            }}
                            cols="10"
                            rows="5"
                            onBlur={handleStopEditBox}
                        >
                        </textarea>) : (
                            <p
                                className="text"
                                fill={item.color}
                                style={{
                                    color: getTextColor(item.color),
                                    userSelect: "none",
                                    fontFamily: "sans-serif",
                                    zIndex: "100"
                                }}
                            >{item.text}
                            </p>)
                        }
                    </foreignObject>

                    {/* {editingText && (editingText.id === item.id) && <circle
                        cx="0"
                        cy="0"
                        r="8"
                        fill="green"
                        stroke="white"
                        strokeWidth="2"
                        style={{ cursor: 'pointer' }}
                        onClick={handleStopEditBox}
                    />} */}
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
                            onClick={(e) => handleEditBox(e, item.id)}
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
export default Box
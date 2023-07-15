import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Box = ({ item }) => {
    const { itemRef, items, handleItemChange, handleRectPointerDown, handleRectPointerMove, handleDeleteItem, handleRectPointerUp, handleEditBox, editingText, handleStopEditBox, getTextColor, isEditingBoard } = React.useContext(MoodboardContext);

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
                            boxShadow: "2px 6px 12px rgba(0, 0, 0, 0.2)",
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
                        {editingText && isEditingBoard && (item.id === editingText.id) ? (
                            <textarea
                                ref={itemRef}
                                name=""
                                id=""
                                value={(item.id === editingText.id) ? items.find(item => item.id === editingText.id).text : ""}
                                //onClick={() => itemRef.current.focus()}
                                onChange={(event) => handleItemChange(event, editingText.id, "text")}
                                style={{
                                    backgroundColor: "transparent",
                                    color: getTextColor(item.color),
                                    fontFamily: "sans-serif",
                                    // touchAction: "none",
                                    zIndex: "101"
                                }}
                                cols="10"
                                rows="2"
                                onBlur={handleStopEditBox}
                            >
                            </textarea>
                        ) : (
                            <p
                                className="text"
                                fill={item.color}
                                style={{
                                    color: getTextColor(item.color),
                                    userSelect: "none",
                                    fontFamily: "sans-serif",
                                    zIndex: "100",
                                    // touchAction: "none"
                                }}
                            >{item.text}
                            </p>)
                        }
                    </foreignObject>

                    {isEditingBoard && <>
                        <rect
                            x="10"
                            y="-12"
                            height="10"
                            width="24"
                            fill="red"
                            style={{ cursor: 'pointer', borderRadius: "12px", }}
                            onClick={() => handleDeleteItem(item.id)}
                        />
                        <rect
                            x="60"
                            y="-12"
                            height="10"
                            width="24"
                            fill="orange"
                            style={{ cursor: 'pointer', borderRadius: "12px", }}
                            onClick={(e) => handleEditBox(e, item.id)}
                        />
                        {editingText && (editingText.id === item.id) && <rect
                            x="35"
                            y="-12"
                            height="10"
                            width="24"
                            fill="green"
                            style={{ cursor: 'pointer', borderRadius: "12px", }}
                            onClick={handleStopEditBox}
                        />}</>}
                </>)
            }
        </>
    )
}
export default Box
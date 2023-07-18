import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Box = ({ item }) => {
    const { itemRef, items, handleItemChange, handleRectPointerDown, handleRectPointerMove, handleDeleteItem, handleRectPointerUp, handleEditBox, editingText, handleStopEditItem, getTextColor, isEditingBoard } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "box" && (
                <>
                    <foreignObject
                        x="0"
                        y="0"
                        width={`${item.width || 160}`}
                        height={`${item.height || 160}`}
                        className="box-container"
                        style={{
                            backgroundColor: item.color,
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
                                onChange={(event) => handleItemChange(event, editingText.id, "text")}
                                className="box-textarea"
                                style={{
                                    color: getTextColor(item.color)
                                }}
                                cols="10"
                                rows="2"
                                onBlur={handleStopEditItem}
                            >
                            </textarea>
                        ) : (
                            <p
                                className="box-content"
                                fill={item.color}
                                style={{
                                    color: getTextColor(item.color)
                                }}
                            >{item.text}
                            </p>)
                        }
                    </foreignObject>

                    {isEditingBoard && <>
                        <rect
                            x="10"
                            y="-22"
                            height="20"
                            width="24"
                            rx="6"
                            fill="red"
                            className="box-control"
                            onClick={() => handleDeleteItem(item.id)}
                        />
                        <text
                            x="18"
                            y="-9"
                            width="24"
                            height="20"
                            fill="white"
                            className="box-control-sign"
                            onClick={() => handleDeleteItem(item.id)}
                        >&times;</text>
                        <rect
                            x="60"
                            y="-22"
                            height="20"
                            width="24"
                            rx="6"
                            fill="green"
                            className="box-control"
                            onClick={(e) => handleEditBox(e, item.id)}
                        />
                        <text
                            x="68"
                            y="-9"
                            width="24"
                            height="20"
                            fill="white"
                            className="box-control-sign"
                            onClick={(e) => handleEditBox(e, item.id)}
                        >+</text>

                        {editingText && (editingText.id === item.id) && <><rect
                            x="35"
                            y="-22"
                            height="20"
                            width="24"
                            rx="6"
                            fill="orange"
                            className="box-control"
                            onClick={handleStopEditItem}
                        />
                            <text
                                x="43"
                                y="-9"
                                width="24"
                                height="20"
                                fill="white"
                                className="box-control-sign"
                                onClick={handleStopEditItem}
                            >-</text>
                        </>
                        }</>}
                </>)
            }
        </>
    )
}
export default Box
import React from 'react';
import StartRating from "../rating/StarRating"
import TopControls from "../helperFunctions/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const Box = ({ item }) => {
    const { activeBoard, itemRef, items, handleItemChange, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, handleEditItem, editingText, handleStopEditItem, getTextColor, isEditingBoard } = React.useContext(MoodboardContext);

    function addAlpha(color, opacity) {
        let _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
        return color + _opacity.toString(16).toUpperCase();
    }

    return (
        <>
            {item && item.type === "box" && item.board === activeBoard.id && (
                <>
                    <g
                        draggable="true"
                        transform={`rotate(${item.angle || 0}, ${item.width / 2}, ${item.height / 2})`}
                        style={{
                            userSelect: "none"
                        }}
                    >

                        <foreignObject
                            x="0"
                            y="0"
                            width={`${item.width || 160}`}
                            height={`${item.height || 160}`}
                            className="box-frame"
                            style={{
                                display: "block",
                                zIndex: "999999",
                                position: "absolute",
                                top: "0",
                                right: "0",
                                bottom: "0",
                                left: "0",
                                userSelect: "none",
                            }}
                            onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                            onPointerMove={(e) => handleSvgPointerMove(e, item.id)}
                            onPointerUp={() => handleSvgPointerUp(item.id)}
                            onTouchStart={e => handleSvgPointerDown(e, item.id)}
                            onTouchMove={(e) => handleSvgPointerMove(e, item.id)}
                            onTouchEnd={(e) => handleSvgPointerUp(e, item.id)}
                            onDoubleClick={(e) => handleEditItem(e, item.id)}
                        >
                            <div

                                className="box-container"
                                style={{
                                    // backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2))",
                                    backgroundColor: `${addAlpha(item.color, item.backgroundOpacity)}`,
                                    width: "100%",
                                    height: "100%",
                                    userSelect: "none",
                                    border: `${item.borderWidth}px solid ${item.borderColor}`,
                                    borderRadius: `${item.roundedCorners}px`,
                                }}
                            >

                                <p
                                    fill={getTextColor(item.color)}
                                    style={{
                                        color: getTextColor(item.color),
                                        textDecoration: "underline",
                                        marginBottom: ".5rem",
                                        userSelect: "none",
                                        textAlign: "right"
                                    }}
                                >
                                    <a
                                        href={item.url}
                                        target="__blank"
                                        style={{
                                            textDecoration: "none",
                                            userSelect: "none"
                                        }}
                                    >
                                        {item.link}
                                    </a>
                                </p>


                                {editingText && isEditingBoard && (item.id === editingText.id) ? (
                                    <textarea
                                        ref={itemRef}
                                        name=""
                                        id=""
                                        value={(item.id === editingText.id) ? items.find(item => item.id === editingText.id).text : ""}
                                        onChange={(event) => handleItemChange(event, editingText.id, "text")}
                                        className="box-textarea"
                                        style={{
                                            // color: getTextColor(item.color),
                                            color: item.textColor,
                                            overflowX: "hidden",
                                            overflowY: "auto",
                                            fontFamily: item.font,
                                            fontSize: `${item.fontSize}pt`,
                                            fontWeight: `${item.fontStyle ? "bold" : "normal"}`,
                                            textAlign: `${item.textAlignCenter ? "center" : "left"}`
                                        }}
                                        cols="10"
                                        rows="2"
                                        onBlur={handleStopEditItem}
                                    >
                                    </textarea>
                                ) : (
                                    <>
                                        <div
                                            className="box-content"
                                        >
                                            <pre style={{ height: "calc(100% - 1.5rem)" }}>
                                                <p
                                                    style={{
                                                        // color: getTextColor(item.color),
                                                        color: item.textColor,
                                                        height: item.link !== "" && "70%",
                                                        fontFamily: item.font,
                                                        userSelect: editingText && isEditingBoard ? "all" : "none",
                                                        fontSize: `${item.fontSize}pt`,
                                                        fontWeight: `${item.fontStyle ? "bold" : "normal"}`,
                                                        textAlign: `${item.textAlignCenter ? "center" : "left"}`
                                                    }}
                                                >
                                                    {item.text}
                                                </p>
                                                {item.showRating && <StartRating
                                                    rating={item.rating} id={item.id}
                                                />}
                                            </pre>
                                        </div>
                                    </>
                                )
                                }
                            </div>
                        </foreignObject >
                        <TopControls item={item} />
                        {(editingText || isEditingBoard) && (
                            <>
                                <circle
                                    id="rotate"
                                    fill="#cccccc"
                                    cx="-20"
                                    cy={`${item.height / 2}`}
                                    width="20"
                                    height="20"
                                    r='12'
                                    onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="#cccccc"
                                    x={item.width}
                                    y={item.height}
                                    width="20"
                                    height="20"
                                    rx="4"
                                    onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                />
                                {/*    <rect
                                    id="resize"
                                    fill="white"
                                    x={item.width - 18}
                                    y={item.height - 18}
                                    width="20"
                                    height="20"
                                    rx="2"
                                    onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                /> */}

                            </>)}
                    </g>
                </>)
            }
        </>
    )
}
export default Box
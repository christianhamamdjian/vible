import React from 'react';
import StartRating from "../rating/StarRating"
import TopControls from "../helperComponents/TopControls"
import { isSafari } from "../utils/browserDetector"
import { MoodboardContext } from "../../context/moodboardContext";

const Box = ({ item }) => {
    const { activeBoard, itemRef, items, handleItemChange, handleSvgPointerDown, handleRectPointerDown, handleSvgPointerMove, handleSvgPointerUp, handleEditItem, editingItem, editingText, handleStartEditItem, handleStopEditItem, getTextColor, isEditingBoard, isDraggingRect, selectedPath, selectedRectId } = React.useContext(MoodboardContext);

    function addAlpha(color, opacity) {
        let _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
        const changedColor = color + _opacity.toString(16).toUpperCase();
        return opacity > 0.1 ? changedColor : "transparent"
    }
    const css = `@media print {
        .pre-padded {
          padding: 1rem !important;
          height: 100% !important;
        }
      }`
    const handleBoxTextHeight = () => {

        if (item.link !== "" && item.showRating) {
            return "calc(100% - 3rem)"
        }
        if ((item.link !== "" && !item.showRating) || (item.link === "" && item.showRating)) {
            return "calc(100% - 1.5rem)"
        }
        if (item.link === "" && !item.showRating) {
            return "calc(100% - .5rem)"
        }
    }

    return (
        <>
            {item && item.type === "box" && item.board === activeBoard.id && (
                <>
                    <rect
                        x={item.x - 40}
                        y={item.y - 40}
                        width={`${item.width + 70 || 160}`}
                        height={`${item.height + 70 || 160}`}
                        transform={`rotate(${item?.angle}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                        fill="transparent"
                        onPointerOut={(e) => handleStopEditItem(e, item.id)}
                    // style={{
                    //     backgroundColor: "blue",
                    // }}
                    />
                    <foreignObject
                        x={item.x}
                        y={editingText ? item.y - 20 : item.y}
                        draggable="true"
                        //transform={`translate(${item.x},${item.y})`}
                        transform={`rotate(${item?.angle}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                        width={`${item.width || 160}`}
                        height={`${item.height + 20 || 160}`}
                        className="box-frame"
                        // style={{
                        //     //opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1,
                        //     //transform: `rotate(${item.angle || 0}, ${item.x + (item.width / 2)}, ${item.y + (item.height / 2)}`
                        // }}
                        onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                        onPointerMove={(e) => handleSvgPointerMove(e, item.id)}
                        onPointerUp={() => handleSvgPointerUp(item.id)}
                        onTouchStart={e => handleSvgPointerDown(e, item.id)}
                        onTouchMove={(e) => handleSvgPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleSvgPointerUp(e, item.id)}
                        onDoubleClick={(e) => handleEditItem(e, item.id)}
                        onPointerOver={(e) => !selectedPath && handleEditItem(e, item.id)}
                    //onPointerOut={(e) => handleStopEditItem(e, item.id)}
                    >
                        {(editingText || isEditingBoard) && editingItem && editingItem.id === item.id && (
                            <div
                                style={{
                                    backgroundColor: "transparent",
                                    width: "4rem",
                                    height: "4rem",
                                    border: `10px solid ${addAlpha(item.color, item.backgroundOpacity)}`,
                                    borderRadius: "50%",
                                    marginRight: "0rem",
                                    marginLeft: "auto",
                                    marginBottom: "-2rem"
                                }}
                            ></div>
                        )}
                        <div
                            className="box-container"
                            style={{
                                backgroundColor: `${addAlpha(item.color, item.backgroundOpacity)}`,
                                border: `${item.borderWidth}px solid ${item.borderColor}`,
                                borderRadius: `${item.roundedCorners}px`,
                                height: "100%",
                                maxHeight: "85%",
                                width: '100%',
                                // position: 'relative',
                                overflow: 'hidden',
                                boxSizing: 'border-box',
                                padding: editingText && editingItem.id === item.id ? ".3rem" : "1rem"
                                // opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1,
                            }}
                            xmlns="w3.org/1999/xhtml"
                        >
                            <p
                                fill={getTextColor(item.color)}
                                className="box-frame-link-p"
                                style={{
                                    color: getTextColor(item.color),
                                }}
                            >
                                <a
                                    href={item.url}
                                    target="__blank"
                                    className="box-frame-link-p-a"
                                >
                                    {item.link}
                                </a>
                            </p>

                            {editingText && isEditingBoard && (item.id === editingText.id) ? (
                                <>
                                    <textarea
                                        // ref={itemRef}
                                        // name=""
                                        id="box-text"
                                        // draggable="true"
                                        value={(item.id === editingText.id) ? items.find(item => item.id === editingText.id).text : ""}
                                        onChange={(event) => handleItemChange(event, editingText.id, "text")}
                                        className="box-textarea scroll-container"
                                        style={{
                                            //color: getTextColor(item.color),
                                            color: item.textColor,
                                            fontFamily: item.font,
                                            fontSize: `${item.fontSize + "pt"}`,
                                            fontWeight: `${item.fontStyle ? "bold" : "normal"}`,
                                            textAlign: `${item.textAlignCenter ? "center" : "left"}`,
                                            borderRadius: `${item.roundedCorners}px`,
                                            // minHeight: "80%",
                                            maxHeight: "88%",
                                            width: '100%',
                                            height: '88%',
                                            boxSizing: 'border-box',
                                            resize: 'none',
                                            overflow: 'auto',
                                        }}
                                        onMouseDown={e => handleStartEditItem(e)}
                                        onTouchStart={e => handleStartEditItem(e)}
                                        // onMouseOut={e => handleStopEditItem(e)}
                                        onFocus={e => handleStartEditItem(e)}
                                        onBlur={e => handleStopEditItem(e)}
                                    >
                                    </textarea>

                                </>
                            ) : (
                                <>
                                    <div
                                        className="box-content"
                                        style={{ transform: `rotate(${item?.angle}, ${item.x + item.width / 2}, ${item.y + item.height / 2})` }}
                                    >
                                        <style scoped>{css}</style>
                                        <div
                                            className='box-content-p'
                                            style={{
                                                color: getTextColor(item.color),
                                                color: item.textColor,
                                                // height: item.link !== "" ? "70%" : "80%",
                                                // height: item.link !== "" ? "calc(100% - 3rem)" : "calc(100% - 1.5rem)",
                                                height: handleBoxTextHeight(),
                                                minHeight: handleBoxTextHeight(),
                                                fontFamily: item.font,
                                                userSelect: editingText && isEditingBoard ? "all" : "none",
                                                fontSize: `${item.fontSize + "pt"}`,
                                                fontWeight: `${item.fontStyle ? "bold" : "normal"}`,
                                                textAlign: `${item.textAlignCenter ? "center" : "left"}`,
                                                width: '100%',
                                                // height: '100%',
                                                // position: 'relative',
                                                overflow: 'hidden',
                                                boxSizing: 'border-box',
                                            }}
                                        >
                                            <pre
                                                className='box-content-pre pre-padded scroll-container'
                                                style={{
                                                    whiteSpace: "pre-wrap",
                                                    color: item.textColor,
                                                    overflowX: "hidden",
                                                    paddingRight: "1rem",
                                                    fontFamily: item.font,
                                                    userSelect: editingText && isEditingBoard ? "all" : "none",
                                                    fontSize: `${item.fontSize + "pt"}`,
                                                    fontWeight: `${item.fontStyle ? "bold" : "normal"}`,
                                                    textAlign: `${item.textAlignCenter ? "center" : "left"}`,
                                                    boxSizing: 'border-box',
                                                    resize: "none",
                                                    overflowY: isDraggingRect && isSafari ? 'hidden' : 'auto',
                                                    // height: `${item.showRating ? "calc(100% - 1.5rem)" : "100%"}`,
                                                    height: "100%",
                                                    minHeight: "100%",
                                                }}
                                            >{item.text}
                                            </pre>
                                        </div>
                                        {item.showRating && <StartRating
                                            rating={item.rating} id={item.id}
                                        />}


                                    </div>
                                </>
                            )
                            }
                        </div>


                    </foreignObject >
                    <g
                        transform={`rotate(${item?.angle || 0}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                        style={{
                            transform: `translate(${item.x},${item.y})`
                        }}
                    >

                        {isEditingBoard && <TopControls item={item} />}

                        {(editingText || isEditingBoard) && editingItem && editingItem.id === item.id && (
                            <>
                                {/* <circle
                                    id="move"
                                    fill="#cccccc"
                                    cx={item.x + item.width + 25}
                                    cy={item.y - 25}
                                    style={{ opacity: ".8", cursor: "grabbing" }}
                                    r="30"
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                    onTouchStart={(e) => handleRectPointerDown(e, item.id)}
                                />
                                <circle
                                    id="move"
                                    fill="#ffffff"
                                    cx={item.x + item.width + 25}
                                    cy={item.y - 25}
                                    style={{ opacity: ".6", cursor: "grabbing" }}
                                    r="25"
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                    onTouchStart={(e) => handleRectPointerDown(e, item.id)}
                                /> */}
                                <circle
                                    id="rotate"
                                    fill="#cccccc"
                                    cx={`${item.x - 20}`}
                                    cy={`${item.y + (item.height / 2)}`}
                                    width="20"
                                    height="20"
                                    r='12'
                                    onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                    onPointerOver={(e) => handleEditItem(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="#cccccc"
                                    x={item.x + item.width}
                                    y={item.y + item.height}
                                    width="20"
                                    height="20"
                                    rx="4"
                                    onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                    onPointerOver={(e) => handleEditItem(e, item.id)}
                                />



                            </>)}
                    </g>
                </>)
            }
        </>
    )
}
export default Box
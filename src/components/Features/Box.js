import React from 'react';
import StartRating from "../rating/StarRating"
import TopControls from "../helperComponents/TopControls"
import { isSafari } from "../utils/browserDetector"
import MarkdownPreview from "../markdown-editor/MarkdownPreview"
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
    const handleTextareaHeight = () => {
        if (item.link !== "" && item.showRating) {
            return "calc(100% - 4rem)"
        }
        if ((item.link !== "" && !item.showRating) || (item.link === "" && item.showRating)) {
            return "calc(100% - 2.5rem)"
        }
        if (item.link === "" && !item.showRating) {
            return "calc(100% - .5rem)"
        }
    }

    return (
        <>
            {item && item.type === "box" && item.board === activeBoard.id && (
                <>
                    {/* <rect
                        x={item.x - 40}
                        y={item.y - 40}
                        width={`${item.width + 70 || 160}`}
                        height={`${item.height + 70 || 160}`}
                        transform={`rotate(${item?.angle}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                        fill="transparent"
                    //onPointerOut={(e) => handleStopEditItem(e, item.id)}
                    // style={{
                    //     backgroundColor: "blue",
                    // }}
                    /> */}
                    <foreignObject
                        id='box-object'
                        x={item.x}
                        // y={editingText ? item.y - 20 : item.y}
                        y={item.y}
                        draggable="true"
                        //transform={`translate(${item.x},${item.y})`}
                        transform={`rotate(${item?.angle}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                        width={`${item.width}`}
                        height={`${item.height}`}
                        className="box-frame"
                        style={{
                            //opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1,
                            //transform: `rotate(${item.angle || 0}, ${item.x + (item.width / 2)}, ${item.y + (item.height / 2)}`
                            // width: `${item.width}`,
                            // height: `${item.height}`
                        }}
                        onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                        onPointerMove={(e) => handleSvgPointerMove(e, item.id)}
                        onPointerUp={() => handleSvgPointerUp(item.id)}
                        onTouchStart={e => handleSvgPointerDown(e, item.id)}
                        onTouchMove={(e) => handleSvgPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleSvgPointerUp(e, item.id)}
                        onClick={(e) => handleEditItem(e, item.id)}
                    // onPointerEnter={(e) => e.stopPropagation()}
                    // onPointerOver={(e) => e.stopPropagation()}
                    // onPointerLeave={(e) => e.stopPropagation()}
                    // onPointerOut={(e) => e.stopPropagation()}
                    >
                        {(editingText || isEditingBoard) && editingItem && editingItem.id === item.id && (
                            <div
                                id="box-handel"
                                style={{
                                    backgroundColor: "transparent",
                                    width: "3rem",
                                    height: "3rem",
                                    fontSize: "2.5rem",
                                    textAlign: "center",
                                    color: "rgba(155,155,155,.6)",
                                    lineHeight: "0.8",
                                    // border: `20px solid ${addAlpha(item.color, item.backgroundOpacity)}`,
                                    backgroundColor: `${addAlpha(item.color, item.backgroundOpacity)}`,
                                    borderRadius: "30%",
                                    marginRight: "0",
                                    marginLeft: "auto",
                                    marginBottom: "-1.2rem"
                                }}
                            >&#8801;</div>
                        )}
                        <div
                            id="box-container"
                            className="box-container"
                            style={{
                                backgroundColor: `${addAlpha(item.color, item.backgroundOpacity)}`,
                                border: `${item.borderWidth}px solid ${item.borderColor}`,
                                borderRadius: `${item.roundedCorners}px`,
                                height: "80%",
                                maxHeight: "80%",
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
                                        ref={itemRef}
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
                                            // maxHeight: "100%",
                                            width: '100%',
                                            // height: `${isSafari ? '60%' : '60%'}`,
                                            height: handleTextareaHeight(),
                                            // maxHeight: "88%",
                                            // width: '100%',
                                            // height: '88%',
                                            boxSizing: 'border-box',
                                            resize: 'none',
                                            overflow: 'auto',
                                        }}
                                        onMouseDown={e => handleStartEditItem(e, item.id)}
                                        onTouchStart={e => handleStartEditItem(e, item.id)}
                                        // onMouseOut={e => handleStopEditItem(e)}
                                        onFocus={e => handleStartEditItem(e, item.id)}
                                    //onBlur={e => handleStopEditItem(e)}
                                    >
                                    </textarea>
                                    {item.showRating && <StartRating
                                        rating={item.rating} id={item.id}
                                    />}
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
                                                ref={itemRef}
                                                className='box-content-pre pre-padded scroll-container'
                                                style={{
                                                    whiteSpace: "pre-wrap",
                                                    color: item.textColor,
                                                    overflowX: "hidden",
                                                    // paddingRight: "1rem",
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
                                            {/* <MarkdownPreview
                                                markdown={item.text}
                                                item={item}
                                                editingText={editingText}
                                                isEditingBoard={isEditingBoard}
                                                isDraggingRect={isDraggingRect}
                                                isSafari={isSafari}
                                            /> */}
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
                                    cy={`${editingText ? item.y + (item.height / 2) : item.y + (item.height / 2) - 20}`}
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
                                    //y={item.y + item.height - 30}
                                    y={`${editingText ? item.y + item.height : item.y + item.height - 30}`}
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
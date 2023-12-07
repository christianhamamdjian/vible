import React from 'react';
import StartRating from "../rating/StarRating"
import TopControls from "../helperComponents/TopControls"
import { isSafari } from "../utils/browserDetector"
import { MoodboardContext } from "../../context/moodboardContext";

const Box = ({ item }) => {
    const { activeBoard, itemRef, items, handleItemChange, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, handleEditItem, editingItem, editingText, handleStartEditItem, handleStopEditItem, getTextColor, isEditingBoard, isDraggingRect, selectedRectId } = React.useContext(MoodboardContext);

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
                    <foreignObject
                        x={item.x}
                        y={item.y}
                        draggable="true"
                        //transform={`translate(${item.x},${item.y})`}
                        transform={`rotate(${item?.angle}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                        width={`${item.width || 160}`}
                        height={`${item.height || 160}`}
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
                    >
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
                                        // id=""
                                        value={(item.id === editingText.id) ? items.find(item => item.id === editingText.id).text : ""}
                                        onChange={(event) => handleItemChange(event, editingText.id, "text")}
                                        className="box-textarea"
                                        style={{
                                            //color: getTextColor(item.color),
                                            color: item.textColor,
                                            fontFamily: item.font,
                                            fontSize: `${item.fontSize + "pt"}`,
                                            fontWeight: `${item.fontStyle ? "bold" : "normal"}`,
                                            textAlign: `${item.textAlignCenter ? "center" : "left"}`,
                                            borderRadius: `${item.roundedCorners}px`,
                                            minHeight: "80%",
                                            width: '100%',
                                            height: '80%',
                                            boxSizing: 'border-box',
                                            resize: 'none',
                                            overflow: 'auto',
                                        }}
                                        onFocus={handleStartEditItem}
                                        onBlur={handleStopEditItem}
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
                                <circle
                                    id="rotate"
                                    fill="#cccccc"
                                    cx={`${item.x - 20}`}
                                    cy={`${item.y + (item.height / 2)}`}
                                    width="20"
                                    height="20"
                                    r='12'
                                    onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="#cccccc"
                                    x={item.x + item.width}
                                    y={item.y + item.height - 20}
                                    width="20"
                                    height="20"
                                    rx="4"
                                    onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                />
                            </>)}
                    </g>
                </>)
            }
        </>
    )
}
export default Box
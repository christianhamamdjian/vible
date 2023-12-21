import React from 'react';
import { isSafari } from "../utils/browserDetector"
import TopControls from "../helperComponents/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const Video = ({ item }) => {
    const { activeBoard, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, handleEditItem, editingItem, isEditingBoard, isDraggingRect, selectedRectId } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "video" && item.board === activeBoard.id &&
                <>

                    {/* <rect
                        draggable="true"
                        transform={`rotate(${item.angle || 0}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                        className='video-group'
                        style={{
                            opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1
                        }}

                    /> */}
                    <g>
                        <rect
                            fill="#000000"
                            x={item.x}
                            y={isSafari ? item.y - 30 : item.y}
                            width={item.width}
                            height={item.height}
                            rx="16"
                            transform={`rotate(${item.angle || 0}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                            onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                            onPointerMove={(e) => handleSvgPointerMove(e, item.id)}
                            onPointerUp={(e) => handleSvgPointerUp(e, item.id)}
                            onTouchStart={e => { handleSvgPointerDown(e, item.id) }}
                            onTouchMove={(e) => handleSvgPointerMove(e, item.id)}
                            onTouchEnd={(e) => handleSvgPointerUp(e, item.id)}
                            // onDoubleClick={(e) => handleEditItem(e, item.id)}
                            onClick={(e) => handleEditItem(e, item.id)}
                        />

                        <foreignObject
                            id="video"
                            x={isSafari ? "0" : item.x}
                            y={isSafari ? "1rem" : item.y + 20}
                            width={item.width}
                            height={item.height}
                            key={item.id}
                            draggable="true"
                            className='video-object'
                            transform={`rotate(${item.angle || 0}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                            style={{
                                opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1,
                                top: isSafari ? "1rem" : item.y,
                                left: isSafari ? item.x : "0",
                            }}
                            onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                            onPointerMove={(e) => handleSvgPointerMove(e, item.id)}
                            onPointerUp={(e) => handleSvgPointerUp(e, item.id)}
                            onTouchStart={e => { handleSvgPointerDown(e, item.id) }}
                            onTouchMove={(e) => handleSvgPointerMove(e, item.id)}
                            onTouchEnd={(e) => handleSvgPointerUp(e, item.id)}
                            // onDoubleClick={(e) => handleEditItem(e, item.id)}
                            onClick={(e) => handleEditItem(e, item.id)}
                        >
                            {!isSafari && <div
                                xmlns="http://www.w3.org/1999/xhtml"
                                className='video-isnotsafari'
                                style={{
                                    top: item.y,
                                    left: item.x,
                                    height: item.width * 9 / 12,
                                }}
                                onClick={(e) => handleEditItem(e, item.id)}
                            >
                            </div>}
                            <iframe
                                className='video-frame'
                                style={{
                                    transform: isSafari && `rotate(${item.angle || 0}deg)`,
                                    top: isSafari ? item.y : "1rem",
                                    left: isSafari ? item.x : "0",
                                }}
                                draggable="true"
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${item.videoUrl}`}
                                title="YouTube video player"
                                allow="accelerometer;
                            autoplay;
                            clipboard-write;
                            encrypted-media;
                            gyroscope;
                            picture-in-picture;"
                            />
                        </foreignObject>
                        <g
                            transform={`rotate(${item.angle || 0}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                            style={{
                                transform: `translate(${item.x},${item.y})`
                            }}
                        >
                            {isEditingBoard && < TopControls item={item} />}{isEditingBoard && editingItem && editingItem.id === item.id && (
                                <>
                                    <circle
                                        id="rotate"
                                        fill="#cccccc"
                                        cx={item.x - 30}
                                        cy={`${item.y + item.height / 2}`}
                                        width="20"
                                        height="20"
                                        r='12'
                                        onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                    />
                                    <rect
                                        id="resize"
                                        fill="#cccccc"
                                        x={item.x + item.width}
                                        y={item.y + item.height + 30}
                                        width="20"
                                        height="20"
                                        rx="4"
                                        onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                    />
                                </>)}
                        </g>
                    </g>
                </>
            }
        </>
    )
}
export default Video
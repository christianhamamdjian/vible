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
                    <g key={item.id}
                        transform={`translate(${item.x},${item.y})`}
                    >
                        <g
                            draggable="true"
                            transform={`rotate(${item.angle || 0}, ${item.width / 2}, ${item.height / 2})`}
                            className='video-group'
                            style={{
                                opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1
                            }}
                            onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                            onPointerMove={(e) => handleSvgPointerMove(e, item.id)}
                            onPointerUp={(e) => handleSvgPointerUp(e, item.id)}
                            onTouchStart={e => { handleSvgPointerDown(e, item.id) }}
                            onTouchMove={(e) => handleSvgPointerMove(e, item.id)}
                            onTouchEnd={(e) => handleSvgPointerUp(e, item.id)}
                            onDoubleClick={(e) => handleEditItem(e, item.id)}
                        >
                            {isEditingBoard && editingItem && editingItem.id === item.id && (
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
                                </>)}
                            {isSafari && <rect
                                fill="#000000"
                                x="0"
                                y="-30"
                                width={item.width}
                                height={item.height}
                                rx="16"
                            />
                            }
                            <foreignObject
                                x="0"
                                y="0"
                                width={item.width}
                                height={item.height}
                                draggable="true"
                                className='video-object'
                            >
                                {!isSafari && <div
                                    xmlns="http://www.w3.org/1999/xhtml"
                                    className='video-isnotsafari'
                                    style={{
                                        top: item.y,
                                        left: item.x,
                                        height: item.width * 9 / 12,
                                    }}
                                    onDoubleClick={(e) => handleEditItem(e, item.id)}
                                >
                                </div>}
                                <iframe
                                    className='video-frame'
                                    style={{
                                        transform: isSafari && `rotate(${item.angle || 0}deg)`,
                                        top: isSafari ? item.y : "2rem",
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
                            {isEditingBoard && < TopControls item={item} />}
                        </g>
                    </g>
                </>
            }
        </>
    )
}
export default Video
import React from 'react';
import { isSafari } from "../utils/browserDetector"
import TopControls from "../helperFunctions/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const Video = ({ item }) => {
    const { activeBoard, handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleEditItem, isEditingBoard } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "video" && item.board === activeBoard.id &&
                <>
                    <g
                        draggable="true"
                        transform={`rotate(${item.angle || 0}, ${item.width / 2}, ${item.height / 2})`}
                        style={{
                            userSelect: "none"
                        }}
                        onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                        onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                        onDoubleClick={(e) => handleEditItem(e, item.id)}
                    >
                        {isEditingBoard && (
                            <>
                                <circle
                                    id="rotate"
                                    fill="#cccccc"
                                    cx="-20"
                                    cy={`${item.height / 2}`}
                                    width="20"
                                    height="20"
                                    r='12'
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="#cccccc"
                                    x={item.width}
                                    y={item.height}
                                    width="20"
                                    height="20"
                                    rx="4"
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
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
                            style={{
                                display: "block",
                                zIndex: "-100",
                                position: "absolute",
                                backgroundColor: "transparent",
                                top: "0",
                                right: "0",
                                bottom: "0",
                                left: "0",
                                borderRadius: ".5rem",
                                userSelect: "none",
                                pointerEvents: "all"
                            }}
                        >
                            {!isSafari && <div
                                xmlns="http://www.w3.org/1999/xhtml"
                                // className='video-top'
                                style={{
                                    potition: "absolute",
                                    top: item.y,
                                    left: item.x,
                                    height: item.width * 9 / 12,
                                    backgroundColor: "#000000",
                                    userSelect: "none",
                                    borderRadius: "1rem 1rem 0 0"
                                }}
                                onDoubleClick={(e) => handleEditItem(e, item.id)}
                            >
                            </div>}
                            <iframe
                                className='videoIf'
                                style={{
                                    transform: isSafari && `rotate(${item.angle || 0}deg)`,
                                    position: "absolute",
                                    top: isSafari ? item.y : "2rem",
                                    left: isSafari ? item.x : "0",
                                    right: "0",
                                    bottom: "0",
                                    zIndex: "1",
                                    userSelect: "none",
                                    pointerEvents: "all",
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
                        <TopControls item={item} />
                    </g>
                </>
            }
        </>
    )
}
export default Video
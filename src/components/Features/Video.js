import React from 'react';
import { isSafari } from "../utils/browserDetector"
import TopControls from "../helperFunctions/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const Video = ({ item }) => {
    const { handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleEditItem, isEditingBoard } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "video" &&
                <>
                    <g
                        draggable="true"
                        transform={`rotate(${item.angle || 0}, ${item.width / 2}, ${item.height / 2})`}
                        style={{
                            userSelect: "none"
                        }}
                    >
                        {isEditingBoard && (
                            <>
                                <circle
                                    id="rotate"
                                    fill="#cccccc"
                                    cx="-15"
                                    cy={`${item.height / 2}`}
                                    width="20"
                                    height="20"
                                    r='12'
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="#cccccc"
                                    x={item.width - 15}
                                    y={item.height - 15}
                                    width="20"
                                    height="20"
                                    rx="4"
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="white"
                                    x={item.width - 18}
                                    y={item.height - 18}
                                    width="20"
                                    height="20"
                                    rx="2"
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                />
                            </>)}
                        <foreignObject
                            x="0"
                            y="0"
                            width={item.width}
                            // height={item.width * 9 / 11}
                            height={item.height}
                            draggable="true"
                            onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                            onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                            onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                            onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                            onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                            onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                            onDoubleClick={(e) => handleEditItem(e, item.id)}
                            style={{
                                // transform: `rotate(${item.angle || 0}deg)`,
                                // transformOrigin: `${item.width / 2, item.height / 2}`,
                                display: "block",
                                zIndex: "999999",
                                position: "absolute",
                                backgroundColor: "transparent",
                                // paddingTop: "2rem",
                                top: "0",
                                right: "0",
                                bottom: "0",
                                left: "0",
                                borderRadius: ".5rem",
                                userSelect: "none",
                                pointerEvents: "all"
                            }}
                        >
                            <div
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
                            </div>
                            <iframe
                                className='videoIf'
                                style={{
                                    position: "absolute",
                                    top: isSafari ? item.y + 25 : "2rem",
                                    left: isSafari ? item.x : "0",
                                    right: "0",
                                    bottom: "0",
                                    zIndex: "100",
                                    userSelect: "none",
                                    pointerEvents: "all"
                                }}
                                draggable="true"
                                width="100%"
                                height="90%"
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
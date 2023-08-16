import React from 'react';
import { isSafari } from "../utils/browserDetector"
import { MoodboardContext } from "../../context/moodboardContext";

const Video = ({ item }) => {
    const { handleRectPointerDown, handleRectPointerMove, handleDeleteItem, handleRectPointerUp, isEditingBoard, handleEditVideo, editingVideo, handleStopEditItem } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "video" &&
                <>
                    <foreignObject
                        x="0"
                        y="0"
                        width={item.width}
                        height={item.width * 9 / 11}
                        draggable="true"
                        onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                        onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                        onDoubleClick={() => handleEditVideo(item.id)}
                        style={{
                            transform: `rotate(${item.angle || 0}deg)`,
                            transformOrigin: `${item.width / 2, item.height / 2}`,
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
                            onDoubleClick={() => handleEditVideo(item.id)}
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
                    {isEditingBoard &&
                        <>
                            <rect
                                x="10"
                                y="-22"
                                height="20"
                                width="24"
                                rx="6"
                                fill="red"
                                stroke="white"
                                strokeWidth="2"
                                className='box-control'
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
                                stroke="white"
                                strokeWidth="2"
                                className='box-control'
                                onClick={() => handleEditVideo(item.id)}
                            />
                            <text
                                x="68"
                                y="-9"
                                width="24"
                                height="20"
                                fill="white"
                                className="box-control-sign"
                                onClick={() => handleEditVideo(item.id)}
                            >+</text>

                            {editingVideo && editingVideo.id === item.id && <>
                                <rect
                                    x="35"
                                    y="-22"
                                    height="20"
                                    width="24"
                                    rx="6"
                                    fill="orange"
                                    stroke="white"
                                    strokeWidth="2"
                                    className='box-control'
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
                            }
                        </>
                    }
                </>

            }
        </>
    )
}
export default Video
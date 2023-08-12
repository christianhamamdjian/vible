import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Video = ({ item }) => {
    const { handleRectPointerDown, handleRectPointerMove, handleDeleteItem, handleRectPointerUp, isEditingBoard, handleEditVideo, editingVideo, handleStopEditItem } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "video" &&
                <>
                    <foreignObject
                        width={item.width}
                        height={item.height + 30}
                        draggable="true"
                        onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                        onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                        onDoubleClick={(e) => handleEditVideo(e, item.id)}
                        style={{
                            transform: `rotate(${item.angle || 0}deg)`,
                            transformOrigin: `${item.width / 2, item.height / 2}`,
                            display: "block",
                            zIndex: "999999",
                            position: "absolute",
                            backgroundColor: "#000000",
                            paddingTop: "2rem",
                            top: "0",
                            right: "0",
                            bottom: "0",
                            left: "0",
                        }}
                    >
                        {/* <div
                            className='video-top'
                            onDoubleClick={(e) => handleEditVideo(e, item.id)}
                        >
                        </div> */}
                        <iframe
                            width={item.width}
                            height={item.height}
                            src={item.videoUrl}
                            title="YouTube video player"
                            allow="accelerometer; 
                        autoplay; 
                        clipboard-write; 
                        encrypted-media; 
                        gyroscope; 
                        picture-in-picture;">
                        </iframe>
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
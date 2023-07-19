import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const ImageLink = ({ item }) => {
    const { handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleDeleteItem, handleEditImage, editingImage, handleStopEditItem, isEditingBoard } = React.useContext(MoodboardContext);
    return (
        <>
            {item.type === "imageUrl" &&
                <>
                    <rect
                        width="120"
                        height="20"
                        fill="transparent"
                        className='imagelink-object'
                    />
                    <image
                        href={item.imageUrl}
                        x="0"
                        y="0"
                        width={item.width || "100"}
                        onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                        onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                        onDoubleClick={(e) => handleEditImage(e, item.id)}
                        className='imagelink-media'
                        style={{
                            transform: `rotate(${item.angle || 0}deg)`,
                            transformOrigin: `${item.width / 2, item.height / 2}`,
                            display: "block",
                            zIndex: "999999",
                            position: "absolute",
                            top: "0",
                            right: "0",
                            bottom: "0",
                            left: "0",
                        }}
                    />

                    {isEditingBoard && <>
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
                            onClick={() => handleEditImage(item.id)}
                        />
                        <text
                            x="68"
                            y="-9"
                            width="24"
                            height="20"
                            fill="white"
                            className="box-control-sign"
                            onClick={() => handleEditImage(item.id)}
                        >+</text>

                        {editingImage && editingImage.id === item.id && <>
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
export default ImageLink
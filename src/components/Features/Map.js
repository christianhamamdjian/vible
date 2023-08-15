import React from 'react';
import { isSafari } from "../utils/browserDetector"
import { MoodboardContext } from "../../context/moodboardContext";

const Map = ({ item }) => {
    const { handleRectPointerDown, handleRectPointerMove, handleDeleteItem, handleRectPointerUp, isEditingBoard, handleEditMap, editingMap, handleStopEditItem } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "mapUrl" &&
                <g
                    className='map-object'
                    // clipPath="url(#my-clippath)"
                    style={{
                        position: "absolute",
                    }}
                >
                    <foreignObject
                        x="0"
                        y="0"
                        width={item.width}
                        height={item.height}
                        draggable="true"
                        onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                        onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                        onTouchEnd={() => handleRectPointerUp(item.id)}
                        style={{
                            backgroundColor: item.color,
                            transform: `rotate(${item.angle || 0}deg)`,
                            transformOrigin: `${item.width / 2, item.height / 2}`,
                            display: "block",
                            zIndex: "999999",
                            position: "absolute",
                            top: "0",
                            right: "0",
                            bottom: "0",
                            left: "0",
                            borderRadius: ".5rem"
                        }}
                    >
                        <div
                            // className='map-top'
                            style={{
                                potition: "absolute",
                                top: item.y,
                                left: item.x,
                                height: "2rem",
                                backgroundColor: "#000000",
                                userSelect: "none",
                                borderRadius: "1rem 1rem 0 0"
                            }}

                            onDoubleClick={() => handleEditMap(item.id)}
                        >
                        </div>
                        <iframe
                            // x="200"
                            // y="200"
                            src={item.mapUrl}
                            width={item.width}
                            height={item.height}
                            className='map-frame'
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            style={{
                                position: "absolute",
                                top: isSafari ? item.y + 25 : "2rem",
                                left: isSafari ? item.x : "0",
                            }}
                        >
                        </iframe>
                    </foreignObject>
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
                            onClick={() => handleEditMap(item.id)}
                        />
                        <text
                            x="68"
                            y="-9"
                            width="24"
                            height="20"
                            fill="white"
                            className="box-control-sign"
                            onClick={() => handleEditMap(item.id)}
                        >+</text>

                        {editingMap && editingMap.id === item.id && <>
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
                </g>
            }</>
    )
}
export default Map
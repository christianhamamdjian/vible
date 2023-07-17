import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Map = ({ item }) => {
    const { handleRectPointerDown, handleRectPointerMove, handleDeleteItem, handleRectPointerUp, isEditingBoard, handleEditMap, editingMap, handleStopEditMap } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "mapUrl" &&
                <g
                    className='map-object'
                // clipPath="url(#my-clippath)"
                >
                    <foreignObject
                        width="300"
                        x="0"
                        y="0"
                        height="250"
                        draggable="true"
                        onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                        onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                    >
                        <div className='map-top'>
                        </div>
                        <iframe
                            src={item.mapUrl}
                            width="300"
                            height="200"
                            className='map-frame'
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
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
                                onClick={handleStopEditMap}
                            />
                            <text
                                x="43"
                                y="-9"
                                width="24"
                                height="20"
                                fill="white"
                                className="box-control-sign"
                                onClick={handleStopEditMap}
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
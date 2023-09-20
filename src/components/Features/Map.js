import React from 'react';
import { isSafari } from "../utils/browserDetector"
import TopControls from "../helperFunctions/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const Map = ({ item }) => {
    const { activeBoard, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, handleEditItem, isEditingBoard, isDraggingRect, selectedRectId } = React.useContext(MoodboardContext);

    const getUrl = () => {
        let url = ""
        if (item.type === "mapUrl") {
            const coordinates = item.mapUrl.split(",")
            const lat = parseFloat(coordinates[0].trim())
            const long = parseFloat(coordinates[1].trim())
            url = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${lat}+${long}+&t=&z=14&ie=UTF8&iwloc=B&output=embed`
        }
        return url
    }
    return (
        <>
            {item.type === "mapUrl" && item.board === activeBoard.id &&
                <>
                    <g
                        className='map-object'
                        transform={`rotate(${item.angle || 0}, ${item.width / 2}, ${item.height / 2})`}
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
                            onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                            onPointerMove={(e) => handleSvgPointerMove(e, item.id)}
                            onPointerUp={(e) => handleSvgPointerUp(e, item.id)}
                            onTouchStart={e => { handleSvgPointerDown(e, item.id) }}
                            onTouchMove={(e) => handleSvgPointerMove(e, item.id)}
                            onTouchEnd={() => handleSvgPointerUp(item.id)}
                            className='map-fobject'
                        >
                            {!isSafari && <div
                                xmlns="http://www.w3.org/1999/xhtml"
                                className='map-isnotsafari'
                                style={{
                                    top: item.y,
                                    left: item.x,
                                    height: item.width * 9 / 12,
                                }}
                                onDoubleClick={(e) => handleEditItem(e, item.id)}
                            >
                            </div>}
                            <iframe
                                src={getUrl()}
                                width={item.width}
                                height={item.height}
                                className='map-frame'
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                style={{
                                    transform: isSafari && `rotate(${item.angle || 0}deg)`,
                                    top: isSafari ? item.y : "2rem",
                                    left: isSafari ? item.x : "0",
                                }}
                            >
                            </iframe>
                        </foreignObject>
                        {isEditingBoard && <TopControls item={item} />}
                    </g>
                </>
            }
        </>
    )
}
export default Map
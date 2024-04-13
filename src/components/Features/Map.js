import React from 'react';
import { isSafari } from "../utils/browserDetector"
import TopControls from "../helperComponents/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const Map = ({ item }) => {
    const { activeBoard, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, handleEditItem, isEditingBoard, isDraggingRect, selectedRectId, editingItem } = React.useContext(MoodboardContext);

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
                    <rect
                        fill="#000000"
                        x={item.x}
                        y={isSafari ? item.y - 30 : item.y}
                        width={item.width}
                        height={item.height}
                        rx="16"
                        transform={`rotate(${item.angle % 360 || 0}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                        style={{
                            opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1,
                        }}
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
                        x={isSafari ? "0" : item.x}
                        y={isSafari ? "1em" : item.y + 20}
                        width={item.width}
                        height={item.height}
                        key={item.id}
                        draggable="true"
                        id="map-url"
                        className='map-fobject'
                        transform={`rotate(${item.angle % 360 || 0}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                        style={{
                            opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1,
                            top: isSafari ? "1em" : item.y,
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
                                transform: isSafari && `rotate(${item.angle % 360 % 360 || 0}deg)`,
                                top: isSafari ? item.y : "1em",
                                left: isSafari ? item.x : "0",
                            }}
                        >
                        </iframe>
                    </foreignObject>
                    <g
                        transform={`rotate(${item.angle || 0}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                        style={{
                            transform: `translate(${item.x},${item.y})`
                        }}
                    >
                        {isEditingBoard && < TopControls item={item} />}
                        {isEditingBoard && editingItem && editingItem.id === item.id && (
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
                </>
            }
        </>
    )
}
export default Map
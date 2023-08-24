import React from 'react';
import { isSafari } from "../utils/browserDetector"
import TopControls from "../helpers/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const Map = ({ item }) => {
    const { handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleEditItem, isEditingBoard } = React.useContext(MoodboardContext);

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
            {item.type === "mapUrl" &&
                <g
                    className='map-object'
                    // clipPath="url(#my-clippath)"
                    style={{
                        position: "absolute",
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
                            onDoubleClick={(e) => handleEditItem(e, item.id)}
                        >
                        </div>
                        <iframe
                            // x="200"
                            // y="200"
                            src={getUrl()}
                            width={item.width}
                            height={item.height}
                            className='map-frame'
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            style={{
                                position: "absolute",
                                top: isSafari ? item.y + 25 : "2rem",
                                left: isSafari ? item.x : "0",
                                style: "border:0"
                            }}
                        >
                        </iframe>
                    </foreignObject>
                    <TopControls item={item} />
                </g>
            }</>
    )
}
export default Map
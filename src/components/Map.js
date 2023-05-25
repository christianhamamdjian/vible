import React from 'react';
import { MoodboardContext } from "../context/moodboard";

const Map = ({ item }) => {
    const { handleMouseDown, handleDeleteItem, handleMouseUp } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "mapUrl" &&
                <g style={{ width: "300", height: "200" }} clipPath="url(#my-clippath)">
                    <foreignObject width="560" x="0" y="0" height="349" onMouseDown={(e) => handleMouseDown(e, item.id)}
                        onMouseUp={handleMouseUp}>
                        <div style={{ width: '100%', height: '40px', backgroundColor: "#000000" }} draggable="true"></div>
                        <iframe draggable="true" src={item.mapUrl} width="600" height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </foreignObject>
                    <circle
                        cx="0"
                        cy="0"
                        r="8"
                        fill="red"
                        stroke="white"
                        strokeWidth="2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteItem(item.id)}
                    />
                </g>
            }</>
    )
}
export default Map
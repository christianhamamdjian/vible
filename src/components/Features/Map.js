import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Map = ({ item }) => {
    const { handleMouseDown, handleDeleteItem, handleMouseUp, isEditingBoard } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "mapUrl" &&
                <g style={{ width: "300", height: "200" }} clipPath="url(#my-clippath)">
                    <foreignObject
                        width="300"
                        x="0"
                        y="0"
                        height="250"
                        draggable="true"
                        onMouseDown={(e) => handleMouseDown(e, item.id)}
                        onMouseUp={handleMouseUp}
                        onTouchStart={(e) => handleMouseDown(e, item.id)}
                        onTouchEnd={handleMouseUp}
                    >
                        <div style={{ width: '100%', height: '30px', backgroundColor: "#000000" }}></div>
                        <iframe src={item.mapUrl} width="300" height="200" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </foreignObject>
                    {isEditingBoard && <><circle
                        cx="0"
                        cy="0"
                        r="8"
                        fill="red"
                        stroke="white"
                        strokeWidth="2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteItem(item.id)}
                    /></>}
                </g>
            }</>
    )
}
export default Map
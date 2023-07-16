import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Map = ({ item }) => {
    const { handleRectPointerDown, handleRectPointerMove, handleDeleteItem, handleRectPointerUp, isEditingBoard } = React.useContext(MoodboardContext);

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
                        onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                        onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                    >
                        <div style={{ width: '100%', height: '30px', backgroundColor: "#000000" }}></div>
                        <iframe src={item.mapUrl} width="300" height="200" style={{ border: "0", userSelect: "none", }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </foreignObject>
                    {isEditingBoard && <><rect
                        x="10"
                        y="-12"
                        height="10"
                        width="24"
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
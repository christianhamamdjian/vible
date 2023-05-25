import React from 'react';
import { MoodboardContext } from "../context/moodboard";

const Video = ({ item }) => {
    const { handleMouseDown, handleDeleteItem, handleMouseUp } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "video" && <>
                <foreignObject width="560" height="349" onMouseDown={(e) => handleMouseDown(e, item.id)}
                    onMouseUp={handleMouseUp} >
                    <div style={{ width: '100%', height: '40px', backgroundColor: "#000000" }} draggable="true"></div>
                    <iframe draggable="true" width="560" height="315" src={item.videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"></iframe>
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
            </>

            }
        </>
    )
}
export default Video
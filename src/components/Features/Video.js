import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Video = ({ item }) => {
    const { handleRectPointerDown, handleRectPointerMove, handleDeleteItem, handleRectPointerUp, isEditingBoard } = React.useContext(MoodboardContext);

    return (
        <>
            {item.type === "video" &&
                <>
                    <foreignObject
                        width="300"
                        height="250"
                        draggable="true"
                        onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={() => handleRectPointerUp(item.id)}
                    >
                        <div style={{ width: '100%', height: '30px', backgroundColor: "#000000" }}></div>
                        <iframe width="300" height="200" src={item.videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"></iframe>
                    </foreignObject>
                    {isEditingBoard &&
                        <>
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

            }
        </>
    )
}
export default Video
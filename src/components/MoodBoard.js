import React from 'react';
import Gallery from "./Features/Gallery"
import Box from "./Features/Box"
import Image from "./Features/Image"
import Video from "./Features/Video"
import Map from "./Features/Map"
import ImageLink from "./Features/ImageLink"
import Drawing from "./Features/Drawing"
import DrawingForm from "./forms/DrawingForm"

import { MoodboardContext } from "../context/moodboardContext";

const MoodBoard = () => {
    const { isDrawing, handleDrawing, editingText, isPathMoving, isErasing, isMovingObjects, selectedItem, draggingItem, svgRef, items, handleMouseDown, handleMouseMove, handleMouseUp, zoom } = React.useContext(MoodboardContext);

    return (
        <>

            <div className="frame" style={{
                overflow: `${(isDrawing || isPathMoving || isErasing || (selectedItem && draggingItem) || isMovingObjects) ? "hidden" : "auto"}`,
                touchAction: `${(isDrawing || isPathMoving || isErasing || (selectedItem && draggingItem) || isMovingObjects) ? "none" : "auto"}`
            }}>
                <svg
                    id="my-svg"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchMove={handleMouseMove}
                    onTouchEnd={handleMouseUp}
                    ref={svgRef}
                    viewBox={`0 0 ${zoom} ${zoom}`} preserveAspectRatio="none"
                    style={{ width: '2000', height: '2000', border: '1px solid transparent' }}
                    cursor={isDrawing ? "crosshair" : "move"}
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <foreignObject
                        x="200"
                        y="0"
                        width="160"
                        height="80"
                        draggable={editingText ? "false" : "true"}
                    >
                        <button
                            style={isDrawing ? { backgroundColor: "#aabbcc" } : null}
                            onClick={handleDrawing}>Add drawing</button>
                    </foreignObject>
                    {items.map(item => (
                        <g key={item.id}
                            draggable={editingText ? "false" : "true"}
                            transform={`translate(${item.x},${item.y})`}
                        >
                            <Box item={item} />
                            <Image item={item} />
                            <Video item={item} />
                            <Map item={item} />
                            <ImageLink item={item} />
                        </g>
                    ))}
                    <Drawing />
                </svg>
            </div >
            <Gallery />
        </>
    )
}

export default MoodBoard

import React from 'react';
import Gallery from "./Features/Gallery"
import Box from "./Features/Box"
import Image from "./Features/Image"
import Video from "./Features/Video"
import Map from "./Features/Map"
import Pdf from "./Features/Pdf"
import ImageLink from "./Features/ImageLink"
import Drawing from "./Features/Drawing"
import Todo from "./Features/Todo"

import { MoodboardContext } from "../context/moodboardContext";

const MoodBoard = () => {
    const { isDrawing, svgRef, items, zoom, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, svgPosition, divRef, selectedRectId, handleStopEditBox, draggingSvg, isEditingPath
    } = React.useContext(MoodboardContext);

    return (
        <>
            <div
                className="frame"
                ref={divRef}
                style={{
                    width: `${window.innerWidth}`,
                    height: `${window.innerHeight}`,
                    backgroundColor: "lightgray",
                    overflow: `${(isDrawing || selectedRectId || isEditingPath) ? "hidden" : "scroll"}`,
                    touchAction: `${(isDrawing || selectedRectId || isEditingPath) ? "none" : "auto"}`
                }}
            >
                <svg
                    ref={svgRef}
                    width='2000'
                    height='2000'
                    id="my-svg"
                    onPointerDown={handleSvgPointerDown}
                    onPointerMove={handleSvgPointerMove}
                    onPointerUp={handleSvgPointerUp}
                    onTouchMove={handleSvgPointerMove}
                    onDoubleClick={handleStopEditBox}
                    style={{
                        backgroundColor: "white",
                        cursor: draggingSvg ? 'grabbing' : 'grab',
                    }}
                    viewBox={`0 0 ${zoom} ${zoom}`} preserveAspectRatio="none"
                    transform={`translate(${svgPosition.x}, ${svgPosition.y})`}
                    cursor={isDrawing ? "crosshair" : "move"}
                >
                    {items.map(item => (
                        <g key={item.id}
                            transform={`translate(${item.x},${item.y})`}
                        >
                            <Box item={item} />
                            <Image item={item} />
                            <Video item={item} />
                            <Map item={item} />
                            <ImageLink item={item} />
                            <Pdf item={item} />
                        </g>
                    ))}
                    <Drawing />
                </svg>
            </div >
            <Gallery />
            <Todo />
        </>
    )
}

export default MoodBoard

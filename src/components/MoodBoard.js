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
    const { isDrawing, isEditingPath, editingText, selectedPath, draggingPath, draggingItem, svgRef, items, zoom, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, svgPosition } = React.useContext(MoodboardContext);

    return (
        <>
            <div className="frame"
                style={{
                    // overflow: `${(isDrawing || selectedPath || draggingPath || draggingItem) ? "hidden" : "scroll"}`,
                    // touchAction: `${(isDrawing || selectedPath || draggingPath || draggingItem) ? "none" : "auto"}`
                    // width: '300px',
                    // height: '300px',
                    // overflow: 'auto',
                    // border: '1px solid black',
                }}

            >
                <svg
                    id="my-svg"
                    onPointerDown={handleSvgPointerDown}
                    onPointerMove={handleSvgPointerMove}
                    onPointerUp={handleSvgPointerUp}

                    ref={svgRef}
                    viewBox={`0 0 ${zoom} ${zoom}`} preserveAspectRatio="none"
                    style={{ width: '2000', height: '2000', border: '1px solid transparent', transform: `translate(${svgPosition.x}px, ${svgPosition.y}px)` }}
                    cursor={isDrawing ? "crosshair" : "move"}
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    {items.map(item => (
                        <g key={item.id}
                            draggable={editingText || isEditingPath ? "false" : "true"}
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

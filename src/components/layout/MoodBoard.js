import React, { useMemo } from 'react';
import Gallery from "../Features/Gallery"
import Box from "../Features/Box"
import Image from "../Features/Image"
import Video from "../Features/Video"
import Map from "../Features/Map"
import Pdf from "../Features/Pdf"
import ImageLink from "../Features/ImageLink"
import Drawing from "../Features/Drawing"
import Todo from "../Features/Todo"

import { MoodboardContext } from "../../context/moodboardContext";

const MoodBoard = () => {
    const { isDrawing, svgRef, items, zoom, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, svgPosition, divRef, selectedRectId, handleStopEditBox, isEditingPath, isErasing
    } = React.useContext(MoodboardContext);
    const boardItems = useMemo(() => items.map(item => (
        <g key={item.id}
            transform={`translate(${item.x},${item.y})`}
        >
            <Video item={item} />
            <Map item={item} />
            <Pdf item={item} />
            <ImageLink item={item} />
            <Image item={item} />
            <Box item={item} />
        </g>
    )), [items])
    return (
        <>
            <div
                className="frame"
                ref={divRef}
                style={{
                    width: `${window.innerWidth}`,
                    height: `${window.innerHeight}`,
                    backgroundColor: "lightgray",
                    overflow: `${(isDrawing || selectedRectId || isEditingPath || isErasing) ? "hidden" : "scroll"}`,
                    touchAction: `${(isDrawing || selectedRectId || isEditingPath || isErasing) ? "none" : "auto"}`
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
                    onDoubleClick={handleStopEditBox}
                    style={{
                        backgroundColor: "white",
                    }}
                    viewBox={`0 0 ${zoom} ${zoom}`} preserveAspectRatio="none"
                    transform={`translate(${svgPosition.x}, ${svgPosition.y})`}
                    cursor={isDrawing ? "crosshair" : "move"}
                >
                    {/* {items.map(item => (
                        <g key={item.id}
                            transform={`translate(${item.x},${item.y})`}
                        >
                            <Video item={item} />
                            <Map item={item} />
                            <Pdf item={item} />
                            <ImageLink item={item} />
                            <Image item={item} />
                            <Box item={item} />
                        </g>
                    ))} */}
                    {boardItems}
                    <Drawing />
                </svg>
            </div >
            <Gallery />
            <Todo />
        </>
    )
}

export default MoodBoard

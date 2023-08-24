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
import BoardDrop from "../helpers/BoardDrop"

import { MoodboardContext } from "../../context/moodboardContext";

const MoodBoard = () => {
    const { isDrawing, svgRef, items, paths, zoom, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, svgPosition, divRef, selectedRectId, handleStopEditItem, isEditingPath, isErasing, isPartialErasing, handleAddBoxOnSpot
    } = React.useContext(MoodboardContext);

    const renderBoardItems = useMemo(() => {
        return (
            <>
                {items.map(item => (
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
                ))}
                <Drawing />
            </>
        )
    }, [items, paths])
    return (
        <>
            <BoardDrop>
                <div
                    className="frame"
                    ref={divRef}
                    style={{
                        width: `${window.innerWidth}`,
                        height: `${window.innerHeight}`,
                        userSelect: "none",
                        // backgroundColor: "lightgray",
                        overflow: `${(isDrawing || selectedRectId || isEditingPath || isErasing) ? "hidden" : "visible"}`,
                        touchAction: `${(isDrawing || selectedRectId || isEditingPath || isErasing) ? "none" : "auto"}`
                    }}
                >
                    <svg
                        ref={svgRef}
                        width='10000'
                        height='10000'
                        id="my-svg"
                        onPointerDown={handleSvgPointerDown}
                        onTouchStart={handleSvgPointerDown}
                        onPointerMove={handleSvgPointerMove}
                        onPointerUp={handleSvgPointerUp}
                        onDoubleClick={handleStopEditItem}
                        onContextMenu={handleAddBoxOnSpot}
                        style={{
                            backgroundColor: "#ffffff",
                            userSelect: "none",
                            cursor: isErasing || isPartialErasing && "none",
                            transform: `translate(${Math.floor(svgPosition.x)}px, ${Math.floor(svgPosition.y)}px)`,
                            overflow: `${(isDrawing || selectedRectId || isEditingPath || isErasing) ? "hidden" : "visible"}`,
                            // touchAction: `${(isDrawing || selectedRectId || isEditingPath || isErasing) ? "none" : "auto"}`
                        }}
                        viewBox={`0 0 ${zoom} ${zoom}`} preserveAspectRatio="none"
                        //transform={`translate(${Math.floor(svgPosition.x)}px, ${Math.floor(svgPosition.y)}px)`}
                        cursor={isDrawing ? "crosshair" : "move"}
                    >
                        {renderBoardItems}

                    </svg>
                </div >
            </BoardDrop>
            <Gallery />
            <Todo />
        </>
    )
}

export default MoodBoard
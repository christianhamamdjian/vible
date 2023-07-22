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
import BoardDrop from "../Helpers/BoardDrop"

import { MoodboardContext } from "../../context/moodboardContext";

const MoodBoard = () => {
    const { isDrawing, svgRef, items, zoom, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, svgPosition, divRef, selectedRectId, handleStopEditItem, isEditingPath, isErasing, handleAddBoxOnSpot
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
            </>
        )
    }, [items])
    return (
        <>
            <BoardDrop>
                <div
                    className="frame"
                    ref={divRef}
                    style={{
                        width: `${window.innerWidth}`,
                        height: `${window.innerHeight}`,
                        backgroundColor: "lightgray",
                        overflow: `${(isDrawing || selectedRectId || isEditingPath || isErasing) ? "hidden" : "auto"}`,
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
                        }}
                        viewBox={`0 0 ${zoom} ${zoom}`} preserveAspectRatio="none"
                        transform={`translate(${svgPosition.x}, ${svgPosition.y})`}
                        cursor={isDrawing ? "crosshair" : "move"}
                    >
                        {renderBoardItems}
                        <Drawing />
                    </svg>
                </div >
            </BoardDrop>
            <Gallery />
            <Todo />
        </>
    )
}

export default MoodBoard
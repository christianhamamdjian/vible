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
import BoardDrop from "../helperFunctions/BoardDrop"
import Documentation from '../documentation/Documentation'
import corkPattern from '../../assets/background_pattern.jpg';

import { MoodboardContext } from "../../context/moodboardContext";

const MoodBoard = () => {
    const { isDrawing, svgRef, items, paths, zoom, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, svgPosition, divRef, selectedRectId, handleStopEditItem, isEditingPath, isErasing, handleAddBoxOnSpot, backgroundPattern
    } = React.useContext(MoodboardContext);

    const renderBoardItems = useMemo(() => {
        return (
            <>
                {items.map(item => (
                    <g key={item.id}
                        transform={`translate(${item.x},${item.y})`}
                    >
                        <Pdf item={item} />
                        <Video item={item} />
                        <Map item={item} />
                        <ImageLink item={item} />
                        <Image item={item} />
                        <Box item={item} />
                    </g>
                ))}
                <Drawing />
            </>
        )
    }, [items, paths])
    const renderInterfaceItems = useMemo(() => {
        return (
            <>
                <Gallery />
                <Todo />
                <Documentation />
            </>
        )
    }, [items, paths])
    return (
        <>
            <BoardDrop>
                <div
                    className="board-frame"
                    ref={divRef}
                    style={{
                        width: `${window.innerWidth}`,
                        height: `${window.innerHeight}`,
                        overflow: `${(isDrawing || selectedRectId || isEditingPath || isErasing) ? "hidden" : "visible"}`,
                    }}
                >
                    <svg
                        ref={svgRef}
                        width='10000'
                        height='10000'
                        id="board-svg"
                        className='board-body'
                        onPointerDown={handleSvgPointerDown}
                        onTouchStart={handleSvgPointerDown}
                        onPointerMove={handleSvgPointerMove}
                        onPointerUp={handleSvgPointerUp}
                        onDoubleClick={handleStopEditItem}
                        // onContextMenu={handleAddBoxOnSpot}
                        style={{
                            transform: `translate(${Math.floor(svgPosition.x)}px, ${Math.floor(svgPosition.y)}px)`,
                            overflow: `${(isDrawing || selectedRectId || isEditingPath || isErasing) ? "hidden" : "visible"}`,
                            // touchAction: `${(isDrawing || selectedRectId || isEditingPath || isErasing) ? "none" : "auto"}`,
                        }}
                        viewBox={`0 0 ${zoom} ${zoom}`}
                        preserveAspectRatio="none"
                        cursor={isDrawing ? "crosshair" : "move"}
                    >
                        {backgroundPattern && <>
                            <defs>
                                <pattern id="cork" patternUnits="userSpaceOnUse" width="300" height="300">
                                    <image href={corkPattern} x="0" y="0" width="300" height="300" />
                                </pattern>
                                <pattern id="lines" x="0" y="0" width=".2%" height=".2%" patternUnits="objectBoundingBox">
                                    <path d="M 0 8 l 32 0" style={{ stroke: "#eeeeee", fill: "none" }} />
                                </pattern>
                                <pattern id="squares" x="0" y="0" width=".2%" height=".2%" patternUnits="objectBoundingBox">
                                    <path d="M 8 0 l 0 32" style={{ stroke: "#eeeeee", fill: "none" }} />
                                    <path d="M 0 8 l 32 0" style={{ stroke: "#eeeeee", fill: "none" }} />
                                </pattern>
                            </defs>
                            <rect
                                x="0"
                                y="0"
                                width='10000'
                                height='10000'
                                fill={`url(#${backgroundPattern})`}
                            />
                        </>}
                        {renderBoardItems}
                    </svg>
                </div >
            </BoardDrop>
            {renderInterfaceItems}
        </>
    )
}

export default MoodBoard
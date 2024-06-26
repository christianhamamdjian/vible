import React, { useMemo } from 'react';
import Gallery from "./Gallery"
import Box from "../Features/Box"
import Image from "../Features/Image"
import Video from "../Features/Video"
import Map from "../Features/Map"
import Pdf from "../Features/Pdf"
import ImageLink from "../Features/ImageLink"
import Drawing from "../Features/Drawing"
import Todo from "./Todo"
import BoardDrop from "../helperComponents/BoardDrop"
import Documentation from '../documentation/Documentation'
import corkPattern from '../../assets/background_pattern.jpg';

import { MoodboardContext } from "../../context/moodboardContext";
const MoodBoard = () => {
    const { isDrawing, svgRef, items, editingText, paths, zoom, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, handleSvgPointerLeave, svgPosition, divRef, selectedRectId, handleStopEditItem, isEditingPath, isErasing, activeBoard, handleTouchStart, handleTouchMove,
        handleTouchEnd
    } = React.useContext(MoodboardContext);

    const renderBoardItems = useMemo(() => {
        return (
            <>
                {items.map(item => (
                    <g key={item.id}>
                        <>
                            <Pdf item={item} />
                            <Video item={item} />
                            <Map item={item} />
                            <ImageLink item={item} />
                            <Image item={item} />
                            <Box item={item} />
                        </>
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


    const backgroundPattern = activeBoard.boardBackground === "plainColour" ? null : activeBoard.boardBackground

    return (
        <>
            <BoardDrop>
                <div
                    className="board-frame"
                    ref={divRef}
                    style={{
                        width: `${window.innerWidth}`,
                        height: `${window.innerHeight}`,
                    }}
                >
                    <svg
                        ref={svgRef}
                        width='10000'
                        height='10000'
                        id="board-svg"
                        className='board-body'
                        onPointerDown={handleSvgPointerDown}
                        //onTouchStart={handleSvgPointerDown}
                        onPointerMove={handleSvgPointerMove}
                        onPointerUp={handleSvgPointerUp}
                        // onClick={() => (editingText || selectedRectId) && handleStopEditItem()}
                        onPointerLeave={handleSvgPointerLeave}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        // onContextMenu={handleAddBoxOnSpot}
                        style={{
                            backgroundColor: activeBoard.boardColor,
                            transform: `translate(${Math.floor(svgPosition.x)}px, ${Math.floor(svgPosition.y)}px)`,
                            overflow: `${(isDrawing || selectedRectId || isEditingPath || isErasing) ? "hidden" : "visible"}`,
                            // touchAction: `${(isDrawing || selectedRectId || isEditingPath || isErasing) ? "none" : "auto"}`,
                        }}
                        viewBox={`0 0 ${zoom} ${zoom}`}
                        preserveAspectRatio="none"
                        cursor={isDrawing ? "crosshair" : "move"}
                        xmlns="http://www.w3.org/2000/svg"
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
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
    const { isDrawing, isEditingPath, editingText, svgRef, items, zoom, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, svgPosition, divRef, handlePointerDown, handlePointerMove, handlePointerUp, handleDivResize, handleSvgLoad, handleStopEditBox, draggingSvg
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
                    // width: "100vw",
                    // height: "100vh",
                    overflow: 'auto',
                    // position: 'relative',
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onResize={handleDivResize}>
                <svg
                    width='2000'
                    height='2000'
                    id="my-svg"
                    onPointerDown={handleSvgPointerDown}
                    onPointerMove={handleSvgPointerMove}
                    onPointerUp={handleSvgPointerUp}
                    onLoad={handleSvgLoad}
                    onDoubleClick={handleStopEditBox}
                    ref={svgRef}
                    style={{
                        backgroundColor: "white",
                    }}
                    viewBox={`0 0 ${zoom} ${zoom}`} preserveAspectRatio="none"
                    transform={`translate(${svgPosition.x}, ${svgPosition.y})`}
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

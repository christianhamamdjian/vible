import React from 'react';
import Gallery from "./Features/Gallery"
import Box from "./Features/Box"
import Image from "./Features/Image"
import Video from "./Features/Video"
import Map from "./Features/Map"
import ImageLink from "./Features/ImageLink"
import Drawing from "./Features/Drawing"
import DrawingForm from "./forms/DrawingForm"
import BoxForm from "./forms/BoxForm"
import ImageForm from "./forms/ImageForm"
import VideoForm from "./forms/VideoForm"
import MapForm from "./forms/MapForm"
import ImageLinkForm from "./forms/ImageLinkForm"

import { MoodboardContext } from "../context/moodboard";

const FullBoard = () => {
    const { isDrawing, svgRef, items, handleMouseDown, handleMouseMove, handleMouseUp } = React.useContext(MoodboardContext);

    return (
        <div className='dashboard'>
            <div className='sidebar'>
                <BoxForm />
                <ImageForm />
                <VideoForm />
                <ImageLinkForm />
                <MapForm />
            </div>
            <div className="frame">
                <svg
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    ref={svgRef}
                    style={{ width: '2000', height: '2000', border: '1px solid transparent' }}
                    cursor={isDrawing ? "crosshair" : "move"}
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <g>
                        <clippath id="my-clippath">
                            <path d="M 50 15, 100 25, 100 100, 50 100, 0 100, 0 25Z"></path>
                        </clippath>
                    </g>
                    {items.map(item => (
                        <g
                            key={item.id}
                            draggable="true"
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
            </div>
            <div className='sidebar'>
                <DrawingForm />
                <Gallery />
            </div>
        </div>
    )
}

export default FullBoard

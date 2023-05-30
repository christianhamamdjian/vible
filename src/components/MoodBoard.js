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

import { MoodboardContext } from "../context/moodboardContext";

const MoodBoard = () => {
    const { isDrawing, isPathMoving, isErasing, selectedItem, svgRef, items, handleMouseDown, handleMouseMove, handleMouseUp, handleDraw, handleWrite, handleImage, handleImageLink, handleVideo, handleMap, write, image, video, imageLink, map, draw, handlePdfDownload, handleClearBoard } = React.useContext(MoodboardContext);

    return (
        <div className='dashboard'>
            <div className='sidebar'>
                <button style={draw ? { backgroundColor: "#aabbcc" } : null} type="button" onClick={handleDraw}>Draw</button>
                {draw && <DrawingForm />}
                <button style={write ? { backgroundColor: "#aabbcc" } : null} type="button" onClick={handleWrite}>Write</button>
                {write && <BoxForm />}
                <button style={image ? { backgroundColor: "#aabbcc" } : null} type="button" onClick={handleImage}>Image</button>
                {image && <ImageForm />}
                <button style={imageLink ? { backgroundColor: "#aabbcc" } : null} type="button" onClick={handleImageLink}>Image link</button>
                {imageLink && <ImageLinkForm />}
                <button style={video ? { backgroundColor: "#aabbcc" } : null} type="button" onClick={handleVideo}>Video</button>
                {video && <VideoForm />}
                <button style={map ? { backgroundColor: "#aabbcc" } : null} type="button" onClick={handleMap}>Map</button>
                {map && <MapForm />}
            </div>
            <div className="frame" style={{
                touchAction: `${(isDrawing || isPathMoving || isErasing || selectedItem) ? "none" : "auto"}`
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
                    style={{ width: '2000', height: '2000', border: '1px solid transparent' }}
                    cursor={isDrawing ? "crosshair" : "move"}
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    {items.map(item => (
                        <g key={item.id}
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
                <button onClick={handlePdfDownload}>Download as PDF</button>
                <button onClick={handleClearBoard}>Clear board</button>
                <Gallery />
            </div>
        </div>
    )
}

export default MoodBoard

import React from 'react'
import DrawingForm from "../forms/DrawingForm"
import BoxForm from "../forms/BoxForm"
import ImageForm from "../forms/ImageForm"
import VideoForm from "../forms/VideoForm"
import MapForm from "../forms/MapForm"
import ImageLinkForm from "../forms/ImageLinkForm"
import ThemeSwitcher from './ThemeSwitcher';

import { MoodboardContext } from "../../context/moodboardContext";

const LeftSidebard = () => {
    const { handleDraw, handleWrite, handleImage, handleImageLink, handleVideo, handleMap, write, image, video, imageLink, map, draw } = React.useContext(MoodboardContext);

    return (
        <div className='left-sidebar'>
            <ThemeSwitcher />
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
    )
}

export default LeftSidebard

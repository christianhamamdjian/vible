import React from 'react'
import BoxForm from "../forms/BoxForm"
import ImageForm from "../forms/ImageForm"
import VideoForm from "../forms/VideoForm"
import MapForm from "../forms/MapForm"
import PdfForm from "../forms/PdfForm"
import ImageLinkForm from "../forms/ImageLinkForm"

import { MoodboardContext } from "../../context/moodboardContext";

const LeftSidebard = () => {
    const { handleWrite, handleImage, handleImageLink, handleVideo, handleMap, handlePdf, write, image, video, imageLink, map, pdf } = React.useContext(MoodboardContext);

    return (
        <div className='left-sidebar'>
            {/* <button className={draw ? "selected-button" : null} type="button" onClick={handleDraw}>Draw</button>
            {draw && <DrawingForm />} */}
            <button
                className={write ? "selected-button" : null}
                type="button" onClick={handleWrite}>Write</button>
            {write && <BoxForm />}
            <button
                className={image ? "selected-button" : null}
                type="button" onClick={handleImage}>Image</button>
            {image && <ImageForm />}
            <button
                className={imageLink ? "selected-button" : null}
                type="button" onClick={handleImageLink}>Image link</button>
            {imageLink && <ImageLinkForm />}
            <button
                className={video ? "selected-button" : null}
                type="button" onClick={handleVideo}>Video</button>
            {video && <VideoForm />}
            <button
                className={map ? "selected-button" : null}
                type="button" onClick={handleMap}>Map</button>
            {map && <MapForm />}
            <button
                className={pdf ? "selected-button" : null}
                type="button" onClick={handlePdf}>Pdf</button>
            {pdf && <PdfForm />}
        </div>
    )
}

export default LeftSidebard

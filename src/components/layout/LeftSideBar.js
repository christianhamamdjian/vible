import React from 'react'
// import BoxForm from "../forms/BoxForm"
import ImageForm from "../forms/ImageForm"
import VideoForm from "../forms/VideoForm"
import MapForm from "../forms/MapForm"
import PdfForm from "../forms/PdfForm"
import ImageLinkForm from "../forms/ImageLinkForm"

import { MoodboardContext } from "../../context/moodboardContext";

const LeftSidebard = () => {
    const { handleImage, handleImageLink, handleVideo, handleMap, handlePdf, image, video, imageLink, map, pdf } = React.useContext(MoodboardContext);

    return (
        <div className='left-sidebar anim-y'>
            <div className='left-sidebar-buttons anim-y'>
                {/* <button className={draw ? "selected-button" : null} type="button" onClick={handleDraw}>Draw</button>
            {draw && <DrawingForm />} */}
                {/* <button
                className={write ? "selected-button" : null}
                type="button" onClick={handleWrite}>Write</button>
            {write && <BoxForm />} */}
                <button
                    className={`toggler anim-y ${image ? "selected-button" : null}`}
                    type="button" onClick={handleImage}>Image</button>

                {/* <button
                onClick={handleImage}
            >
                <div className='gallery-sign'>&times;</div>
            </button > */}
                {image && <ImageForm />}
                <button
                    className={`toggler anim-y ${imageLink ? "selected-button" : null}`}
                    type="button" onClick={handleImageLink}>Image link</button>
                {imageLink && <ImageLinkForm />}
                <button
                    className={`toggler anim-y ${video ? "selected-button" : null}`}
                    type="button" onClick={handleVideo}>Video</button>
                {video && <VideoForm />}
                <button
                    className={`toggler anim-y ${map ? "selected-button" : null}`}
                    type="button" onClick={handleMap}>Map</button>
                {map && <MapForm />}
                <button
                    className={`toggler anim-y ${pdf ? "selected-button" : null}`}
                    type="button" onClick={handlePdf}>Pdf</button>
                {pdf && <PdfForm />}
            </div>
        </div>
    )
}

export default LeftSidebard

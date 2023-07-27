import React from 'react'
import ButtonsTop from "./ButtonsTop"
import BoxFormTop from "./BoxFormTop"
import DrawingFormTop from "./DrawingFormTop"
// import ImageFormTop from "./ImageFormTop"
import VideoFormTop from "./VideoFormTop"
import MapFormTop from "./MapFormTop"
import PdfFormTop from "./PdfFormTop"
import { MoodboardContext } from "../../context/moodboardContext"

const EditFormTop = () => {
    const { } = React.useContext(MoodboardContext)

    return (
        <div className='itemForms-top'>
            <ButtonsTop />
            <BoxFormTop />
            <DrawingFormTop />
            {/* <ImageFormTop /> */}
            <VideoFormTop />
            <MapFormTop />
            <PdfFormTop />
        </div>)
}

export default EditFormTop
import React from 'react'
import ButtonsTop from "./ButtonsTop"
import BoxFormTop from "./BoxFormTop"
import DrawingFormTop from "./DrawingFormTop"
import ImageFormTop from "./ImageFormTop"
import ImageLinkFormTop from "./ImageLinkFormTop"
import VideoFormTop from "./VideoFormTop"
import MapFormTop from "./MapFormTop"
import PdfFormTop from "./PdfFormTop"
import TopBoardsSlider from "../helperFunctions/TopBoardsSlider"
import { MoodboardContext } from "../../context/moodboardContext"

const EditFormTop = () => {
    const { showBoards } = React.useContext(MoodboardContext)

    return (
        <div className='itemForms-top'>
            <ButtonsTop />
            {showBoards && <TopBoardsSlider />}
            <BoxFormTop />
            <DrawingFormTop />
            <ImageFormTop />
            <ImageLinkFormTop />
            <VideoFormTop />
            <MapFormTop />
            <PdfFormTop />
        </div>)
}

export default EditFormTop
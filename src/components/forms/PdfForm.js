import React from 'react';
import DragDropUpload from "../Helpers/DragDropUpload"
import { MoodboardContext } from "../../context/moodboardContext";

const PdfForm = () => {
    const { items, handleImageUpload, editingImage, handleImageChange, handlePdfUpload } = React.useContext(MoodboardContext);
    return (
        <div className='itemForms'>
            <h2>Pdf:</h2>
            <div className='inputs'>
                <label className='custom-file-upload'>
                    Add a Pdf file:
                    <input
                        type="file"
                        accept="pdf"
                        onChange={handlePdfUpload} />
                </label>
            </div>
        </div>
    )
}
export default PdfForm
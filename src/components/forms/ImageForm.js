import React from 'react';
import DragDropUpload from "../helperComponents/DragDropUpload"
import { MoodboardContext } from "../../context/moodboardContext";

const ImageForm = () => {
    const { handleImageUpload, handleImageDropUpload, imageUploadValue, errorMessage } = React.useContext(MoodboardContext);
    return (
        <div className='itemForms'>
            <h2>Upload an image:</h2>
            <div className='inputs'>
                <label className='custom-file-upload'>
                    <input
                        type="file"
                        accept="image/*"
                        value={imageUploadValue}
                        onChange={handleImageUpload} />
                </label>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <DragDropUpload handleImageDropUpload={handleImageDropUpload} />
            </div>
        </div>
    )
}
export default ImageForm
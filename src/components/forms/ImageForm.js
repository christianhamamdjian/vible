import React from 'react';
import DragDropUpload from "../helperFunctions/DragDropUpload"
import { MoodboardContext } from "../../context/moodboardContext";

const ImageForm = () => {
    const { items, handleImageUpload, editingImage, handleItemChange, handleImageDropUpload, imageUploadValue } = React.useContext(MoodboardContext);
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
                {/* {items.length > 0 && editingImage && (
                    <label>
                        Change image width:
                        <input
                            type="number"
                            min="10"
                            max="100"
                            value={items.find(item => item.id === editingImage.id).width}
                            onChange={(event) => handleItemChange(event, editingImage.id, "width")}
                        />
                    </label>)
                } */}
                <DragDropUpload handleImageDropUpload={handleImageDropUpload} />
            </div>
        </div>
    )
}
export default ImageForm
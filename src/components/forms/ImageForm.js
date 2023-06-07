import React from 'react';
import DragDropUpload from "../Helpers/DragDropUpload"
import { MoodboardContext } from "../../context/moodboardContext";

const ImageForm = () => {
    const { items, handleImageUpload, editingImage, handleImageChange, handleImageDropUpload } = React.useContext(MoodboardContext);
    return (
        <div className='itemForms'>
            <h2>Images:</h2>
            <div className='inputs'>
                <label className='custom-file-upload'>
                    Add an image:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload} />
                </label>
                {items.length > 0 && editingImage && (
                    <label>
                        Change image width:
                        <input
                            type="number"
                            min="40"
                            value={items.find(item => item.id === editingImage.id).width}
                            onChange={(event) => handleImageChange(event, editingImage.id)}
                        />
                    </label>)
                }
                <DragDropUpload handleImageDropUpload={handleImageDropUpload} />
            </div>
        </div>
    )
}
export default ImageForm
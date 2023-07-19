import React from 'react';
import DragDropUpload from "../Helpers/DragDropUpload"
import { MoodboardContext } from "../../context/moodboardContext";

const ImageForm = () => {
    const { items, handleImageUpload, editingImage, handleItemChange, handleImageDropUpload } = React.useContext(MoodboardContext);
    return (
        <div className='itemForms anim-y'>
            <h2>Upload an image:</h2>
            <div className='inputs'>
                <label className='custom-file-upload'>
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
                            min="10"
                            max="100"
                            value={items.find(item => item.id === editingImage.id).width}
                            onChange={(event) => handleItemChange(event, editingImage.id, "width")}
                        />
                    </label>)
                }
                <DragDropUpload handleImageDropUpload={handleImageDropUpload} />
            </div>
        </div>
    )
}
export default ImageForm
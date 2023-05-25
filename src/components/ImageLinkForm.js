import React from 'react';
import { MoodboardContext } from "../context/moodboard";

const ImageLinkForm = () => {
    const { itemImageUrl, handleAddImage, handleItemImageUrl } = React.useContext(MoodboardContext);
    return (
        <div className='itemForms'>
            <h2>Image link:</h2>
            <form className='inputs' onSubmit={handleAddImage}>
                <div className='inputs'>
                    <label>Add an image link:</label>
                    <input type="text" name="imageurl" value={itemImageUrl} onChange={handleItemImageUrl} />
                    <button type="submit">Add image</button>
                </div>
            </form>
        </div>
    )
}
export default ImageLinkForm
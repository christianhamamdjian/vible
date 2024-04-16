import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const ImageLinkForm = () => {
    const { itemImageUrl, handleAddImage, handleItemImageUrl } = React.useContext(MoodboardContext);
    return (
        <div className='itemForms'>
            <h2>Online image link:</h2>
            <p>Example: https://www.christian-hamamdjian.com/files/IMG_0679.jpg </p>
            <form className='inputs' onSubmit={handleAddImage}>
                <div className='inputs'>
                    <input type="text" name="imageurl" value={itemImageUrl} onChange={handleItemImageUrl} />
                    <button
                        className={`${!itemImageUrl && "disabled"}`}
                        disabled={!itemImageUrl}
                        type="submit">Add image</button>
                </div>
            </form>
        </div>
    )
}
export default ImageLinkForm
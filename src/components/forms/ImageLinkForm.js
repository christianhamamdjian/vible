import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const ImageLinkForm = () => {
    const { itemImageUrl, handleAddImage, handleItemImageUrl } = React.useContext(MoodboardContext);
    return (
        <div className='itemForms'>
            <h2>Online image link:</h2>
            <p>Example: https://www.mozilla.org/media/img/products/vpn/landing/vpn-cntwell-01-high-res.a4aaa9ab2b91.png </p>
            <form className='inputs' onSubmit={handleAddImage}>
                <div className='inputs'>
                    <input type="text" name="imageurl" value={itemImageUrl} onChange={handleItemImageUrl} />
                    <button type="submit">Add image</button>
                </div>
            </form>
        </div>
    )
}
export default ImageLinkForm
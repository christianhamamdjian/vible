import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const VideoForm = () => {
    const { handleAddVideo, handleItemVideoUrl, itemVideoUrl } = React.useContext(MoodboardContext);

    return (<div className='itemForms anim-y'>
        <h2>Youtube video link:</h2>
        <p>Example: https://www.youtube.com/embed/Dwvi_hjAS50 </p>
        <form className='inputs' onSubmit={handleAddVideo}>
            <div className='inputs'>
                <label>Add a Youtube video link:</label>
                <input type="text" name="videourl" value={itemVideoUrl} onChange={handleItemVideoUrl} />
                <button type="submit">Add video</button>
            </div>
        </form>
    </div>)
}
export default VideoForm
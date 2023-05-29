import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const VideoForm = () => {
    const { handleAddVideo, handleItemVideoUrl, itemVideoUrl } = React.useContext(MoodboardContext);
    return (<div className='itemForms'>
        <h2>Videos:</h2>
        <form className='inputs' onSubmit={handleAddVideo}>
            <div className='inputs'>
                <label>Add a Youtube video link:</label>
                <input type="text" name="videourl" value={itemVideoUrl} onChange={handleItemVideoUrl} />
                <button type="submit">Add video</button>
            </div> </form></div>)
}
export default VideoForm
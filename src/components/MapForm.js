import React from 'react';
import { MoodboardContext } from "../context/moodboard";

const MapForm = () => {
    const { handleItemMapUrl, itemMapUrl, handleAddMap } = React.useContext(MoodboardContext);
    return (
        <div className='itemForms'>
            <h2>Map:</h2>
            <form className='inputs' onSubmit={handleAddMap}>
                <div className='inputs'>
                    <label>Add a map link:</label>
                    <input type="text" name="mapurl" value={itemMapUrl} onChange={handleItemMapUrl} />
                    <button type="submit">Add map</button>
                </div>
            </form>
        </div>
    )
}
export default MapForm
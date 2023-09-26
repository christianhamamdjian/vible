import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const MapForm = () => {
    const { handleItemMapUrl, itemMapUrl, handleAddMap } = React.useContext(MoodboardContext);
    return (
        <div className='itemForms'>
            <h2>Google Map Link:</h2>
            <p>Example: 60.1717794,24.9413548 </p>
            <form className='inputs' onSubmit={handleAddMap}>
                <div className='inputs'>
                    <input type="text" name="mapurl" value={itemMapUrl} onChange={handleItemMapUrl} />
                    <button
                        className={`${!itemMapUrl && "disabled"}`}
                        disabled={!itemMapUrl}
                        type="submit">Add map</button>
                </div>
            </form>
        </div>
    )
}
export default MapForm
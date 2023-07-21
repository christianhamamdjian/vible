import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const MapForm = () => {
    const { handleItemMapUrl, itemMapUrl, handleAddMap } = React.useContext(MoodboardContext);
    return (
        <div className='itemForms'>
            <h2>Google Map Link:</h2>
            <p>Example: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.274257380938!2d-70.56068388481569!3d41.45496659976631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e52963ac45bbcb%3A0xf05e8d125e82af10!2sDos%20Mas!5e0!3m2!1sen!2sus!4v1671220374408!5m2!1sen!2sus </p>
            <form className='inputs' onSubmit={handleAddMap}>
                <div className='inputs'>
                    <input type="text" name="mapurl" value={itemMapUrl} onChange={handleItemMapUrl} />
                    <button type="submit">Add map</button>
                </div>
            </form>
        </div>
    )
}
export default MapForm
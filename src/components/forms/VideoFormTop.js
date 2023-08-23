import React from 'react'
import { MoodboardContext } from "../../context/moodboardContext"

const VideoFormTop = () => {
    const { items, editingItem, handleItemChange } = React.useContext(MoodboardContext)

    return (
        <>
            {editingItem !== null && items.length > 0 && (
                <>
                    <div className='inputs-top_objects' >
                        <label>Change width:</label>
                        <input
                            type="range"
                            min="100"
                            max="600"
                            step="10"
                            name="width"
                            value={editingItem !== null && items.find(item => item.id === editingItem.id)["width"]}
                            onChange={(e) => handleItemChange(e, editingItem.id, "width")
                            } />
                        {/* <label>Change height:</label>
                         <input
                            type="range"
                            min="60"
                            max="600"
                            step="10"
                            name="width"
                            value={editingItem && items.find(item => item.id === editingItem.id).width * 3/4}
                            onChange={(e) => handleItemChange(e, editingItem.id, "width")
                            } /> */}
                        <label>Change Angle:</label>
                        <input
                            type="range"
                            min="-180"
                            max="180"
                            step="1"
                            name="angle"
                            value={editingItem !== null && items.find(item => item.id === editingItem.id).angle}
                            onChange={(e) => handleItemChange(e, editingItem.id, "angle")
                            } />
                    </div>
                </>
            )
            }
        </>
    )
}
export default VideoFormTop
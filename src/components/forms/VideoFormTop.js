import React from 'react'
import { MoodboardContext } from "../../context/moodboardContext"

const VideoFormTop = () => {
    const { items, editingVideo, handleItemChange } = React.useContext(MoodboardContext)

    return (
        <>
            {editingVideo && items.length > 0 && (
                <>
                    <div className='inputs-top_objects' >
                        <label>Change width:</label>
                        <input
                            type="range"
                            min="100"
                            max="600"
                            step="10"
                            name="width"
                            value={editingVideo && items.find(item => item.id === editingVideo.id)["width"]}
                            onChange={(event) => handleItemChange(event, editingVideo.id, "width")
                            } />
                        {/* <label>Change height:</label>
                         <input
                            type="range"
                            min="60"
                            max="600"
                            step="10"
                            name="width"
                            value={editingVideo && items.find(item => item.id === editingVideo.id).width * 3/4}
                            onChange={(event) => handleItemChange(event, editingVideo.id, "width")
                            } /> */}
                        <label>Change Angle:</label>
                        <input
                            type="range"
                            min="-180"
                            max="180"
                            step="1"
                            name="angle"
                            value={editingVideo && items.find(item => item.id === editingVideo.id).angle}
                            onChange={(event) => handleItemChange(event, editingVideo.id, "angle")
                            } />
                    </div>
                </>
            )
            }
        </>
    )
}
export default VideoFormTop
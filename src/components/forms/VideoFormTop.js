import React from 'react'
import { MoodboardContext } from "../../context/moodboardContext"

const VideoFormTop = () => {
    const { items, video, editingVideo, handleItemChange } = React.useContext(MoodboardContext)

    return (
        <>
            {video && items.length > 0 && (
                <>
                    <div className='inputs-top_objects' >
                        <label>Change Link:</label>
                        <input
                            type="text"
                            name="url"
                            value={editingVideo && items.find(item => item.id === editingVideo.id).url}
                            onChange={(event) => handleItemChange(event, editingVideo.id, "link")
                            } />
                        <label>Change width:</label>
                        <input
                            type="range"
                            min="100"
                            max="600"
                            step="10"
                            name="width"
                            value={editingVideo && items.find(item => item.id === editingVideo.id).width}
                            onChange={(event) => handleItemChange(event, editingVideo.id, "width")
                            } />
                        <label>Change height:</label>
                        <input
                            type="range"
                            min="60"
                            max="600"
                            step="10"
                            name="height"
                            value={editingVideo && items.find(item => item.id === editingVideo.id).height}
                            onChange={(event) => handleItemChange(event, editingVideo.id, "height")
                            } />
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
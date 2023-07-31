import React from 'react'
import { MoodboardContext } from "../../context/moodboardContext"

const ImageFormTop = () => {
    const { items, editingImage, handleItemChange } = React.useContext(MoodboardContext)
    return (
        <>
            {editingImage && items.length > 0 && (
                <>
                    <div className='inputs-top_objects' >
                        <label>
                            Change image width:
                            <input
                                type="number"
                                min="5"
                                max="100"
                                value={editingImage && items.find(item => item.id === editingImage.id).width}
                                onChange={(event) => handleItemChange(event, editingImage.id, "width")}
                            />
                        </label>
                        <label>Change Angle:</label>
                        <input
                            type="range"
                            min="-180"
                            max="180"
                            step="1"
                            name="angle"
                            value={editingImage && items.find(item => item.id === editingImage.id).angle}
                            onChange={(event) => handleItemChange(event, editingImage.id, "angle")
                            } />
                        <label>Change Opacity:</label>
                        <input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.1"
                            name="opacity"
                            value={editingImage && items.find(item => item.id === editingImage.id).opacity}
                            onChange={(event) => handleItemChange(event, editingImage.id, "opacity")
                            } />
                    </div>
                    )
                </>
            )
            } </>
    )
}
export default ImageFormTop
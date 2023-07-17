import React from 'react'
import { MoodboardContext } from "../../context/moodboardContext"

const ImageFormTop = () => {
    const { items, image, editingImage, handleItemChange } = React.useContext(MoodboardContext)
    return (
        <>
            {image && items.length > 0 && (
                <>
                    <div className='inputs-top_objects' >
                        <label>
                            Change image width:
                            <input
                                type="number"
                                min="10"
                                max="100"
                                value={items.find(item => item.id === editingImage.id).width}
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
                            value={items.find(item => item.id === editingImage.id).angle}
                            onChange={(event) => handleItemChange(event, editingImage.id, "angle")
                            } />
                    </div>
                    )
                </>
            )
            } </>
    )
}
export default ImageFormTop
import React from 'react'
import { MoodboardContext } from "../../context/moodboardContext"

const ImageLinkFormTop = () => {
    const { editingImage, handleItemChange } = React.useContext(MoodboardContext)
    return (
        <>
            {editingImage && items.length > 0 && (
                <div className='inputs-top_objects' >
                    {/* <label>
                        Change image width:
                        <input
                            type="number"
                            min="10"
                            max="100"
                            value={editingImage && items.find(item => item.id === editingImage.id).width}
                            onChange={(event) => handleItemChange(event, editingImage.id, "width")}
                        />
                    </label> */}
                    <label>Change width:</label>
                    <input
                        type="range"
                        min="5"
                        max="100"
                        step="10"
                        name="width"
                        value={editingImage && items.find(item => item.id === editingImage.id).width}
                        onChange={(event) => handleItemChange(event, editingImage.id, "width")
                        } />
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
                </div>
            )
            }
        </>
    )
}
export default ImageLinkFormTop
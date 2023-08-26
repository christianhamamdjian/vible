import React from 'react'
import { MoodboardContext } from "../../context/moodboardContext"

const ImageFormTop = () => {
    const { items, editingImage, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward, } = React.useContext(MoodboardContext)
    return (
        <>
            {editingImage && items.length > 0 &&
                <>
                    <div className='inputs-top_objects' >
                        {/* <label>Change width:</label>
                        <input
                            type="number"
                            min="10"
                            // max="100"
                            value={editingImage && Math.floor(items.find(item => item.id === editingImage.id).width)}
                            onChange={(e) => handleItemChange(e, editingImage.id, "width")}
                        /> */}
                        <label>Change width:</label>
                        <input
                            type="range"
                            min="2"
                            max="100"
                            step="10"
                            name="width"
                            value={editingImage && Math.floor(items.find(item => item.id === editingImage.id).width)}
                            onChange={(e) => handleItemChange(e, editingImage.id, "width")
                            } />
                        <label>Change Angle:</label>
                        <input
                            type="range"
                            min="-180"
                            max="180"
                            step="1"
                            name="angle"
                            value={editingImage && items.find(item => item.id === editingImage.id).angle}
                            onChange={(e) => handleItemChange(e, editingImage.id, "angle")
                            } />
                        <label>Change Opacity:</label>
                        <input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.1"
                            name="opacity"
                            value={editingImage && items.find(item => item.id === editingImage.id).opacity}
                            onChange={(e) => handleItemChange(e, editingImage.id, "opacity")}
                        />

                        <label>Move:</label>
                        <button
                            onClick={() => handleMoveItemToBack(editingImage.id)}>
                            <div style={{ transform: "rotate(90deg)" }}>&gt;&gt;</div>
                        </button>
                        <button
                            onClick={() => handleMoveItemToFront(editingImage.id)}>
                            <div style={{ transform: "rotate(90deg)" }}>&lt;&lt;</div>
                        </button>
                        <button
                            onClick={() => handleMoveItemBackward(editingImage.id)}>
                            <div style={{ transform: "rotate(90deg)" }}>&gt;</div>
                        </button>
                        <button
                            onClick={() => handleMoveItemForward(editingImage.id)}>
                            <div style={{ transform: "rotate(90deg)" }}>&lt;</div>
                        </button>
                    </div>
                </>
            } </>
    )
}
export default ImageFormTop
import React from 'react'
import TopButtonsSlider from "../helperFunctions/TopButtonsSlider"
import { MoodboardContext } from "../../context/moodboardContext"

const ImageLinkFormTop = () => {
    const { items, editingImageLink, tool, changeTool, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward } = React.useContext(MoodboardContext)

    const toolButtons = {
        width: "Width",
        angle: "Angle",
        opacity: "Opacity",
        order: "Order",
        crop: "Crop",
        roundCorners: "Round corners"
    }

    return (
        <>
            {editingImageLink && items.length > 0 && (
                <>
                    <div className='inputs-top_objects' >
                        <TopButtonsSlider toolButtons={toolButtons} changeTool={changeTool} />
                    </div>
                    {tool !== "" && <div className='inputs-top_objects' >
                        {tool === "width" && <>
                            <label>Change width:</label>
                            <input
                                type="range"
                                min="50"
                                max="600"
                                step="10"
                                name="width"
                                value={editingImageLink && Math.floor(items.find(item => item.id === editingImageLink.id).width)}
                                onChange={(event) => handleItemChange(event, editingImageLink.id, "width")
                                } />
                        </>}
                        {tool === "angle" && <>
                            <label>Change Angle:</label>
                            <input
                                type="range"
                                min="-180"
                                max="180"
                                step="1"
                                name="angle"
                                value={editingImageLink && items.find(item => item.id === editingImageLink.id).angle}
                                onChange={(event) => handleItemChange(event, editingImageLink.id, "angle")
                                } />
                        </>}
                        {tool === "opacity" && <>
                            <label>Change Opacity:</label>
                            <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.1"
                                name="opacity"
                                value={editingImageLink && items.find(item => item.id === editingImageLink.id).opacity}
                                onChange={(e) => handleItemChange(e, editingImageLink.id, "opacity")}
                            />
                        </>}
                        {tool === "crop" && <>
                            <label>Crop width:</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                name="cropWidth"
                                value={editingImageLink && items.find(item => item.id === editingImageLink.id).cropWidth}
                                onChange={(e) => handleItemChange(e, editingImageLink.id, "cropWidth")}
                            />
                        </>}
                        {tool === "crop" && <>
                            <label>Crop height:</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                name="cropHeight"
                                value={editingImageLink && items.find(item => item.id === editingImageLink.id).cropHeight}
                                onChange={(e) => handleItemChange(e, editingImageLink.id, "cropHeight")}
                            />
                        </>}
                        {tool === "roundCorners" && <>
                            <label>Round corners:</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                name="roundCorners"
                                value={editingImageLink && items.find(item => item.id === editingImageLink.id).roundCorners}
                                onChange={(e) => handleItemChange(e, editingImageLink.id, "roundCorners")}
                            />
                        </>}
                        {tool === "order" && <>
                            <label>Order:</label>
                            <button
                                onClick={() => handleMoveItemToBack(editingImageLink.id)}>
                                <div className='move-item'
                                >&gt;&gt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveItemToFront(editingImageLink.id)}>
                                <div className='move-item'
                                >&lt;&lt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveItemBackward(editingImageLink.id)}>
                                <div className='move-item'
                                >&gt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveItemForward(editingImageLink.id)}>
                                <div className='move-item'
                                >&lt;</div>
                            </button>
                        </>}
                    </div>}
                </>
            )
            }
        </>
    )
}
export default ImageLinkFormTop
import React from 'react'
import TopButtonsSlider from "../helpers/TopButtonsSlider"
import { MoodboardContext } from "../../context/moodboardContext"

const ImageLinkFormTop = () => {
    const { editingImage, tool, changeTool, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward } = React.useContext(MoodboardContext)

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
            {editingImage && items.length > 0 && (
                <>
                    <div className='inputs-top_objects' >
                        <TopButtonsSlider toolButtons={toolButtons} changeTool={changeTool} />
                    </div>
                    {tool !== "" && <div className='inputs-top_objects' >
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
                        {tool === "width" && <>
                            <label>Change width:</label>
                            <input
                                type="range"
                                min="50"
                                max="600"
                                step="10"
                                name="width"
                                value={editingImage && Math.floor(items.find(item => item.id === editingImage.id).width)}
                                onChange={(event) => handleItemChange(event, editingImage.id, "width")
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
                                value={editingImage && items.find(item => item.id === editingImage.id).angle}
                                onChange={(event) => handleItemChange(event, editingImage.id, "angle")
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
                                value={editingImage && items.find(item => item.id === editingImage.id).opacity}
                                onChange={(e) => handleItemChange(e, editingImage.id, "opacity")}
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
                                value={editingImage && items.find(item => item.id === editingImage.id).cropWidth}
                                onChange={(e) => handleItemChange(e, editingImage.id, "cropWidth")}
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
                                value={editingImage && items.find(item => item.id === editingImage.id).cropHeight}
                                onChange={(e) => handleItemChange(e, editingImage.id, "cropHeight")}
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
                                value={editingImage && items.find(item => item.id === editingImage.id).roundCorners}
                                onChange={(e) => handleItemChange(e, editingImage.id, "roundCorners")}
                            />
                        </>}
                        {tool === "order" && <>
                            <label>Order:</label>
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
                        </>}
                    </div>}
                </>
            )
            }
        </>
    )
}
export default ImageLinkFormTop
import React from 'react'
import TopButtonsSlider from "../helperComponents/TopButtonsSlider"
import Order from "../helperComponents/Order"
import { isSafari } from "../utils/browserDetector"
import { MoodboardContext } from "../../context/moodboardContext"

const ImageFormTop = () => {
    const { items, editingImage, tool, changeTool, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward, } = React.useContext(MoodboardContext)

    const toolButtons = {
        width: "Width",
        angle: "Angle",
        cropWidth: "Crop Width",
        cropHeight: "Crop Height",
        opacity: "Opacity",
        order: "Order",
        roundCorners: "Round corners"
    }

    return (
        <>
            {editingImage && items.length > 0 &&
                <>
                    <div className='inputs-top_objects' >
                        <TopButtonsSlider toolButtons={toolButtons} changeTool={changeTool} />
                    </div>
                    {tool !== "" && <div className='inputs-top_objects-form' >
                        {tool === "width" && <>
                            <label>Change width:</label>
                            <input
                                type="range"
                                min="50"
                                max="600"
                                step="10"
                                name="width"
                                value={editingImage && Math.floor(items.find(item => item.id === editingImage.id).width)}
                                onChange={(e) => handleItemChange(e, editingImage.id, "width")
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
                                onChange={(e) => handleItemChange(e, editingImage.id, "angle")
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
                        {tool === "cropHeight" && <>
                            <label>Crop Top:</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                name="cropTop"
                                value={editingImage && items.find(item => item.id === editingImage.id).cropTop}
                                onChange={(e) => handleItemChange(e, editingImage.id, "cropTop")}
                            />
                        </>}
                        {tool === "cropWidth" && <>
                            <label>Crop Right:</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                name="cropRight"
                                value={editingImage && items.find(item => item.id === editingImage.id).cropRight}
                                onChange={(e) => handleItemChange(e, editingImage.id, "cropRight")}
                            />
                        </>}
                        {tool === "cropHeight" && <>
                            <label>Crop Bottom:</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                name="cropBottom"
                                value={editingImage && items.find(item => item.id === editingImage.id).cropBottom}
                                onChange={(e) => handleItemChange(e, editingImage.id, "cropBottom")}
                            />
                        </>}
                        {tool === "cropWidth" && <>
                            <label>Crop Left:</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                name="cropLeft"
                                value={editingImage && items.find(item => item.id === editingImage.id).cropLeft}
                                onChange={(e) => handleItemChange(e, editingImage.id, "cropLeft")}
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
                        {tool === "order" &&
                            <>
                                <Order
                                    id={editingImage.id}
                                    handleMoveToFront={handleMoveItemToFront}
                                    handleMoveToBack={handleMoveItemToBack}
                                    handleMoveForward={handleMoveItemForward}
                                    handleMoveBackward={handleMoveItemBackward}
                                />
                            </>
                        }
                    </div>}
                </>
            } </>
    )
}
export default ImageFormTop
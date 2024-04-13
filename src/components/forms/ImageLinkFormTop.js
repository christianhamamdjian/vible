import React from 'react'
import TopButtonsSlider from "../helperComponents/TopButtonsSlider"
import Order from "../helperComponents/Order"
import { isSafari } from "../utils/browserDetector"
import { MoodboardContext } from "../../context/moodboardContext"

const ImageLinkFormTop = () => {
    const { items, editingImageLink, tool, changeTool, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward } = React.useContext(MoodboardContext)

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
            {editingImageLink && items.length > 0 &&
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
                        {tool === "cropHeight" && <>
                            <label>Crop Top:</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                name="cropTop"
                                value={editingImageLink && items.find(item => item.id === editingImageLink.id).cropTop}
                                onChange={(e) => handleItemChange(e, editingImageLink.id, "cropTop")}
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
                                value={editingImageLink && items.find(item => item.id === editingImageLink.id).cropRight}
                                onChange={(e) => handleItemChange(e, editingImageLink.id, "cropRight")}
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
                                value={editingImageLink && items.find(item => item.id === editingImageLink.id).cropBottom}
                                onChange={(e) => handleItemChange(e, editingImageLink.id, "cropBottom")}
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
                                value={editingImageLink && items.find(item => item.id === editingImageLink.id).cropLeft}
                                onChange={(e) => handleItemChange(e, editingImageLink.id, "cropLeft")}
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
                        {tool === "order" &&
                            <>
                                <Order
                                    id={editingImageLink.id}
                                    handleMoveToFront={handleMoveItemToFront}
                                    handleMoveToBack={handleMoveItemToBack}
                                    handleMoveForward={handleMoveItemForward}
                                    handleMoveBackward={handleMoveItemBackward}
                                />
                            </>
                        }
                    </div>}
                </>
            }
        </>
    )
}
export default ImageLinkFormTop
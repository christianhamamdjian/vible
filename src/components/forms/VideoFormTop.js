import React from 'react'
import TopButtonsSlider from "../helperComponents/TopButtonsSlider"
import Order from "../helperComponents/Order"
import { MoodboardContext } from "../../context/moodboardContext"

const VideoFormTop = () => {
    const { items, editingVideo, tool, changeTool, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward } = React.useContext(MoodboardContext)

    const toolButtons = {
        width: "Width",
        height: "Height",
        angle: "Angle",
        opacity: "Opacity",
        order: "Order"
    }

    return (
        <>
            {editingVideo && items.length > 0 && (
                <>
                    <div className='inputs-top_objects' >
                        <TopButtonsSlider toolButtons={toolButtons} changeTool={changeTool} />
                    </div>
                    {tool !== "" && <div className='inputs-top_objects-form' >
                        {tool === "width" && <>
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
                        </>}
                        {tool === "height" && <>
                            <label>Change height:</label>
                            <input
                                type="range"
                                min="60"
                                max="600"
                                step="10"
                                name="width"
                                value={editingVideo && items.find(item => item.id === editingVideo.id).width * 3 / 4}
                                onChange={(event) => handleItemChange(event, editingVideo.id, "width")
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
                                value={editingVideo && items.find(item => item.id === editingVideo.id).angle}
                                onChange={(event) => handleItemChange(event, editingVideo.id, "angle")
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
                                value={editingVideo && items.find(item => item.id === editingVideo.id).opacity}
                                onChange={(e) => handleItemChange(e, editingVideo.id, "opacity")}
                            />
                        </>}
                        {tool === "order" &&
                            <>
                                <Order
                                    id={editingVideo.id}
                                    handleMoveToFront={handleMoveItemToFront}
                                    handleMoveToBack={handleMoveItemToBack}
                                    handleMoveForward={handleMoveItemForward}
                                    handleMoveBackward={handleMoveItemBackward}
                                />
                            </>
                        }
                    </div>}
                </>
            )
            }
        </>
    )
}
export default VideoFormTop
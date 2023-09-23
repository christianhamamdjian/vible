import React, { useState } from 'react'
import TopButtonsSlider from "../helperComponents/TopButtonsSlider"
import Order from "../helperComponents/Order"
import { MoodboardContext } from "../../context/moodboardContext"

const PdfFormTop = () => {
    const { items, editingPdf, tool, changeTool, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward } = React.useContext(MoodboardContext)

    const toolButtons = {
        width: "Width",
        height: "Height",
        angle: "Angle",
        opacity: "Opacity",
        order: "Order"
    }

    return (
        <>
            {editingPdf && items.length > 0 && (
                <>
                    <div className='inputs-top_objects' >
                        <TopButtonsSlider toolButtons={toolButtons} changeTool={changeTool} />
                    </div>
                    {tool !== "" && <div className='inputs-top_objects' >
                        {tool === "width" && <>
                            <label>Change width:</label>
                            <input
                                type="range"
                                min="100"
                                max="600"
                                step="10"
                                name="width"
                                value={editingPdf && items.find(item => item.id === editingPdf.id).width}
                                onChange={(event) => handleItemChange(event, editingPdf.id, "width")
                                } />
                        </>}
                        {tool === "height" && <>
                            <label>Change height:</label>
                            <input
                                type="range"
                                min="60"
                                max="600"
                                step="10"
                                name="height"
                                value={editingPdf && items.find(item => item.id === editingPdf.id).height}
                                onChange={(event) => handleItemChange(event, editingPdf.id, "height")
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
                                value={editingPdf && items.find(item => item.id === editingPdf.id).angle}
                                onChange={(event) => handleItemChange(event, editingPdf.id, "angle")
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
                                value={editingPdf && items.find(item => item.id === editingPdf.id).opacity}
                                onChange={(e) => handleItemChange(e, editingPdf.id, "opacity")}
                            />
                        </>}
                        {tool === "order" &&
                            <>
                                <Order
                                    id={editingPdf.id}
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

export default PdfFormTop
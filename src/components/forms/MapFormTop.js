import React, { useState } from 'react'
import TopButtonsSlider from "../helperFunctions/TopButtonsSlider"
import { MoodboardContext } from "../../context/moodboardContext"

const MapFormTop = () => {
    const { items, editingMap, tool, changeTool, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward } = React.useContext(MoodboardContext)

    const toolButtons = {
        width: "Width",
        height: "Height",
        angle: "Angle",
        opacity: "Opacity",
        order: "Order"
    }

    return (
        <>
            {editingMap && items.length > 0 && (
                <>
                    <div className='inputs-top_objects' >
                        <TopButtonsSlider toolButtons={toolButtons} changeTool={changeTool} />
                    </div>
                    <div className='inputs-top_objects' >
                        {tool === "width" && <>
                            <label>Change width:</label>
                            <input
                                type="range"
                                min="100"
                                max="600"
                                step="10"
                                name="width"
                                value={editingMap && items.find(item => item.id === editingMap.id).width}
                                onChange={(event) => handleItemChange(event, editingMap.id, "width")
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
                                value={editingMap && items.find(item => item.id === editingMap.id).height}
                                onChange={(event) => handleItemChange(event, editingMap.id, "height")
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
                                value={editingMap && items.find(item => item.id === editingMap.id).angle}
                                onChange={(event) => handleItemChange(event, editingMap.id, "angle")
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
                                value={editingMap && items.find(item => item.id === editingMap.id).opacity}
                                onChange={(e) => handleItemChange(e, editingMap.id, "opacity")}
                            />
                        </>}
                        {tool === "order" && <>
                            <label>Move:</label>
                            <button
                                onClick={() => handleMoveItemToBack(editingMap.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&gt;&gt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveItemToFront(editingMap.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&lt;&lt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveItemBackward(editingMap.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&gt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveItemForward(editingMap.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&lt;</div>
                            </button>
                        </>}
                    </div>
                </>
            )
            }
        </>
    )
}
export default MapFormTop
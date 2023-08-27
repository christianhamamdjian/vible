import React, { useState } from 'react'
import { MoodboardContext } from "../../context/moodboardContext"

const MapFormTop = () => {
    const { items, editingMap, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward } = React.useContext(MoodboardContext)
    const [tool, setTool] = useState("")
    const toolButtons = {
        width: "Width",
        angle: "Angle",
        opacity: "Opacity",
        order: "Order"
    }
    return (
        <>
            {editingMap && items.length > 0 && (
                <>
                    <div className='inputs-top_objects' >
                        {Object.entries(toolButtons).map((el, i) => {
                            return (<button key={i} onClick={() => setTool(el[0])}>{el[1]}</button>)
                        })}
                    </div>
                    <div className='inputs-top_objects' >
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
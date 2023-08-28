import React, { useState } from 'react'
import { MoodboardContext } from "../../context/moodboardContext"

const PdfFormTop = () => {
    const { items, editingPdf, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward } = React.useContext(MoodboardContext)
    const [tool, setTool] = useState("")
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
                        {Object.entries(toolButtons).map((el, i) => {
                            return (<button key={i} onClick={() => setTool(el[0])}>{el[1]}</button>)
                        })}
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
                        {tool === "order" && <>
                            <label>Move:</label>
                            <button
                                onClick={() => handleMoveItemToBack(editingPdf.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&gt;&gt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveItemToFront(editingPdf.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&lt;&lt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveItemBackward(editingPdf.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&gt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveItemForward(editingPdf.id)}>
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

export default PdfFormTop
import React from 'react'
import { MoodboardContext } from "../../context/moodboardContext"

const PdfFormTop = () => {
    const { items, editingPdf, handleItemChange } = React.useContext(MoodboardContext)

    return (
        <>
            {editingPdf && items.length > 0 && (
                <>
                    <div className='inputs-top_objects' >
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
                    </div>
                </>
            )
            }
        </>
    )
}

export default PdfFormTop
import React from 'react'
import { MoodboardContext } from "../../context/moodboardContext"

const MapFormTop = () => {
    const { items, map, editingMap, handleItemChange } = React.useContext(MoodboardContext)
    return (
        <>
            {map && items.length > 0 && (
                <>
                    <div className='inputs-top_objects' >
                        <label>Change Link:</label>
                        <input
                            type="text"
                            name="url"
                            value={editingMap && items.find(item => item.id === editingMap.id).url}
                            onChange={(event) => handleItemChange(event, editingMap.id, "link")
                            } />
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
                    </div>
                </>
            )
            }
        </>
    )
}
export default MapFormTop
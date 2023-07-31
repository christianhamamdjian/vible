import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const BoxFormTop = () => {
    const { items, editingText, write, isEditingBoard, handleItemChange } = React.useContext(MoodboardContext);
    const findItem = (term) => {
        return items.find(item => item.id === editingText.id)[`${term}`]
    }
    return (
        <>
            {items.length > 0 && editingText && editingText.id && isEditingBoard && write && (
                <>
                    <div className='inputs-top_objects' >
                        <label>Change text:</label>
                        <textarea
                            value={findItem("text")}
                            onChange={(event) => handleItemChange(event, editingText.id, "text")
                            }
                        />
                        <label>Change color:</label>
                        <input
                            type="color"
                            name="color"
                            value={findItem("color")}
                            onChange={(event) => handleItemChange(event, editingText.id, "color")
                            } />
                        <label>Change link:</label>
                        <input
                            type="text"
                            name="link"
                            value={findItem("link")}
                            onChange={(event) => handleItemChange(event, editingText.id, "link")
                            } />

                        <label>Change url:</label>
                        <input
                            type="text"
                            name="url"
                            value={findItem("url")}
                            onChange={(event) => handleItemChange(event, editingText.id, "url")
                            } />
                        <label>Change width:</label>
                        <input
                            type="range"
                            min="100"
                            max="600"
                            step="10"
                            name="width"
                            value={items.find(item => item.id === editingText.id).width}
                            onChange={(event) => handleItemChange(event, editingText.id, "width")
                            } />
                        <label>Change height:</label>
                        <input
                            type="range"
                            min="60"
                            max="600"
                            step="10"
                            name="height"
                            value={items.find(item => item.id === editingText.id).height}
                            onChange={(event) => handleItemChange(event, editingText.id, "height")
                            } />
                        <label>Change Angle:</label>
                        <input
                            type="range"
                            min="-180"
                            max="180"
                            step="1"
                            name="angle"
                            value={items.find(item => item.id === editingText.id).angle}
                            onChange={(event) => handleItemChange(event, editingText.id, "angle")
                            } />
                    </div>
                </>)
            }
        </>)
}
export default BoxFormTop
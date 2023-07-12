import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const BoxFormTop = () => {
    const { items, editingText, isEditingBoard, handleItemChange } = React.useContext(MoodboardContext);

    return (
        <>
            {items.length > 0 && editingText && editingText.id && isEditingBoard && (
                <>
                    <div className='inputs-top_objects' style={{ width: "60%", margin: "0 auto" }}>
                        <label>Change text:</label>
                        <textarea
                            value={items.find(item => item.id === editingText.id).text}
                            onChange={(event) => handleItemChange(event, editingText.id, "text")
                            }
                        />
                        <label>Change color:</label>
                        <input
                            type="color"
                            name="color"
                            value={items.find(item => item.id === editingText.id).color}
                            onChange={(event) => handleItemChange(event, editingText.id, "color")
                            } />
                        <label>Change link:</label>
                        <input
                            type="text"
                            name="link"
                            value={items.find(item => item.id === editingText.id).link}
                            onChange={(event) => handleItemChange(event, editingText.id, "link")
                            } />

                        <label>Change url:</label>
                        <input
                            type="text"
                            name="url"
                            value={items.find(item => item.id === editingText.id).url}
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
import React, { useState } from 'react'
// import FontSelector from '../utils/FontSelector';
import { MoodboardContext } from "../../context/moodboardContext";

const BoxFormTop = () => {
    const { items, editingText, write, isEditingBoard, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward, } = React.useContext(MoodboardContext);
    const [selectedFont, setSelectedFont] = useState('Roboto');
    const fontOptions = [
        { value: 'Roboto', label: 'Roboto' },
        { value: 'Open Sans', label: 'Open Sans' },
        { value: 'Lato', label: 'Lato' },
        { value: 'Playfair', label: 'Playfair' },
        { value: 'Poppins', label: 'Poppins' },

        // Add more font options as needed
    ];

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
                            onChange={(event) => handleItemChange(event, editingText.id, "text")}
                        />
                        <label>Change color:</label>
                        <input
                            type="color"
                            name="color"
                            value={findItem("color")}
                            onChange={(event) => handleItemChange(event, editingText.id, "color")}
                        />
                        <label>Change link:</label>
                        <input
                            type="text"
                            name="link"
                            value={findItem("link")}
                            onChange={(event) => handleItemChange(event, editingText.id, "link")}
                        />

                        <label>Change url:</label>
                        <input
                            type="text"
                            name="url"
                            value={findItem("url")}
                            onChange={(event) => handleItemChange(event, editingText.id, "url")}
                        />
                        <label>Change width:</label>
                        <input
                            type="range"
                            min="100"
                            max="600"
                            step="10"
                            name="width"
                            value={items.find(item => item.id === editingText.id).width}
                            onChange={(event) => handleItemChange(event, editingText.id, "width")}
                        />
                        <label>Change height:</label>
                        <input
                            type="range"
                            min="60"
                            max="600"
                            step="10"
                            name="height"
                            value={items.find(item => item.id === editingText.id).height}
                            onChange={(event) => handleItemChange(event, editingText.id, "height")}
                        />
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
                        <div>
                            <h1>Font Selector</h1>
                            <select
                                style={{ fontSize: "1rem" }}
                                value={selectedFont}
                                onChange={(event) => handleItemChange(event, editingText.id, "font")}
                            >
                                {fontOptions.map((option) => (
                                    <option style={{ fontSize: "2rem", fontFamily: selectedFont, minHeight: '200px', width: '100%', padding: '10px' }} key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='item-edit-form'>
                            <label>Move:</label>
                            <button
                                onClick={() => handleMoveItemToBack(editingText.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&gt;&gt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveItemToFront(editingText.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&lt;&lt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveItemBackward(editingText.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&gt;</div>
                            </button>
                            <button
                                onClick={() => handleMoveItemForward(editingText.id)}>
                                <div style={{ transform: "rotate(90deg)" }}>&lt;</div>
                            </button>
                        </div>
                    </div>
                </>)
            }
        </>)
}
export default BoxFormTop
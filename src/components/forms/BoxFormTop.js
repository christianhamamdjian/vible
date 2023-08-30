import React, { useState, useEffect } from 'react'
// import FontSelector from '../utils/FontSelector';
import TopButtonsSlider from "../helpers/TopButtonsSlider"
import { MoodboardContext } from "../../context/moodboardContext";

const BoxFormTop = () => {
    const { items, editingText, tool, changeTool, write, isEditingBoard, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward, } = React.useContext(MoodboardContext);

    const [selectedFont, setSelectedFont] = useState('Roboto');

    const toolButtons = {
        text: "Text",
        color: "Color",
        linktitle: "Link Title",
        linkurl: "Link Url",
        width: "Width",
        height: "Height",
        angle: "Angle",
        font: "Font",
        fontSize: "Font size",
        fontStyle: "Font style",
        move: "Move",
        rating: "Rating",
        border: "Border",
        roundedCorners: "Rounded corners"
    }

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
                        <TopButtonsSlider toolButtons={toolButtons} changeTool={changeTool} />
                    </div>
                    <div className='inputs-top_objects' >
                        {tool === "text" && <>
                            <label>Text:</label>
                            <textarea
                                value={findItem("text")}
                                onChange={(e) => handleItemChange(e, editingText.id, "text")}
                            />
                        </>}
                        {tool === "color" && <>
                            <label>Color:</label>
                            <input
                                type="color"
                                name="color"
                                value={findItem("color")}
                                onChange={(e) => handleItemChange(e, editingText.id, "color")}
                            />
                        </>}
                        {tool === "linktitle" && <>
                            <label>Link:</label>
                            <input
                                type="text"
                                name="link"
                                value={findItem("link")}
                                onChange={(e) => handleItemChange(e, editingText.id, "link")}
                            />
                        </>}
                        {tool === "linkurl" && <>
                            <label>Url:</label>
                            <input
                                type="text"
                                name="url"
                                value={findItem("url")}
                                onChange={(e) => handleItemChange(e, editingText.id, "url")}
                            />
                        </>}
                        {tool === "width" && <>
                            <label>Width:</label>
                            <input
                                type="range"
                                min="100"
                                max="600"
                                step="10"
                                name="width"
                                value={items.find(item => item.id === editingText.id).width}
                                onChange={(e) => handleItemChange(e, editingText.id, "width")}
                            />
                        </>}
                        {tool === "height" && <>
                            <label>Height:</label>
                            <input
                                type="range"
                                min="60"
                                max="600"
                                step="10"
                                name="height"
                                value={items.find(item => item.id === editingText.id).height}
                                onChange={(e) => handleItemChange(e, editingText.id, "height")}
                            />
                        </>}
                        {tool === "angle" && <>
                            <label>Angle:</label>
                            <input
                                type="range"
                                min="-180"
                                max="180"
                                step="1"
                                name="angle"
                                value={items.find(item => item.id === editingText.id).angle}
                                onChange={(e) => handleItemChange(e, editingText.id, "angle")}
                            />
                        </>}
                        {tool === "font" && <><div>
                            <h1>Font</h1>
                            <select
                                style={{ fontSize: "1rem" }}
                                value={selectedFont}
                                onChange={(e) => handleItemChange(e, editingText.id, "font")}
                            >
                                {fontOptions.map((option) => (
                                    <option style={{ fontSize: "2rem", fontFamily: selectedFont, minHeight: '200px', width: '100%', padding: '10px' }} key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        </>}
                        {tool === "fontSize" && <>
                            <label>Font size:</label>
                            <input
                                type="range"
                                min="8"
                                max="72"
                                step="4"
                                name="fontSize"
                                value={items.find(item => item.id === editingText.id).fontSize}
                                onChange={(e) => handleItemChange(e, editingText.id, "fontSize")}
                            />
                        </>}
                        {tool === "fontStyle" &&
                            <label className='checkbox-container'>Font style:
                                <input
                                    type="checkbox"
                                    className='input-line-closed'
                                    value={items.find(item => item.id === editingText.id).fontStyle}
                                    checked={items.find(item => item.id === editingText.id).fontStyle}
                                    onChange={(e) => handleItemChange(e, editingText.id, "fontStyle")} />
                                <span className="checkmark"></span>
                            </label>}
                        {tool === "roundedCorners" && <>
                            <label>Rounded corners:</label>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                step="1"
                                name="roundedCorners"
                                value={items.find(item => item.id === editingText.id).roundedCorners}
                                onChange={(e) => handleItemChange(e, editingText.id, "roundedCorners")}
                            />
                        </>}
                        {tool === "move" && <>
                            <div className='item-edit-form' style={{ display: "flex" }}>
                                <label>Order:</label>
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
                        </>}
                        {tool === "rating" &&
                            <label className='checkbox-container'>Rating:
                                <input
                                    type="checkbox"
                                    className='input-line-closed'
                                    value={items.find(item => item.id === editingText.id).showRating}
                                    checked={items.find(item => item.id === editingText.id).showRating}
                                    onChange={(e) => handleItemChange(e, editingText.id, "showRating")} />
                                <span className="checkmark"></span>
                            </label>}
                        {tool === "border" &&
                            <label className='checkbox-container'>Border:
                                <input
                                    type="checkbox"
                                    className='input-line-closed'
                                    value={items.find(item => item.id === editingText.id).border}
                                    checked={items.find(item => item.id === editingText.id).border}
                                    onChange={(e) => handleItemChange(e, editingText.id, "showBorder")} />
                                <span className="checkmark"></span>
                            </label>}
                    </div>
                </>)
            }
        </>)
}
export default BoxFormTop
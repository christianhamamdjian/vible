import React, { useState, useEffect } from 'react'
// import FontSelector from '../utils/FontSelector';
import { MoodboardContext } from "../../context/moodboardContext";

const BoxFormTop = () => {
    const { items, editingText, write, isEditingBoard, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward, } = React.useContext(MoodboardContext);

    const [selectedFont, setSelectedFont] = useState('Roboto');
    const [tool, setTool] = useState("")

    const toolButtons = {
        text: "Text",
        color: "Color",
        linktitle: "Link Title",
        linkurl: "Link Url",
        width: "Width",
        height: "Height",
        angle: "Angle",
        font: "Font",
        move: "Move",
        rating: "Rating",
        border: "Border"
    }

    const fontOptions = [
        { value: 'Roboto', label: 'Roboto' },
        { value: 'Open Sans', label: 'Open Sans' },
        { value: 'Lato', label: 'Lato' },
        { value: 'Playfair', label: 'Playfair' },
        { value: 'Poppins', label: 'Poppins' },

        // Add more font options as needed
    ];

    const allButtons = Object.entries(toolButtons)
    const [buttons, setButtons] = useState(allButtons);
    const [index, setIndex] = useState(0);

    const chunkArray = (arr, size) =>
        arr.length > size
            ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
            : [arr];

    const chunk = (<div>
        {chunkArray(buttons, 4)[index].map((el, i) => {
            return (<button key={i} onClick={() => setTool(el[0])}>{el[1]}</button>)
        })}
    </div>)

    const maxIndex = chunkArray(buttons, 4).length - 1

    const findItem = (term) => {
        return items.find(item => item.id === editingText.id)[`${term}`]
    }

    return (
        <>
            {items.length > 0 && editingText && editingText.id && isEditingBoard && write && (
                <>
                    <div className='inputs-top_objects' >
                        <button style={{ backgroundColor: "#ffffff", color: "#cccccc", border: "1px solid #cccccc" }}
                            onClick={() => setIndex(index - 1)}
                            className="prev"
                            disabled={index === 0}
                        >&lt;</button>
                        {chunk}
                        <button
                            style={{ backgroundColor: "#ffffff", color: "#cccccc", border: "1px solid #cccccc" }}
                            onClick={() => setIndex(index + 1)}
                            className="next"
                            disabled={index === maxIndex}
                        >&gt;</button>
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
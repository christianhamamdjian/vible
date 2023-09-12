import React, { useState, useEffect } from 'react'
import TopButtonsSlider from "../helperFunctions/TopButtonsSlider"
import { fontOptions } from "../helperFunctions/fontOptions"
import { MoodboardContext } from "../../context/moodboardContext";

const BoxFormTop = () => {
    const { items, editingText, tool, changeTool, write, isEditingBoard, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward, handleDuplicateBox, handleCopy } = React.useContext(MoodboardContext);

    const toolButtons = {
        text: "Text",
        BoxColor: "Box color",
        textColor: "Text Color", // color
        // textAlignLeft: "Text align left", // boolean
        textAlignCenter: "Text align center", // boolean
        linktitle: "Link Title",
        linkurl: "Link Url",
        width: "Width",
        height: "Height",
        angle: "Angle",
        font: "Font",
        fontSize: "Font size",
        fontStyle: "Font style",
        order: "Order",
        duplicate: "Duplicate",
        rating: "Rating",
        // border: "Border",
        // borderWidth 0 replaces border
        borderWidth: "Border width", // range
        borderColor: "Border color", // color
        backgroundOpacity: "Background opacity", // range
        roundedCorners: "Rounded corners",
        copy: "Copy"
    }

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
                    {tool !== "" && <div className='inputs-top_objects' >
                        {tool === "text" && <>
                            <label>Text:</label>
                            <textarea
                                value={findItem("text")}
                                onChange={(e) => handleItemChange(e, editingText.id, "text")}
                            />
                        </>}
                        {tool === "BoxColor" && <>
                            <label>Box color:</label>
                            <input
                                type="color"
                                name="color"
                                value={findItem("color")}
                                onChange={(e) => handleItemChange(e, editingText.id, "color")}
                            />
                        </>}
                        {tool === "textColor" && <>
                            <label>Text Color:</label>
                            <input
                                type="color"
                                name="color"
                                value={findItem("textColor")}
                                onChange={(e) => handleItemChange(e, editingText.id, "textColor")}
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
                            <label htmlFor="fonts">Choose a font:</label>
                            <select
                                name="fonts"
                                id="fonts"
                                style={{ fontSize: "1rem" }}
                                value={items.find(item => item.id === editingText.id).font}
                                onChange={(e) => handleItemChange(e, editingText.id, "font")}
                            >
                                {fontOptions.map((option) => (
                                    <option
                                        style={{ fontSize: "2rem", fontFamily: `${option.value}`, minHeight: '200px', width: '100%', padding: '10px' }}
                                        key={option.value}
                                        value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <span style={{ fontSize: "2rem", fontFamily: `${items.find(item => item.id === editingText.id).font}` }}> {items.find(item => item.id === editingText.id).font}</span>
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
                            <label className='checkbox-container'>Font Bold
                                <input
                                    type="checkbox"
                                    className='input-line-closed'
                                    value={items.find(item => item.id === editingText.id).fontStyle}
                                    checked={items.find(item => item.id === editingText.id).fontStyle}
                                    onChange={(e) => handleItemChange(e, editingText.id, "fontStyle")} />
                                <span className="checkmark"></span>
                            </label>}
                        {/* {tool === "textAlignLeft" &&
                            <label className='checkbox-container'>Text align left
                                <input
                                    type="checkbox"
                                    className='input-line-closed'
                                    value={items.find(item => item.id === editingText.id).textAlignLeft}
                                    checked={items.find(item => item.id === editingText.id).textAlignLeft}
                                    onChange={(e) => handleItemChange(e, editingText.id, "textAlignLeft")} />
                                <span className="checkmark"></span>
                            </label>} */}
                        {tool === "textAlignCenter" &&
                            <label className='checkbox-container'>Text align center
                                <input
                                    type="checkbox"
                                    className='input-line-closed'
                                    value={items.find(item => item.id === editingText.id).textAlignCenter}
                                    checked={items.find(item => item.id === editingText.id).textAlignCenter}
                                    onChange={(e) => handleItemChange(e, editingText.id, "textAlignCenter")} />
                                <span className="checkmark"></span>
                            </label>}
                        {tool === "roundedCorners" && <>
                            <label>Rounded corners:</label>
                            <input
                                type="range"
                                min="0"
                                max="55"
                                step="1"
                                name="roundedCorners"
                                value={items.find(item => item.id === editingText.id).roundedCorners}
                                onChange={(e) => handleItemChange(e, editingText.id, "roundedCorners")}
                            />
                        </>}
                        {tool === "order" && <>
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
                        {tool === "duplicate" && <div className='item-edit-form'>
                            <label>Duplicate:</label>
                            <button
                                onClick={() => handleDuplicateBox(editingText.id)}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5 5H15V8H8V15H5V5Z" fill="currentColor" />
                                    <path d="M19 9H9V19H19V9Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>}
                        {tool === "rating" &&
                            <label className='checkbox-container'>Rating
                                <input
                                    type="checkbox"
                                    className='input-line-closed'
                                    value={items.find(item => item.id === editingText.id).showRating}
                                    checked={items.find(item => item.id === editingText.id).showRating}
                                    onChange={(e) => handleItemChange(e, editingText.id, "showRating")} />
                                <span className="checkmark"></span>
                            </label>}
                        {/* {tool === "border" &&
                            <label className='checkbox-container'>Border
                                <input
                                    type="checkbox"
                                    className='input-line-closed'
                                    value={items.find(item => item.id === editingText.id).border}
                                    checked={items.find(item => item.id === editingText.id).border}
                                    onChange={(e) => handleItemChange(e, editingText.id, "showBorder")} />
                                <span className="checkmark"></span>
                            </label>} */}
                        {tool === "borderWidth" && <>
                            <label>Border width:</label>
                            <input
                                type="range"
                                min="0"
                                max="55"
                                step="1"
                                name="borderWidth"
                                value={items.find(item => item.id === editingText.id).borderWidth}
                                onChange={(e) => handleItemChange(e, editingText.id, "borderWidth")}
                            />
                        </>}
                        {tool === "borderColor" && <>
                            <label>Border color:</label>
                            <input
                                type="color"
                                name="color"
                                value={findItem("borderColor")}
                                onChange={(e) => handleItemChange(e, editingText.id, "borderColor")}
                            />
                        </>}
                        {tool === "copy" && <>
                            <button onClick={e => handleCopy(e, editingText.id)}>Copy</button>
                        </>}

                        {tool === "backgroundOpacity" && <>
                            <label>Background opacity:</label>
                            <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.1"
                                name="backgroundOpacity"
                                value={items.find(item => item.id === editingText.id).backgroundOpacity}
                                onChange={(e) => handleItemChange(e, editingText.id, "backgroundOpacity")}
                            />
                        </>}
                    </div>}
                </>)
            }
        </>)
}
export default BoxFormTop
import React from 'react'
import TopButtonsSlider from "../helperComponents/TopButtonsSlider"
import { fontOptions } from "../helperFunctions/fontOptions"
import Order from "../helperComponents/Order"
import MarkdownEditor from "../markdown-editor/MarkdownEditor"

import { MoodboardContext } from "../../context/moodboardContext";

const BoxFormTop = () => {
    const { items, editingText, tool, changeTool, write, isEditingBoard, handleItemChange, handleMoveItemToFront, handleMoveItemToBack, handleMoveItemForward, handleMoveItemBackward, handleDuplicateBox, handleCopy } = React.useContext(MoodboardContext);

    const toolButtons = {
        // Box
        boxStyle: "Style",
        // BoxColor: "Box color",
        // backgroundOpacity: "Background opacity", // range
        // rating: "Rating",

        boxBorder: "Border",
        // borderColor: "Border color",
        // borderWidth: "Border width",
        // roundedCorners: "Rounded corners",

        // Text
        boxText: "Text",
        // text: "Text",
        // textColor: "Text Color",
        // textAlignCenter: "Align center",

        // Font
        boxFont: "Font",
        // font: "Font",
        // fontSize: "Font size",
        // fontStyle: "Font style",

        //Link
        boxLink: "Link",
        // linktitle: "Link Title",
        // linkurl: "Link Url",

        // Shape
        // boxShape: "Shape",
        // width: "Width",
        // height: "Height",
        // angle: "Angle",

        // Misc
        order: "Order",
        copy: "Copy",
        duplicate: "Duplicate",
    }

    const findItem = (term) => {
        return items.find(item => item.id === editingText.id)[`${term}`]
    }
    const handleStyleClick = (id, tag) => {
        const start = document.getElementById(id).selectionStart;
        const end = document.getElementById(id).selectionEnd;
        const newText =
            findItem("text").substring(0, start) +
            `${tag}${findItem("text").substring(start, end)}${tag}` +
            findItem("text").substring(end);
        let e = { target: { value: newText } }
        handleItemChange(e, editingText.id, "text")
        // setProfile({ ...profile, about: newText })
        // ctx.setCurrentCvProfile({ ...profile, about: newText })
    };
    return (
        <>
            {items.length > 0 && editingText && editingText.id && isEditingBoard && write && (
                <>
                    <div className='box-editor inputs-top_objects' >
                        <TopButtonsSlider toolButtons={toolButtons} changeTool={changeTool} />
                    </div>
                    {tool !== "" && <div className='box-editor inputs-top_objects-form' >
                        {/* </div> {tool === "text" && <> */}
                        {tool === "boxText" && <>
                            <div className='box-editor field'> <label>Text:</label>
                                <textarea
                                    className='box-editor'
                                    value={findItem("text")}
                                    onChange={(e) => handleItemChange(e, editingText.id, "text")}
                                />
                                {/* <MarkdownEditor
                                    id={editingText.id}
                                    parent={'text'}
                                    //index={index}
                                    markdown={findItem("text")}
                                    onInputChange={(e) => handleItemChange(e, editingText.id, "text")}
                                    onStyleClick={handleStyleClick}
                                /> */}
                            </div>
                        </>}
                        {/* {tool === "BoxColor" && <> */}
                        {tool === "boxStyle" && <>
                            <div className='box-editor field'><label>Box color:</label>
                                <input
                                    className='box-editor'
                                    type="color"
                                    name="color"
                                    value={findItem("color")}
                                    onChange={(e) => handleItemChange(e, editingText.id, "color")}
                                /></div>
                        </>}
                        {/* {tool === "textColor" && <> */}
                        {tool === "boxText" && <>
                            <div className='box-editor field'><label>Text Color:</label>
                                <input
                                    className='box-editor'
                                    type="color"
                                    name="color"
                                    value={findItem("textColor")}
                                    onChange={(e) => handleItemChange(e, editingText.id, "textColor")}
                                /></div>
                        </>}
                        {/* {tool === "linktitle" && <> */}
                        {tool === "boxLink" && <>
                            <div className='box-editor field'><label>Link:</label>
                                <input
                                    className='box-editor'
                                    type="text"
                                    name="link"
                                    value={findItem("link")}
                                    onChange={(e) => handleItemChange(e, editingText.id, "link")}
                                /></div>
                        </>}
                        {/* {tool === "linkurl" && <> */}
                        {tool === "boxLink" && <>
                            <div className='box-editor field'> <label>Url:</label>
                                <input
                                    className='box-editor'
                                    type="text"
                                    name="url"
                                    value={findItem("url")}
                                    onChange={(e) => handleItemChange(e, editingText.id, "url")}
                                /></div>
                        </>}
                        {/* {tool === "width" && <> */}
                        {/* {tool === "boxShape" && <>
                            <div><label>Width:</label>
                                <input
                                    type="range"
                                    min="100"
                                    max="600"
                                    step="10"
                                    name="width"
                                    value={items.find(item => item.id === editingText.id).width}
                                    onChange={(e) => handleItemChange(e, editingText.id, "width")}
                                /></div>
                        </>} */}
                        {/* {tool === "height" && <> */}
                        {/* {tool === "boxShape" && <>
                            <div><label>Height:</label>
                                <input
                                    type="range"
                                    min="60"
                                    max="600"
                                    step="10"
                                    name="height"
                                    value={items.find(item => item.id === editingText.id).height}
                                    onChange={(e) => handleItemChange(e, editingText.id, "height")}
                                /></div>
                        </>} */}
                        {/* {tool === "angle" && <> */}
                        {/* {tool === "boxShape" && <>
                            <div><label>Angle:</label>
                                <input
                                    type="range"
                                    min="-180"
                                    max="180"
                                    step="1"
                                    name="angle"
                                    value={items.find(item => item.id === editingText.id).angle}
                                    onChange={(e) => handleItemChange(e, editingText.id, "angle")}
                                /></div>
                        </>} */}
                        {/* {tool === "font" && <> */}
                        {tool === "boxFont" && <>
                            <div className='box-editor field'>
                                <label htmlFor="fonts">Choose a font:</label>
                                <select
                                    name="fonts"
                                    id="fonts"
                                    className='box-editor box-form-top-select'
                                    value={items.find(item => item.id === editingText.id).font}
                                    onChange={(e) => handleItemChange(e, editingText.id, "font")}
                                >
                                    {fontOptions.map((option) => (
                                        <option
                                            className='box-editor box-form-top-select-option'
                                            style={{ fontFamily: `${option.value}` }}
                                            key={option.value}
                                            value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <span
                                    className='box-editor box-form-top-span'
                                    style={{ fontFamily: `${items.find(item => item.id === editingText.id).font}` }}
                                > {items.find(item => item.id === editingText.id).font}</span>
                            </div>
                        </>}
                        {/* {tool === "fontSize" && <> */}
                        {tool === "boxFont" && <>
                            <div className='box-editor field'><label>Font size:</label>
                                <input
                                    className='box-editor'
                                    type="range"
                                    min="8"
                                    max="72"
                                    step="4"
                                    name="fontSize"
                                    value={items.find(item => item.id === editingText.id).fontSize}
                                    onChange={(e) => handleItemChange(e, editingText.id, "fontSize")}
                                /></div>
                        </>}
                        {/* {tool === "fontStyle" && */}
                        {tool === "boxFont" &&
                            <div className='box-editor field'><label className='box-editor checkbox-container'>Font Bold
                                <input
                                    type="checkbox"
                                    className='box-editor input-line-closed'
                                    value={items.find(item => item.id === editingText.id).fontStyle}
                                    checked={items.find(item => item.id === editingText.id).fontStyle}
                                    onChange={(e) => handleItemChange(e, editingText.id, "fontStyle")} />
                                <span className="box-editor checkmark"></span>
                            </label></div>}
                        {/* {tool === "textAlignCenter" && */}
                        {tool === "boxText" &&
                            <div className='box-editor field'><label className='box-editor checkbox-container'>Text align center
                                <input
                                    type="checkbox"
                                    className='box-editor input-line-closed'
                                    value={items.find(item => item.id === editingText.id).textAlignCenter}
                                    checked={items.find(item => item.id === editingText.id).textAlignCenter}
                                    onChange={(e) => handleItemChange(e, editingText.id, "textAlignCenter")} />
                                <span className="box-editor checkmark"></span>
                            </label></div>}
                        {/* {tool === "roundedCorners" && <> */}
                        {tool === "boxBorder" && <>
                            <div className='box-editor field'>
                                <label>Rounded corners:</label>
                                <input
                                    className='box-editor'
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    name="roundedCorners"
                                    value={items.find(item => item.id === editingText.id).roundedCorners}
                                    onChange={(e) => handleItemChange(e, editingText.id, "roundedCorners")}
                                /></div>
                        </>}
                        {/* {tool === "order" && <> */}
                        {tool === "order" && <>
                            <Order
                                id={editingText.id}
                                handleMoveToFront={handleMoveItemToFront}
                                handleMoveToBack={handleMoveItemToBack}
                                handleMoveForward={handleMoveItemForward}
                                handleMoveBackward={handleMoveItemBackward}
                            />
                        </>}
                        {/* {tool === "duplicate" &&  */}
                        {tool === "duplicate" &&
                            <div className='box-editor inputs-top_objects-form'>
                                <label>Duplicate:</label>
                                <button
                                    className='box-editor'
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
                        {/* {tool === "rating" && */}
                        {tool === "boxStyle" &&
                            <div className='box-editor field'>
                                <label style={{ marginTop: "-.5rem" }} className='box-editor checkbox-container'>Rating
                                    <input
                                        type="checkbox"
                                        className='box-editor input-line-closed'
                                        value={items.find(item => item.id === editingText.id).showRating}
                                        checked={items.find(item => item.id === editingText.id).showRating}
                                        onChange={(e) => handleItemChange(e, editingText.id, "showRating")} />
                                    <span className="box-editor checkmark"></span>
                                </label></div>}
                        {/* {tool === "borderWidth" && <> */}
                        {tool === "boxBorder" && <>
                            <div className='box-editor field'><label>Border width:</label>
                                <input
                                    className='box-editor'
                                    type="range"
                                    min="0"
                                    max="55"
                                    step="1"
                                    name="borderWidth"
                                    value={items.find(item => item.id === editingText.id).borderWidth}
                                    onChange={(e) => handleItemChange(e, editingText.id, "borderWidth")}
                                /></div>
                        </>}
                        {/* {tool === "borderColor" && <> */}
                        {tool === "boxBorder" && <>
                            <div className='box-editor field'>
                                <label>Border color:</label>
                                <input
                                    className='box-editor'
                                    type="color"
                                    name="color"
                                    value={findItem("borderColor")}
                                    onChange={(e) => handleItemChange(e, editingText.id, "borderColor")}
                                /></div>
                        </>}
                        {/* {tool === "copy" && <> */}
                        {tool === "copy" && <>
                            <div>
                                <button
                                    className='box-editor'
                                    onClick={e => handleCopy(e, editingText.id)}
                                >
                                    Copy
                                </button>
                            </div>
                        </>}

                        {/* {tool === "backgroundOpacity" && <> */}
                        {tool === "boxStyle" && <>
                            <div className='box-editor field'>
                                <label>Box opacity:</label>
                                <input
                                    className='box-editor'
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    name="backgroundOpacity"
                                    value={items.find(item => item.id === editingText.id).backgroundOpacity}
                                    onChange={(e) => handleItemChange(e, editingText.id, "backgroundOpacity")}
                                /></div>
                        </>}
                    </div>}
                </>)
            }
        </>)
}
export default BoxFormTop
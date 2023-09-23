import React, { useState, useRef, useContext, } from 'react'
import { MoodboardContext } from "../../context/moodboardContext"
function BoardDrop({ children }) {
    const { handleImageDropUpload, handleTextDropUpload } = useContext(MoodboardContext)
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef(null)

    const handleDrag = function (e) {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = function (e) {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageDropUpload(e.dataTransfer.files[0])
        } else {
            handleTextDropUpload(e)
        }
    }

    const handleChange = function (e) {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleImageDropUpload(e.target.files[0])
        }
    }

    return (
        <form
            className="board-form-file-upload"
            onDragEnter={handleDrag}
            onSubmit={(e) => e.preventDefault()}
        >
            <input
                ref={inputRef}
                type="file"
                className="board-input-file-upload"
                multiple={true}
                onChange={handleChange}
            />
            <div
                className="drag-file-element"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {children}
            </div>
        </form>
    )
}

export default BoardDrop
import React, { useState, useRef, useContext, } from 'react'
import { MoodboardContext } from "../../context/moodboardContext"
function BoardDrop({ children }) {
    const { handleImageDropUpload } = useContext(MoodboardContext)
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
        }
    }

    const handleChange = function (e) {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleImageDropUpload(e.target.files[0])
        }
    }

    // const onButtonClick = () => {
    //     inputRef.current.click()
    // }

    return (
        <form
            id="board-form-file-upload"
            onDragEnter={handleDrag}
            onSubmit={(e) => e.preventDefault()}
        >
            <input
                ref={inputRef}
                type="file"
                id="board-input-file-upload"
                multiple={true}
                onChange={handleChange}
            />
            {/* <label
                id="board-label-file-upload"
                htmlFor="board-input-file-upload"
                className={dragActive ? "drag-active" : ""}
            >
                <div>
                    <p>Drag and drop your file here or</p>
                    <button
                        className="upload-button"
                        onClick={onButtonClick}
                    >
                        Upload a file
                    </button>
                </div>
            </label> */}
            <div
                id="drag-file-element"
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
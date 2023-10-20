import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";
function DragDropFile({ children }) {
    const { handleImageDropUpload } = React.useContext(MoodboardContext)
    const [dragActive, setDragActive] = React.useState(false);
    const inputRef = React.useRef(null);

    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageDropUpload(e.dataTransfer.files[0]);
        }
    };

    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleImageDropUpload(e.target.files[0]);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <form
            className="form-file-upload"
            onDragEnter={handleDrag}
            onSubmit={(e) => e.preventDefault()}
        >
            <input
                ref={inputRef}
                type="file"
                className="input-file-upload"
                multiple={true}
                onChange={handleChange}
            />
            <label
                htmlFor="input-file-upload"
                className={`label-file-upload ${dragActive ? "drag-active" : ""}`}
            >
                <div>
                    <p>Drop an image here</p>
                    {/* <button
                    
                        className="upload-button"
                        onClick={onButtonClick}
                    >
                        Upload a file
                    </button> */}
                </div>
            </label>
            {/* {dragActive &&  */}
            <div
                className="drag-file-element"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {children}
            </div>
            {/* } */}
        </form>
    );
};

export default DragDropFile
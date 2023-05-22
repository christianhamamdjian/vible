import React, { useRef } from 'react';

function ImageUploader({ onUpload }) {
    const inputRef = useRef();

    function handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            onUpload(reader.result);
        };
        reader.readAsDataURL(file);
    }

    function handleClick() {
        inputRef.current.click();
    }

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={inputRef}
                onChange={handleFileChange}
            />
            <button onClick={handleClick}>Upload Image</button>
        </div>
    );
}

export default ImageUploader;

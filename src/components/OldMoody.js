import React, { useState } from 'react';

const Moody = () => {
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const newImage = {
                id: Date.now(),
                src: e.target.result,
                x: 0,
                y: 0,
            };

            setImages((prevImages) => [...prevImages, newImage]);
        };

        reader.readAsDataURL(file);
    };

    const handleDragStart = (event, id) => {
        event.dataTransfer.setData('imageId', id);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const imageId = event.dataTransfer.getData('imageId');

        const offsetX = event.clientX - event.currentTarget.getBoundingClientRect().left;
        const offsetY = event.clientY - event.currentTarget.getBoundingClientRect().top;

        setImages((prevImages) =>
            prevImages.map((image) => (image.id === imageId ? { ...image, x: offsetX, y: offsetY } : image))
        );
    };

    const handleDeleteImage = (id) => {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />

            <svg
                width="800"
                height="600"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{ border: '1px solid black' }}
            >
                {images.map((image) => (
                    <g key={image.id} transform={`translate(${image.x}, ${image.y})`} draggable="true" onDragStart={(e) => handleDragStart(e, image.id)}>
                        <image href={image.src} width="100" height="100" />
                        <text x="5" y="120" fill="red" onClick={() => handleDeleteImage(image.id)}>
                            Delete
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default Moody;



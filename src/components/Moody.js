import React, { useState } from 'react';

const Moody = () => {
    const [images, setImages] = useState([]);
    const [selected, setSelected] = useState({})
    const [dragging, setDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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

    const handleMouseDown = (event, id) => {
        setDragging(true);

        const offsetX = event.clientX - event.currentTarget.getBoundingClientRect().left;
        const offsetY = event.clientY - event.currentTarget.getBoundingClientRect().top;

        const selectedImage = images.find(item => item.id === id)

        setSelected(selectedImage)

        setDragOffset({ x: offsetX, y: offsetY });
    };
    const handleMouseMove = (event) => {
        event.preventDefault();
        if (!dragging) return;
        const newX = event.clientX - event.currentTarget.getBoundingClientRect().left - dragOffset.x;
        const newY = event.clientY - event.currentTarget.getBoundingClientRect().top - dragOffset.y;

        setImages((prevImages) =>
            prevImages.map((image) => {
                return image.id === selected.id ? { ...image, x: newX, y: newY } : image
            })
        );
    };
    const handleMouseUp = () => {
        setDragging(false);
        setDragOffset({ x: 0, y: 0 });
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
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ border: '1px solid black' }}
            >
                {images.map((image) => (
                    <g key={image.id}
                        transform={`translate(${image.x}, ${image.y})`}
                        draggable="true"
                    >
                        <rect
                            width="120"
                            height="120"
                            style={{ border: '1px solid black', cursor: 'move' }}
                        //visibility="hidden"
                        />

                        <image href={image.src}
                            width="100"
                            height="100"
                            onMouseDown={e => {
                                handleMouseDown(e, image.id)
                            }}
                            style={{ cursor: 'move' }} />
                        <text
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDeleteImage(image.id)}>
                            X
                        </text>
                    </g>
                ))}
            </svg>
        </div >
    );
};

export default Moody;



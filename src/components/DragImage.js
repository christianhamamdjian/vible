import React, { useState } from 'react';

const DragImage = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (event) => {
        setDragging(true);

        const offsetX = event.clientX - event.currentTarget.getBoundingClientRect().left;
        const offsetY = event.clientY - event.currentTarget.getBoundingClientRect().top;

        setDragOffset({ x: offsetX, y: offsetY });
    };

    const handleMouseMove = (event) => {
        if (!dragging) return;

        const newX = event.clientX - event.currentTarget.getBoundingClientRect().left - dragOffset.x;
        const newY = event.clientY - event.currentTarget.getBoundingClientRect().top - dragOffset.y;

        setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
        setDragging(false);
        setDragOffset({ x: 0, y: 0 });
    };

    return (
        <svg
            width="800"
            height="600"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ border: '1px solid black' }}
        >
            <image
                href="path_to_your_image.jpg"
                x={position.x}
                y={position.y}
                width="200"
                height="200"
                onMouseDown={handleMouseDown}
                style={{ cursor: 'move' }}
            />
        </svg>
    );
};

export default DragImage;

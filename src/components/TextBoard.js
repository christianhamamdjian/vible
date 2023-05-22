import React, { useState, useRef, useEffect } from 'react';

const TextBoard = () => {
    const canvasRef = useRef(null);
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear the canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw each box on the canvas
        boxes.forEach((box) => {
            ctx.fillStyle = box.color;
            ctx.fillRect(box.x, box.y, box.width, box.height);
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(box.text, box.x + 5, box.y + 15);
        });
    }, [boxes]);

    const handleMouseDown = (event) => {
        event.preventDefault();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const mouseX = event.clientX - canvasRef.current.getBoundingClientRect().left;
        const mouseY = event.clientY - canvasRef.current.getBoundingClientRect().top;

        // Check if the mouse is inside any of the boxes
        for (let i = boxes.length - 1; i >= 0; i--) {
            const box = boxes[i];

            if (mouseX >= box.x && mouseX <= box.x + box.width && mouseY >= box.y && mouseY <= box.y + box.height) {
                const offsetX = mouseX - box.x;
                const offsetY = mouseY - box.y;

                // Update the box's position on drag
                const handleMouseMove = (event) => {
                    console.log(event)
                    const newX = event.clientX - canvasRef.current.getBoundingClientRect().left;
                    const newY = event.clientY - canvasRef.current.getBoundingClientRect().top;
                    setBoxes((prevBoxes) =>
                        prevBoxes.map((prevBox, index) =>
                            index === i ? { ...prevBox, x: newX, y: newY } : prevBox
                        )
                    );
                };

                // Remove the mousemove listener when the mouse is released
                const handleMouseUp = () => {
                    canvas.removeEventListener('mousemove', handleMouseMove);
                    canvas.removeEventListener('mouseup', handleMouseUp);
                };

                canvas.addEventListener('mousemove', handleMouseMove);
                canvas.addEventListener('mouseup', handleMouseUp);

                break;
            }
        }
    };

    const handleAddBox = (event) => {
        event.preventDefault();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const text = event.target.elements.text.value;
        const color = event.target.elements.color.value;
        const width = 100;
        const height = 50;
        const x = canvas.width / 2 - width / 2;
        const y = canvas.height / 2 - height / 2;

        // Add a new box to the array
        setBoxes((prevBoxes) => [...prevBoxes, { text, color, x, y, width, height }]);
    };

    return (
        <div>
            <form onSubmit={handleAddBox}>
                <label>
                    Text:
                    <input type="text" name="text" />
                </label>
                <label>
                    Color:
                    <input type="color" name="color" />
                </label>
                <button type="submit">Add Box</button>
            </form>
            <canvas
                ref={canvasRef}
                width={500}
                height={500}
                style={{ border: '1px solid black' }}
                onMouseDown={handleMouseDown}
            ></canvas>
        </div>
    );
};

export default TextBoard;




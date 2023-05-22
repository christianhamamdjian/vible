import React, { useState } from "react";

const TextBox = ({ x, y, text, color, onDelete, onDragStart }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x, y });

    const handleMouseDown = (event) => {
        setIsDragging(true);
        onDragStart();
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            setPosition({
                x: position.x + event.movementX,
                y: position.y + event.movementY,
            });
        }
    };

    const handleMouseUp = (event) => {
        setIsDragging(false);
    };

    return (
        <div
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                backgroundColor: color,
                border: "1px solid black",
                padding: "10px",
                userSelect: "none",
                cursor: "move"
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <button style={{ float: "right", marginLeft: "10px" }} onClick={onDelete}>
                X
            </button>
            {text}
        </div>
    );
};

const ColoredTextBox = () => {
    const [textBoxes, setTextBoxes] = useState([]);
    const [activeBoxIndex, setActiveBoxIndex] = useState(-1);
    const randomPosition = Math.floor(Math.random() * 100)
    const handleAddBox = (event) => {
        event.preventDefault();
        const text = event.target.elements.text.value;
        const color = event.target.elements.color.value;
        setTextBoxes([
            ...textBoxes,
            { x: randomPosition, y: randomPosition, text: "Text...", color: "#abc", id: Date.now().toString() },
        ]);
        setActiveBoxIndex(textBoxes.length);
    };

    const handleDeleteBox = (id) => {
        setTextBoxes(textBoxes.filter((box) => box.id !== id));
        setActiveBoxIndex(-1);
    };

    const handleDragStart = () => {
        setActiveBoxIndex(-1);
    };

    const handleSetActiveBoxIndex = (index) => {
        setActiveBoxIndex(index);
    };

    const handleTextChange = (event, id) => {
        setTextBoxes(
            textBoxes.map((box) => {
                if (box.id === id) {
                    return { ...box, text: event.target.value };
                }
                return box;
            })
        );
    };
    const handleColorChange = (event, id) => {
        setTextBoxes(
            textBoxes.map((box) => {
                if (box.id === id) {
                    return { ...box, color: event.target.value };
                }
                return box;
            })
        );
    };

    return (
        <div style={{ position: "relative", height: "400px", width: "400px", border: '1px solid black' }}>
            {textBoxes.map((box, index) => (
                <TextBox
                    key={box.id}
                    x={box.x}
                    y={box.y}
                    text={box.text}
                    color={box.color}
                    onDelete={() => handleDeleteBox(box.id)}
                    onDragStart={() => handleSetActiveBoxIndex(index)}
                />
            ))}
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
            {activeBoxIndex > -1 && (
                <div style={{
                    height: "100%",
                    border: "1px solid black",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                    >
                        <label>
                            Change text:
                            <input
                                type="text"
                                value={textBoxes[activeBoxIndex].text}
                                onChange={(event) =>
                                    handleTextChange(event, textBoxes[activeBoxIndex].id)
                                }
                            />
                        </label>
                        <label>
                            Change color:
                            <input
                                type="color"
                                name="color"
                                value={textBoxes[activeBoxIndex].color}
                                onChange={(event) =>
                                    handleColorChange(event, textBoxes[activeBoxIndex].id)
                                } />
                        </label>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default ColoredTextBox;

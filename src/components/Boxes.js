import React, { useState } from 'react';

const Boxes = () => {
    const [boxes, setBoxes] = useState([]);
    const [boxText, setBoxText] = useState('');
    const [boxColor, setBoxColor] = useState('');
    const [selected, setSelected] = useState(null)
    const [dragging, setDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const handleAddBox = (event) => {
        event.preventDefault();

        const boxId = Date.now();
        const newX = event.clientX - event.currentTarget.getBoundingClientRect().left;
        const newY = event.clientY - event.currentTarget.getBoundingClientRect().top;
        const newBox = { id: boxId, x: newX, y: newY, text: boxText, color: boxColor };
        setBoxes([...boxes, newBox]);
        setBoxText('');
        setBoxColor('');
    };

    const handleMouseDown = (event, id) => {
        setDragging(true);

        const offsetX = event.clientX - event.currentTarget.getBoundingClientRect().left;
        const offsetY = event.clientY - event.currentTarget.getBoundingClientRect().top;

        const selectedBox = boxes.find(item => item.id === id)

        setSelected(selectedBox)

        setDragOffset({ x: offsetX, y: offsetY });
    };

    const handleMouseUp = () => {
        setDragging(false);
        setDragOffset({ x: 0, y: 0 });
    };

    const handleMouseMove = (event) => {
        event.preventDefault();
        if (!dragging) return;
        const newX = event.clientX - event.currentTarget.getBoundingClientRect().left - dragOffset.x;
        const newY = event.clientY - event.currentTarget.getBoundingClientRect().top - dragOffset.y;

        setBoxes(prevBoxes =>
            prevBoxes.map(box => {
                if (box.id === selected.id) {
                    return { ...box, x: newX, y: newY };
                }
                return box;
            })
        );

        event.currentTarget.classList.remove('drag-over');
    };

    const handleDeleteBox = (id) => {
        setBoxes(prevBoxes => prevBoxes.filter(box => box.id !== id));
        setSelected(null)
    };

    const handleBoxText = (event) => {
        setBoxText(event.target.value);
    };
    const handleBoxColor = (event) => {
        setBoxColor(event.target.value);
    };
    const handleBoxTextChange = (event, id) => {
        setBoxes(prevBoxes =>
            prevBoxes.map(box => {
                if (box.id === id) {
                    return { ...box, text: event.target.value };
                }
                return box;
            })
        );
    };
    const handleBoxColorChange = (event, id) => {
        setBoxes(prevBoxes =>
            prevBoxes.map(box => {
                if (box.id === id) {
                    return { ...box, color: event.target.value };
                }
                return box;
            })
        );
    };
    return (
        <div>
            <svg
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ width: '800px', height: '600px', border: '1px solid black' }}
            >
                {boxes.map(box => (
                    <g
                        key={box.id}
                        draggable="true"
                        transform={`translate(${box.x},${box.y})`}
                    >
                        <rect
                            width="100"
                            height="100"
                            fill={box.color}
                            stroke="blue"
                            strokeWidth="1"
                            rx="5"
                            ry="5"
                            style={{ cursor: 'move' }}
                            onMouseDown={(e) => handleMouseDown(e, box.id)}
                            onMouseUp={handleMouseUp}
                        />
                        <text
                            x="50"
                            y="50"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ pointerEvents: 'none' }}
                        >
                            {
                                box.text}
                        </text>
                        <circle
                            cx="95"
                            cy="5"
                            r="8"
                            fill="red"
                            stroke="white"
                            strokeWidth="2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDeleteBox(box.id)}
                        />
                    </g>
                ))}
            </svg>
            <form onSubmit={handleAddBox}>
                <label>
                    Text:
                    <input type="text" value={boxText} onChange={handleBoxText} />
                </label>
                <label>
                    Color:
                    <input type="color" name="color" value={boxColor} onChange={handleBoxColor} />
                </label>
                <button type="submit">Add Box</button>
            </form>
            {boxes.length > 0 && selected && (

                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}
                >
                    <label>
                        Change text:
                        <input
                            type="text"
                            value={boxes.find(box => box.id === selected.id).text}
                            onChange={(event) =>
                                handleBoxTextChange(event, selected.id)
                            }
                        />
                    </label>
                    <label>
                        Change color:
                        <input
                            type="color"
                            name="color"
                            value={boxes.find(box => box.id === selected.id).color}
                            onChange={(event) =>
                                handleBoxColorChange(event, selected.id)
                            } />
                    </label>
                </div>

            )
            }
        </div>
    );
};

export default Boxes;

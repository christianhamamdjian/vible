import React, { useState } from 'react';

const Boxes = () => {
    const [boxes, setBoxes] = useState([]);
    const [boxText, setBoxText] = useState('');

    const handleDrop = (event) => {
        event.preventDefault();

        const boxId = Date.now();
        const newX = event.clientX - event.currentTarget.getBoundingClientRect().left;
        const newY = event.clientY - event.currentTarget.getBoundingClientRect().top;
        const newBox = { id: boxId, x: newX, y: newY, text: boxText };
        setBoxes([...boxes, newBox]);
        setBoxText('');
    };

    const handleDragStart = (event, id) => {
        event.dataTransfer.setData('boxId', id);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        event.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        event.currentTarget.classList.remove('drag-over');
    };

    const handleDragDrop = (event) => {
        event.preventDefault();
        const id = event.dataTransfer.getData('boxId');
        const newX = event.clientX - event.currentTarget.getBoundingClientRect().left;
        const newY = event.clientY - event.currentTarget.getBoundingClientRect().top;

        setBoxes(prevBoxes =>
            prevBoxes.map(box => {
                if (box.id === parseInt(id)) {
                    return { ...box, x: newX, y: newY };
                }
                return box;
            })
        );

        event.currentTarget.classList.remove('drag-over');
    };

    const handleDeleteBox = (id) => {
        setBoxes(prevBoxes => prevBoxes.filter(box => box.id !== id));
    };

    const handleBoxTextChange = (event) => {
        setBoxText(event.target.value);
    };

    return (
        <div>
            <svg
                className="canvas"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ width: '800px', height: '600px', border: '1px solid black' }}
            >
                {boxes.map(box => (
                    <g
                        key={box.id}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, box.id)}
                        transform={`translate(${box.x},${box.y})`}
                    >
                        <rect
                            width="100"
                            height="100"
                            fill="lightblue"
                            stroke="blue"
                            strokeWidth="1"
                            rx="5"
                            ry="5"
                        />
                        <text
                            x="50"
                            y="50"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ pointerEvents: 'none' }}
                        >
                            {box.text}
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
            <form onSubmit={handleDrop}>
                <input type="text" value={boxText} onChange={handleBoxTextChange} />
                <button type="submit">Add Box</button>
            </form>
        </div>
    );
};

export default Boxes;

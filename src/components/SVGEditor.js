import React, { useState, useRef } from 'react';

const SVGEditor = () => {
    const [draggingSvg, setDraggingSvg] = useState(false);
    const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 });
    const [svgOffset, setSvgOffset] = useState({ x: 0, y: 0 });
    const [rectangles, setRectangles] = useState([
        { id: 1, x: 50, y: 50, selected: false },
        { id: 2, x: 200, y: 200, selected: false },
        { id: 3, x: 100, y: 150, selected: false },
    ]);
    const [selectedRectId, setSelectedRectId] = useState(null);
    const [rectOffsets, setRectOffsets] = useState({});

    const handleSvgPointerDown = (e) => {
        e.preventDefault();
        const { clientX, clientY } = e;
        setSvgOffset({
            x: clientX - svgPosition.x,
            y: clientY - svgPosition.y,
        });
        setDraggingSvg(true);
    };

    const handleSvgPointerMove = (e) => {
        e.preventDefault();
        if (!draggingSvg || selectedRectId !== null) return;
        const { clientX, clientY } = e;
        const newX = clientX - svgOffset.x;
        const newY = clientY - svgOffset.y;
        setSvgPosition({ x: newX, y: newY });
    };

    const handleSvgPointerUp = () => {
        setDraggingSvg(false);
    };

    const handleRectPointerDown = (e, rectId) => {
        e.preventDefault();
        setSelectedRectId(rectId);
        const { clientX, clientY } = e;
        const rect = rectangles.find((r) => r.id === rectId);
        const rectOffset = {
            x: clientX - rect.x,
            y: clientY - rect.y,
        };
        setRectOffsets((prevOffsets) => ({
            ...prevOffsets,
            [rectId]: rectOffset,
        }));
    };

    const handleRectPointerMove = (e, rectId) => {
        e.preventDefault();
        if (!draggingSvg || rectId !== selectedRectId) return;
        const { clientX, clientY } = e;
        const rectOffset = rectOffsets[rectId];
        const rectIndex = rectangles.findIndex((r) => r.id === rectId);
        const newX = clientX - rectOffset.x;
        const newY = clientY - rectOffset.y;
        const updatedRectangles = [...rectangles];
        const updatedRect = { ...updatedRectangles[rectIndex], x: newX, y: newY };
        updatedRectangles[rectIndex] = updatedRect;
        setRectangles(updatedRectangles);
    };

    const handleRectPointerUp = (rectId) => {
        setRectOffsets((prevOffsets) => {
            const { [rectId]: deletedOffset, ...restOffsets } = prevOffsets;
            return restOffsets;
        });
        setSelectedRectId(null);
    };

    return (
        <div
            style={{
                width: '300px',
                height: '300px',
                overflow: 'auto',
                border: '1px solid black',
            }}
        >
            <svg
                width="400"
                height="400"
                style={{ transform: `translate(${svgPosition.x}px, ${svgPosition.y}px)` }}
                onPointerDown={handleSvgPointerDown}
                onPointerMove={handleSvgPointerMove}
                onPointerUp={handleSvgPointerUp}
            >
                {rectangles.map((rect) => (
                    <rect
                        key={rect.id}
                        x={rect.x}
                        y={rect.y}
                        width="100"
                        height="100"
                        fill={rect.selected ? 'lightgreen' : 'lightblue'}
                        onPointerDown={(e) => handleRectPointerDown(e, rect.id)}
                        onPointerMove={(e) => handleRectPointerMove(e, rect.id)}
                        onPointerUp={() => handleRectPointerUp(rect.id)}
                    />
                ))}
            </svg>
        </div>
    );
};


export default SVGEditor;

import React, { useState, useRef } from 'react';

const App = () => {
    const svgRef = useRef(null);
    const divRef = useRef(null);
    const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 });
    const [draggingSvg, setDraggingSvg] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
    const [divSize, setDivSize] = useState({ width: 0, height: 0 });

    const handleSvgPointerDown = (e) => {
        e.preventDefault();
        const { clientX, clientY } = e;
        const svgRect = svgRef.current.getBoundingClientRect();
        const divRect = divRef.current.getBoundingClientRect();
        setOffset({
            x: clientX - svgRect.left + divRect.left - svgPosition.x,
            y: clientY - svgRect.top + divRect.top - svgPosition.y,
        });
        setDraggingSvg(true);
    };

    const handlePointerMove = (e) => {
        e.preventDefault();
        if (!draggingSvg) return;

        const { clientX, clientY } = e;
        const divRect = divRef.current.getBoundingClientRect();

        const maxX = divRect.width - svgSize.width;
        const maxY = divRect.height - svgSize.height;

        let newX = clientX - offset.x - divRect.left;
        let newY = clientY - offset.y - divRect.top;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        setSvgPosition({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
        setDraggingSvg(false);
    };

    const handleSvgLoad = () => {
        const svgRect = svgRef.current.getBoundingClientRect();
        setSvgSize({ width: svgRect.width, height: svgRect.height });
    };

    const handleDivResize = () => {
        const divRect = divRef.current.getBoundingClientRect();
        setDivSize({ width: divRect.width, height: divRect.height });
    };

    return (
        <div
            ref={divRef}
            style={{
                width: '300px',
                height: '300px',
                overflow: 'auto',
                border: '1px solid black',
                position: 'relative',
            }}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onResize={handleDivResize}
        >
            <svg
                ref={svgRef}
                width="500"
                height="500"
                style={{
                    transform: `translate(${svgPosition.x}px, ${svgPosition.y}px)`,
                    cursor: draggingSvg ? 'grabbing' : 'grab',
                    pointerEvents: draggingSvg ? 'none' : 'auto',
                }}
                onPointerDown={handleSvgPointerDown}
                onLoad={handleSvgLoad}
            >
                <rect x="0" y="0" width="500" height="500" fill="lightgray" />
            </svg>
        </div>
    );
};

export default App;

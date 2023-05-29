import React, { useState } from 'react';

function SVGPath() {
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [pathStartX, setPathStartX] = useState(0);
    const [pathStartY, setPathStartY] = useState(0);

    const handleMouseDown = (e) => {

        setDragging(true);
        setStartX(e.clientX);
        setStartY(e.clientY);

        const bbox = e.target.getBBox();
        console.log(bbox)
        setPathStartX(bbox.x);
        setPathStartY(bbox.y);

        // document.addEventListener('mousemove', handleMouseMove);
        // document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        e.target.setAttribute('transform', `translate(${pathStartX + dx} ${pathStartY + dy})`);
    };

    const handleMouseUp = () => {
        setDragging(false);

        //document.removeEventListener('mousemove', handleMouseMove);
        // document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <svg
            width="400"
            height="400"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <path
                d="M100,100 L200,200 L300,100"
                stroke="black"
                fill="transparent"
                onMouseDown={handleMouseDown}
            />
        </svg>
    );
}

export default SVGPath;
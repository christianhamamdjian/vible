import React, { useState, useRef, useEffect } from 'react';

function SVGPathDrag() {
    const pathRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleDragStart = (event) => {
            event.preventDefault();
            setIsDragging(true);
            const { clientX, clientY } = event.touches ? event.touches[0] : event;
            const { x, y } = pathRef.current.getBBox();
            setDragOffset({ x: clientX - x, y: clientY - y });
        };

        const handleDragMove = (event) => {
            if (isDragging) {
                event.preventDefault();
                const { clientX, clientY } = event.touches ? event.touches[0] : event;
                const { x: offsetX, y: offsetY } = dragOffset;
                const newX = clientX - offsetX;
                const newY = clientY - offsetY;
                pathRef.current.setAttribute('transform', `translate(${newX}, ${newY})`);
            }
        };

        const handleDragEnd = () => {
            setIsDragging(false);
        };

        pathRef.current.addEventListener('mousedown', handleDragStart);
        pathRef.current.addEventListener('touchstart', handleDragStart, { passive: false });
        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('touchmove', handleDragMove, { passive: false });
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('touchend', handleDragEnd);

        return () => {
            pathRef.current.removeEventListener('mousedown', handleDragStart);
            pathRef.current.removeEventListener('touchstart', handleDragStart);
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [dragOffset, isDragging]);

    return (
        <svg width="500" height="500">
            <path
                ref={pathRef}
                d="M100,100 L200,100 L200,200 L100,200 Z"
                fill="blue"
                stroke="black"
            />
        </svg>
    );
}

export default SVGPathDrag;
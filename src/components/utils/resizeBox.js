import React, { useState } from 'react';

const ResizableRectangle = () => {
    const [mousedownPoints, setMousedownPoints] = useState({ x: 0, y: 0 });
    const [rectangleSize, setRectangleSize] = useState({ width: 100, height: 100 });
    const [resizeIconPosition, setResizeIconPosition] = useState({ x: 190, y: 160 });
    const [isResizing, setIsResizing] = useState(false);

    const handleMouseDown = (e) => {
        const target = e.target;
        if (target.id === 'resize') {
            setMousedownPoints({ x: e.clientX, y: e.clientY });
            setIsResizing(true);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
        }
    };

    const handleMouseMove = (e) => {
        if (isResizing) {
            const currentPoints = { x: e.clientX, y: e.clientY };
            const rect = document.getElementById('myrect');
            const w = parseFloat(rect.getAttribute('width'));
            const h = parseFloat(rect.getAttribute('height'));

            const dx = currentPoints.x - mousedownPoints.x;
            const dy = currentPoints.y - mousedownPoints.y;

            setRectangleSize({ width: w + dx, height: h + dy });
            setMousedownPoints(currentPoints);

            updateResizeIcon(dx, dy);
        }
    };

    const updateResizeIcon = (dx, dy) => {
        setResizeIconPosition((prevPosition) => ({
            x: prevPosition.x + dx,
            y: prevPosition.y + dy,
        }));
    };

    const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
    };

    return (
        <div style={{ border: '2px solid', width: '800px' }}>
            <svg
                id="mycanvas"
                width="800px"
                height="500px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                onMouseDown={handleMouseDown}
            >
                <rect
                    id="myrect"
                    fill="black"
                    x="100"
                    y="70"
                    width={rectangleSize.width}
                    height={rectangleSize.height}
                />

                <rect
                    id="resize"
                    fill="red"
                    x={resizeIconPosition.x}
                    y={resizeIconPosition.y}
                    width="20"
                    height="20"
                />
            </svg>
        </div>
    );
};

export default ResizableRectangle;
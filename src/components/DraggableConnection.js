import React, { useEffect, useRef, useState } from 'react';

function ConnectionLine() {
    const rect1Ref = useRef(null);
    const rect2Ref = useRef(null);
    const lineRef = useRef(null);

    const [rect1Position, setRect1Position] = useState({ x: 50, y: 50 });
    const [rect2Position, setRect2Position] = useState({ x: 250, y: 50 });

    const updateConnection = () => {
        const rect1 = rect1Ref.current;
        const rect2 = rect2Ref.current;
        const line = lineRef.current;

        const rect1Box = rect1.getBoundingClientRect();
        const rect2Box = rect2.getBoundingClientRect();

        const x1 = rect1Box.left + rect1Box.width / 2;
        const y1 = rect1Box.top + rect1Box.height / 2;
        const x2 = rect2Box.left + rect2Box.width / 2;
        const y2 = rect2Box.top + rect2Box.height / 2;

        line.setAttributeNS(null, 'x1', x1);
        line.setAttributeNS(null, 'y1', y1);
        line.setAttributeNS(null, 'x2', x2);
        line.setAttributeNS(null, 'y2', y2);
    };

    useEffect(() => {
        // Initial update
        updateConnection();

        // Update the connection line whenever the window is resized
        window.addEventListener('resize', updateConnection);

        return () => {
            // Remove the event listener when the component is unmounted
            window.removeEventListener('resize', updateConnection);
        };
    }, []);

    const handleDrag = (e, rectPosition, setRectPosition) => {
        const rect = e.target;
        const rectBox = rect.getBoundingClientRect();
        const offsetX = e.clientX - rectBox.left;
        const offsetY = e.clientY - rectBox.top;

        const onMouseMove = (event) => {
            const newX = event.clientX - offsetX;
            const newY = event.clientY - offsetY;
            setRectPosition({ x: newX, y: newY });
            updateConnection(); // Update the connection line while dragging
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" height="200">
            <rect
                ref={rect1Ref}
                x={rect1Position.x}
                y={rect1Position.y}
                width="100"
                height="50"
                fill="#007bff"
                onMouseDown={(e) => handleDrag(e, rect1Position, setRect1Position)}
            />
            <rect
                ref={rect2Ref}
                x={rect2Position.x}
                y={rect2Position.y}
                width="80"
                height="60"
                fill="#007bff"
                onMouseDown={(e) => handleDrag(e, rect2Position, setRect2Position)}
            />
            <line ref={lineRef} x1="0" y1="0" x2="0" y2="0" stroke="red" strokeWidth="2" />
        </svg>
    );
}

export default ConnectionLine;

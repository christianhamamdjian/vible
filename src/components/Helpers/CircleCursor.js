import React, { useState, useEffect } from 'react';

const Circle = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        const circle = document.getElementById('circle');
        const circleStyle = circle.style;

        const updateCirclePosition = () => {
            circleStyle.top = `${mousePosition.y - circle.offsetHeight / 2}px`;
            circleStyle.left = `${mousePosition.x - circle.offsetWidth / 2}px`;
        };

        updateCirclePosition();

        const listener = () => {
            window.requestAnimationFrame(updateCirclePosition);
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mousePosition]);

    return (
        <div id="circle" className="circle">
        </div>
    );
};

export default Circle;
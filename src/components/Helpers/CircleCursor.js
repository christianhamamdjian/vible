// import React, { useState, useEffect } from 'react';

// const Circle = () => {
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//     const handleMouseMove = (e) => {
//         setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     useEffect(() => {
//         const circle = document.getElementById('circle');
//         const circleStyle = circle.style;

//         const updateCirclePosition = () => {
//             circleStyle.top = `${mousePosition.y - circle.offsetHeight / 2}px`;
//             circleStyle.left = `${mousePosition.x - circle.offsetWidth / 2}px`;
//         };

//         updateCirclePosition();

//         const listener = () => {
//             window.requestAnimationFrame(updateCirclePosition);
//         };

//         document.addEventListener('pointermove', handleMouseMove);

//         return () => {
//             document.removeEventListener('pointermove', handleMouseMove);
//         };
//     }, [mousePosition]);

//     return (
//         <div id="circle" className="circle">
//         </div>
//     );
// };

// export default Circle;

import React, { useState, useEffect } from 'react';

const Circle = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const handleInteraction = (event) => {
        const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
        const clientY = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;
        setCursorPosition({ x: clientX, y: clientY });
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleInteraction);
        document.addEventListener('touchmove', handleInteraction);

        return () => {
            document.removeEventListener('mousemove', handleInteraction);
            document.removeEventListener('touchmove', handleInteraction);
        };
    }, []);

    return (
        <div
            className="circle-cursor"
            style={{
                position: 'fixed',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                pointerEvents: 'none', // Ensure the cursor doesn't interfere with underlying elements
                transform: `translate(${cursorPosition.x - 8}px, ${cursorPosition.y - 65}px)`,
                transition: 'transform 0.2s ease',
                zIndex: 9999, // Adjust this as needed
            }}
        ></div>
    );
};

export default Circle;
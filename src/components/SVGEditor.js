import React, { useState, useRef } from 'react';

const SVGEditor = () => {
    const svgRef = useRef(null);
    const divRef = useRef(null);
    const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 });
    const [draggingSvg, setDraggingSvg] = useState(false);
    const [svgOffset, setSvgOffset] = useState({ x: 0, y: 0 });
    const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
    const [divSize, setDivSize] = useState({ width: 0, height: 0 });

    const handleSvgPointerDown = (e) => {
        e.preventDefault();
        const { clientX, clientY } = e;
        const svgRect = svgRef.current.getBoundingClientRect();
        const divRect = divRef.current.getBoundingClientRect();
        setSvgOffset({
            x: clientX - svgRect.left + divRect.left - svgPosition.x,
            y: clientY - svgRect.top + divRect.top - svgPosition.y,
        });
        setDraggingSvg(true);
    };

    const handlePointerMove = (e) => {
        e.preventDefault();
        if (!draggingSvg) return;

        const { clientX, clientY } = e;
        const divRect = svgRef.current.getBoundingClientRect();

        const maxX = svgSize.width - divRect.width;
        const maxY = svgSize.height - divRect.height;

        let newX = clientX - svgOffset.x - divRect.left;
        let newY = clientY - svgOffset.y - divRect.top;

        newX = Math.min(0, Math.max(newX, maxX));
        newY = Math.min(0, Math.max(newY, maxY));
        console.log(newX, newY);
        setSvgPosition({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
        setDraggingSvg(false);
    };

    const handleSvgLoad = () => {
        const divRect = svgRef.current.getBoundingClientRect();
        setSvgSize({ width: divRect.width, height: divRect.height });
    };

    const handleDivResize = () => {
        const svgRect = divRef.current.getBoundingClientRect();
        setDivSize({ width: svgRect.width, height: svgRect.height });
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
                <rect x="0" y="0" width="100" height="100" fill="black" />
            </svg>
        </div>
    );
};

export default SVGEditor;


// const svgRef = useRef(null);
// const divRef = useRef(null);
// const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 });
// const [draggingSvg, setDraggingSvg] = useState(false);
// const [offset, setOffset] = useState({ x: 0, y: 0 });
// const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
// const [divSize, setDivSize] = useState({ width: 0, height: 0 });

// const handleSvgPointerDown = (e) => {
//   e.preventDefault();
//   const { clientX, clientY } = e;
//   const svgRect = svgRef.current.getBoundingClientRect();
//   const divRect = divRef.current.getBoundingClientRect();
//   setOffset({
//     x: clientX - svgRect.left,
//     y: clientY - svgRect.top,
//   });
//   setDraggingSvg(true);
// };

// const handlePointerMove = (e) => {
//   e.preventDefault();
//   if (!draggingSvg) return;

//   const { clientX, clientY } = e;
//   const svgRect = svgRef.current.getBoundingClientRect();
//   const divRect = divRef.current.getBoundingClientRect();

//   const maxX = divRect.width - svgRect.width;
//   const maxY = divRect.height - svgRect.height;

//   let newX = clientX - offset.x - divRect.left;
//   let newY = clientY - offset.y - divRect.top;

//   newX = Math.max(0, Math.min(newX, maxX));
//   newY = Math.max(0, Math.min(newY, maxY));

//   setSvgPosition({ x: newX, y: newY });
// };

// const handlePointerUp = () => {
//   setDraggingSvg(false);
// };

// const handleSvgLoad = () => {
//   const svgRect = svgRef.current.getBoundingClientRect();
//   setSvgSize({ width: svgRect.width, height: svgRect.height });
// };

// const handleDivResize = () => {
//   const divRect = divRef.current.getBoundingClientRect();
//   setDivSize({ width: divRect.width, height: divRect.height });
// };

// return (
//   <div
//     ref={divRef}
//     style={{
//       width: '300px',
//       height: '300px',
//       overflow: 'auto',
//       border: '1px solid black',
//       position: 'relative',
//     }}
//     onPointerMove={handlePointerMove}
//     onPointerUp={handlePointerUp}
//     onResize={handleDivResize}
//   >
//     <svg
//       ref={svgRef}
//       width="500"
//       height="500"
//       style={{
//         transform: `translate(${svgPosition.x}px, ${svgPosition.y}px)`,
//         cursor: draggingSvg ? 'grabbing' : 'grab',
//         pointerEvents: draggingSvg ? 'none' : 'auto',
//       }}
//       onPointerDown={handleSvgPointerDown}
//       onLoad={handleSvgLoad}
//     >
//       <rect x="0" y="0" width="500" height="500" fill="lightgray" />
//     </svg>
//   </div>
// );
// };
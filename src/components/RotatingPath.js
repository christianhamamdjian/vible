import React, { useState, useRef } from 'react';

const RotatingPath = () => {
    const [drawing, setDrawing] = useState('');
    const [rotation, setRotation] = useState(0);
    const svgRef = useRef();
    const drawingRef = useRef();

    const handleMouseDown = (event) => {
        const { clientX, clientY } = event;
        const svg = svgRef.current;
        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

        setDrawing(`M${svgPoint.x},${svgPoint.y}`);
    };

    const handleMouseMove = (event) => {
        if (event.buttons !== 1) return; // Only draw when mouse button is pressed

        const { clientX, clientY } = event;
        const svg = svgRef.current;
        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

        setDrawing((prevDrawing) => `${prevDrawing} L${svgPoint.x},${svgPoint.y}`);
    };

    const handleMouseUp = () => {
        setDrawing((prevDrawing) => `${prevDrawing} Z`);
    };

    const handleRotationChange = (event) => {
        setRotation(parseInt(event.target.value));
    };

    const getDrawingCenter = () => {
        const path = drawingRef.current;
        if (!path) return { x: 0, y: 0 };

        const pathBBox = path.getBBox();
        const centerX = pathBBox.x + pathBBox.width / 2;
        const centerY = pathBBox.y + pathBBox.height / 2;
        return { x: centerX, y: centerY };
    };

    return (
        <div>
            <input
                type="range"
                min="0"
                max="360"
                value={rotation}
                onChange={handleRotationChange}
            />

            <svg
                ref={svgRef}
                width="400"
                height="400"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <g transform={`rotate(${rotation} ${getDrawingCenter().x} ${getDrawingCenter().y})`}>
                    <path
                        ref={drawingRef}
                        d={drawing}
                        fill="none"
                        stroke="black"
                    />
                </g>
            </svg>
        </div>
    );
};


export default RotatingPath;



// import React, { useState, useRef } from 'react';

// const SvgDrawingApp = () => {
//   const [drawing, setDrawing] = useState('');
//   const [rotation, setRotation] = useState(0);
//   const [scale, setScale] = useState(1);
//   const [translateX, setTranslateX] = useState(0);
//   const [translateY, setTranslateY] = useState(0);
//   const svgRef = useRef();
//   const drawingRef = useRef();

//   const handleMouseDown = (event) => {
//     const { clientX, clientY } = event;
//     const svg = svgRef.current;
//     const pt = svg.createSVGPoint();
//     pt.x = clientX;
//     pt.y = clientY;
//     const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

//     setDrawing(`M${svgPoint.x},${svgPoint.y}`);
//   };

//   const handleMouseMove = (event) => {
//     if (event.buttons !== 1) return; // Only draw when mouse button is pressed

//     const { clientX, clientY } = event;
//     const svg = svgRef.current;
//     const pt = svg.createSVGPoint();
//     pt.x = clientX;
//     pt.y = clientY;
//     const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

//     setDrawing((prevDrawing) => `${prevDrawing} L${svgPoint.x},${svgPoint.y}`);
//   };

//   const handleMouseUp = () => {
//     setDrawing((prevDrawing) => `${prevDrawing} Z`);
//   };

//   const handleRotationChange = (event) => {
//     setRotation(parseInt(event.target.value));
//   };

//   const handleScaleChange = (event) => {
//     setScale(parseFloat(event.target.value));
//   };

//   const handleTranslateXChange = (event) => {
//     setTranslateX(parseInt(event.target.value));
//   };

//   const handleTranslateYChange = (event) => {
//     setTranslateY(parseInt(event.target.value));
//   };

//   const getDrawingCenter = () => {
//     const path = drawingRef.current;
//     if (!path) return { x: 0, y: 0 };

//     const pathBBox = path.getBBox();
//     const centerX = pathBBox.x + pathBBox.width / 2;
//     const centerY = pathBBox.y + pathBBox.height / 2;
//     return { x: centerX, y: centerY };
//   };

//   return (
//     <div>
//       <input
//         type="range"
//         min="0"
//         max="360"
//         value={rotation}
//         onChange={handleRotationChange}
//       />

//       <input
//         type="range"
//         min="0.1"
//         max="2"
//         step="0.1"
//         value={scale}
//         onChange={handleScaleChange}
//       />

//       <input
//         type="range"
//         min="-200"
//         max="200"
//         value={translateX}
//         onChange={handleTranslateXChange}
//       />

//       <input
//         type="range"
//         min="-200"
//         max="200"
//         value={translateY}
//         onChange={handleTranslateYChange}
//       />

//       <svg
//         ref={svgRef}
//         width="400"
//         height="400"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       >
//         <g
//           transform={`rotate(${rotation} ${getDrawingCenter().x} ${getDrawingCenter().y}) 
//                       scale(${scale})
//                       translate(${translateX}, ${translateY})`}
//         >
//           <path
//             ref={drawingRef}
//             d={drawing}
//             fill="none"
//             stroke="black"
//           />
//         </g>
//       </svg>
//     </div>
//   );
// };

// export default SvgDrawingApp;
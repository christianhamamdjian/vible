import React, { useRef, useState } from 'react';

function Drawing() {
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    const [paths, setPaths] = useState([]);
    const [color, setColor] = useState('#000');
    const svgRef = useRef(null);

    const handleMouseDown = (event) => {
        setIsDrawing(true);
        const { x, y } = getCursorPosition(event);
        setCurrentPath(`M${x} ${y}`);
    };

    const handleMouseMove = (event) => {
        if (!isDrawing) return;
        const { x, y } = getCursorPosition(event);
        setCurrentPath((prevPath) => `${prevPath} L${x} ${y}`);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        setPaths((prevPaths) => [...prevPaths, { path: currentPath, color }]);
        setCurrentPath('');
    };

    const getCursorPosition = (event) => {
        const { left, top } = svgRef.current.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;
        return { x, y };
    };

    const handleDownload = () => {
        const svgBlob = new Blob([svgRef.current.outerHTML], { type: 'image/svg+xml' });
        const svgURL = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgURL;
        downloadLink.download = 'drawing.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgURL);
    };

    return (
        <div>
            <div>
                <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
            </div>
            <svg
                height={600}
                width={800}
                ref={svgRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ border: '1px solid black' }}
            >
                {paths.map((path, index) => (
                    <path key={index} d={path.path} stroke={path.color} fill="none" strokeWidth="2" />
                ))}
                {currentPath && (
                    <path d={currentPath} stroke={color} fill="none" strokeWidth="2" />
                )}
            </svg>
            <button onClick={handleDownload}>Download SVG</button>
        </div>
    );
}


export default Drawing;



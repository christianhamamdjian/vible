import React, { useState, useEffect, useRef, useReducer } from 'react';

function SvgRotate() {

    const [drawing, setDrawing] = useState(false);
    const [paths, setPaths] = useState(loadPathsFromLocalStorage() || []);
    const [rotation, setRotation] = useState([]);
    const [scaling, setScaling] = useState([]);
    const [selectedPath, setSelectedPath] = useState(null);
    const svgRef = useRef(null);

    function savePathsToLocalStorage() {
        const savingPaths = paths.map(path => ([`M${path.map((point) => `${point.x} ${point.y}`).join(' L')}`]))
        localStorage.setItem('svgPaths', JSON.stringify(savingPaths));
    };

    function loadPathsFromLocalStorage() {
        const savedPaths = localStorage.getItem('svgPaths');
        const pathList = savedPaths && JSON.parse(savedPaths)
        const convertedPaths = pathList && pathList.map(path => {
            const singlePath = path.map(d => convertFromSVGPath(d))
            return singlePath[0]
        })
        return convertedPaths
    };
    // From locaStorage 
    function convertFromSVGPath(d) {
        const commands = d.split(/[A-Za-z]/).filter(Boolean);
        const points = [];

        commands.forEach((command) => {
            const values = command.trim().split(/[\s,]+/).filter(Boolean);

            for (let i = 0; i < values.length; i += 2) {
                const x = parseFloat(values[i]);
                const y = parseFloat(values[i + 1]);
                points.push({ x, y });
            }
        });
        return points;
    };
    useEffect(() => {
        loadPathsFromLocalStorage();
    }, []);

    useEffect(() => {
        savePathsToLocalStorage();
    }, [paths]);

    const handleMouseDown = (event) => {
        const { clientX, clientY } = event;
        const svgPoint = svgRef.current.createSVGPoint();
        svgPoint.x = clientX;
        svgPoint.y = clientY;
        const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse());

        if (!drawing) {
            setSelectedPath(null)
            setDrawing(true);
            setPaths([...paths, [transformedPoint]]);
        }
    };

    const handleMouseMove = (event) => {
        if (!drawing) return;

        const { clientX, clientY } = event;
        const svgPoint = svgRef.current.createSVGPoint();
        svgPoint.x = clientX;
        svgPoint.y = clientY;
        const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse());

        const currentPath = [...paths[paths.length - 1]];
        currentPath.push(transformedPoint);
        const updatedPaths = [...paths];
        updatedPaths[paths.length - 1] = currentPath;
        setPaths(updatedPaths);
    };

    const handleMouseUp = () => {
        if (drawing) {
            setDrawing(false);
        }
    };

    const handlePathClick = (index) => {
        setSelectedPath(index);
    };

    const handlePathDrag = (event) => {
        event.stopPropagation();
        const startX = event.clientX || event.touches[0].clientX;
        const startY = event.clientY || event.touches[0].clientY;

        const handleMouseMove = (event) => {
            event.preventDefault();
            const currentX = event.clientX || event.touches[0].clientX;
            const currentY = event.clientY || event.touches[0].clientY;
            const deltaX = currentX - startX;
            const deltaY = currentY - startY;

            if (selectedPath !== null) {
                const updatedPaths = paths.map((path, index) => {
                    if (index === selectedPath) {
                        return path.map((point) => ({
                            x: point.x + deltaX,
                            y: point.y + deltaY,
                        }));
                    }
                    return path;
                });

                setPaths(updatedPaths);
            }
        };

        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('touchend', handleMouseUp);
    };

    const handleRotateChange = (event) => {
        const rotate = parseInt(event.target.value);
        const updatedPaths = paths.map((path, index) => {
            if (index === selectedPath) {
                const center = getCenterPoint(path);
                return rotatePath(path, center, rotate);
            }
            return path;
        });
        setRotation(rotate)
        setPaths(updatedPaths);
    };

    const handleScaleChange = (event) => {
        const scale = parseFloat(event.target.value);
        const updatedPaths = paths.map((path, index) => {
            if (index === selectedPath) {
                const center = getCenterPoint(path);
                return scalePath(path, center, scale);
            }
            return path;
        });
        setScaling(scale)
        setPaths(updatedPaths);
    };



    const getCenterPoint = (points) => {
        const bounds = points.reduce(
            (acc, point) => {
                acc.minX = Math.min(acc.minX, point.x);
                acc.maxX = Math.max(acc.maxX, point.x);
                acc.minY = Math.min(acc.minY, point.y);
                acc.maxY = Math.max(acc.maxY, point.y);
                return acc;
            },
            {
                minX: Number.POSITIVE_INFINITY,
                maxX: Number.NEGATIVE_INFINITY,
                minY: Number.POSITIVE_INFINITY,
                maxY: Number.NEGATIVE_INFINITY,
            }
        );

        return {
            x: (bounds.minX + bounds.maxX) / 2,
            y: (bounds.minY + bounds.maxY) / 2,
        };
    };

    const rotatePath = (points, center, angle) => {
        const radians = (angle * Math.PI) / 180;
        return points.map((point) => {
            const translatedPoint = {
                x: point.x - center.x,
                y: point.y - center.y,
            };
            const rotatedPoint = {
                x: translatedPoint.x * Math.cos(radians) - translatedPoint.y * Math.sin(radians),
                y: translatedPoint.x * Math.sin(radians) + translatedPoint.y * Math.cos(radians),
            };
            return {
                x: rotatedPoint.x + center.x,
                y: rotatedPoint.y + center.y,
            };
        });
    };

    const scalePath = (points, center, scale) => {
        return points.map((point) => {
            const scaledPoint = {
                x: center.x + (point.x - center.x) * scale,
                y: center.y + (point.y - center.y) * scale,
            };
            return scaledPoint;
        });
    };

    return (
        <div>
            <svg
                ref={svgRef}
                width="1000"
                height="1000"
                // onMouseDown={handleMouseDown}
                // onMouseMove={handleMouseMove}
                // onMouseUp={handleMouseUp}
                // onTouchStart={handleMouseDown}
                // onTouchMove={handleMouseMove}
                // onTouchEnd={handleMouseUp}
                onPointerDown={handleMouseDown}
                onPointerMove={handleMouseMove}
                onPointerUp={handleMouseUp}
            >
                {paths.map((path, index) => (
                    <path
                        key={index}
                        d={`M${path.map((point) => `${point.x} ${point.y}`).join(' L')}`}
                        fill="none"
                        stroke={index === selectedPath ? 'red' : 'black'}
                        strokeWidth="2"
                        onClick={() => handlePathClick(index)}
                        // onMouseDown={handlePathDrag}
                        // onTouchStart={handlePathDrag}
                        onPointerDown={handlePathDrag}
                    />
                ))}
            </svg>
            <div>
                <h3>Selected Path:</h3>
                {selectedPath !== null ? (
                    <>
                        <div>
                            <label htmlFor="rotate">Rotate:</label>
                            <input
                                type="range"
                                id="rotate"
                                min="0"
                                max="360"
                                step="1"
                                value={rotation || 0} // replace with the actual rotate value of the selected path
                                onChange={handleRotateChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="scale">Scale:</label>
                            <input
                                type="range"
                                id="scale"
                                min="0.1"
                                max="2"
                                step="0.1"
                                value={scaling || 1} // replace with the actual scale value of the selected path
                                onChange={handleScaleChange}
                            />
                        </div>
                    </>
                ) : (
                    <p>No path selected.</p>
                )}
            </div>
        </div>
    );
}

export default SvgRotate
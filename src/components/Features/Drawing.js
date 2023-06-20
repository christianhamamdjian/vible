import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Drawing = () => {
    const { paths, selectedPath, handlePathClick, handlePathDrag, isDrawing, currentPath, pathColor, pathLine, isErasing, handleDeletePath, handleMouseDown, handleMouseUp, pathRef } = React.useContext(MoodboardContext);

    return (
        <>
            {/* {paths.map((path, index) => (
                <path
                    key={index}
                    data-index={path.id}
                    className='draggable'
                    x={path.x}
                    y={path.y}
                    d={path.path}
                    ref={pathRef}
                    stroke={path.color}
                    fill="none"
                    strokeWidth={path.line}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    draggable="true"
                    onMouseDown={isErasing ? (() => handleDeletePath(path)) : ((event) => handleMouseDown(event, path))}
                    onMouseUp={handleMouseUp}
                    onTouchStart={(e) => handleMouseDown(e, path)}
                    onTouchEnd={isErasing ? (() => handleDeletePath(path)) : null}
                    transform={
                        `
                        translate(${path.x},${path.y}) 
                        rotate(${path.angle})  
                        scale(${path.scale})
                        `
                    }
                    transform-origin={`${path.centerX} ${path.centerY}`}
                    style={{
                        cursor: 'crosshair',
                    }}
                />
            ))}
            {
                isDrawing && currentPath && (
                    <path
                        d={currentPath}
                        stroke={pathColor}
                        fill="none"
                        strokeWidth={pathLine}
                    />)
            } */}
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
        </>)
}
export default Drawing
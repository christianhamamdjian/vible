import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Drawing = () => {
    const { paths, currentPath, color, line, isErasing, isDrawing, handleDeletePath, handleMouseDown } = React.useContext(MoodboardContext);
    return (
        <>
            {paths.map((path, index) => (
                <path
                    className='path'
                    key={index}
                    d={path.path}
                    stroke={path.color}
                    fill="none"
                    strokeWidth={path.line}
                    draggable="true"
                    transform={`translate(${path.x || 0},${path.y || 0})`}
                    onMouseDown={isErasing ? (() => handleDeletePath(path)) : ((e) => handleMouseDown(e, path))}
                    cursor={"grab"}
                />
            ))}
            {currentPath && (
                <path
                    d={currentPath}
                    stroke={color}
                    fill="none"
                    strokeWidth={line}
                />)}
        </>)
}
export default Drawing
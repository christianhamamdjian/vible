import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Drawing = () => {
    const { paths, currentPath, color, line, isErasing, handleDeletePath, handleMouseDown } = React.useContext(MoodboardContext);
    return (
        <>
            {paths.map((path, index) => (
                <g key={index} transform={`translate(${path.x},${path.y})`}>
                    <path
                        className='draggable'
                        d={path.path}
                        stroke={path.color}
                        fill="none"
                        strokeWidth={path.line}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        draggable="true"
                        onMouseDown={isErasing ? (() => handleDeletePath(path)) : ((e) => handleMouseDown(e, path))}
                        onTouchStart={(e) => handleMouseDown(e, path)}
                        onTouchEnd={isErasing ? (() => handleDeletePath(path)) : null}
                        cursor={"grab"}
                    />
                </g>
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
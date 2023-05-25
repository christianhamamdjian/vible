import React from 'react';
import { MoodboardContext } from "../../context/moodboard";

const Drawing = () => {
    const { paths, currentPath, color, line, erasing, handleDeletePath } = React.useContext(MoodboardContext);
    return (
        <>
            {paths.map((path, index) => (
                <path
                    key={index}
                    d={path.path}
                    stroke={path.color}
                    fill="none"
                    strokeWidth={path.line}
                    draggable="true"
                    onMouseDown={erasing ? (() => handleDeletePath(path)) : null}
                    onDragOver={erasing ? (() => handleDeletePath(path)) : null}
                    cursor={erasing ? "grab" : "move"}
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
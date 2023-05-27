import React from 'react';
import { MoodboardContext } from "../../context/moodboard";

const Drawing = () => {
    const { paths, currentPath, color, line, erasing, handleDeletePath, handleMouseDown } = React.useContext(MoodboardContext);
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
                    onMouseDown={erasing ? (() => handleDeletePath(path)) : ((e) => handleMouseDown(e, path))}
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
import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Drawing = () => {
    const { paths, currentPath, color, line, erasing, isDrawing, handleDeletePath, handleMouseDown } = React.useContext(MoodboardContext);
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
                    onMouseDown={erasing ? (() => handleDeletePath(path)) : ((e) => handleMouseDown(e, path))}
                    //onMouseLeave={erasing && !isDrawing ? (() => handleDeletePath(path)) : null}
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
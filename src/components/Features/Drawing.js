import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Drawing = () => {
    const { paths, selectedPath, handlePathClick, handlePathDrag, pathColor, pathLine } = React.useContext(MoodboardContext);
    return (
        <>
            {paths.map((path, index) => (
                <path
                    key={index}
                    d={`M${path["path"].map((point) => `${point.x} ${point.y}`).join(' L')}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke={index === selectedPath ? 'red' : `${path.color}`}
                    strokeWidth={path.line}
                    onClick={() => handlePathClick(index, path.id)}
                    onPointerDown={handlePathDrag}
                />
            ))}
        </>)
}
export default Drawing
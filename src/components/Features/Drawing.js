import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Drawing = () => {
    const { paths, selectedPath, handlePathClick, handlePathDrag } = React.useContext(MoodboardContext);

    return (
        <>
            {paths.map((path, index) => (
                <path
                    key={index}
                    d={`M${path.map((point) => `${point.x} ${point.y}`).join(' L')}`}
                    fill="none"
                    stroke={index === selectedPath ? 'red' : 'black'}
                    strokeWidth="2"
                    onClick={() => handlePathClick(index)}
                    onPointerDown={handlePathDrag}
                />
            ))}
        </>)
}
export default Drawing
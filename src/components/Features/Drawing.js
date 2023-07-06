import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Drawing = () => {
    const { paths, selectedPath, handlePathClick, handlePathDrag } = React.useContext(MoodboardContext);
    return (
        <>
            {paths.map((path, index) => (
                <path
                    key={index}
                    d={`M${path["path"].map((point) => `${point.x} ${point.y}`).join(' L')}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke={path.color}
                    strokeWidth={path.line}
                    onClick={() => handlePathClick(index, path.id)}
                    onPointerDown={handlePathDrag}
                    onTouchStart={handlePathDrag}
                    // onTouchMove={handlePathDrag}
                    style={{
                        cursor: 'grabbing',
                        filter: `${index === selectedPath ? 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))' : 'none'} `
                    }}
                />
            ))}
        </>)
}
export default Drawing
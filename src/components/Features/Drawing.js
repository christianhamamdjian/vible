import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";
import svgPath from '../Helpers/pathSmooth';

const Drawing = () => {
    const { paths, selectedPath, handlePathClick, handlePathDrag } = React.useContext(MoodboardContext);
    return (
        <>
            {paths.map((path, index) => (
                <path
                    key={index}
                    // d={svgPath(path["path"])} // Line smoothing to be fixed
                    d={`M${path["path"].map((point) => `${point.x} ${point.y}`).join(' L')}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke={path.color}
                    strokeWidth={path.line}
                    onDoubleClick={() => handlePathClick(index, path.id)}
                    onPointerDown={(e) => handlePathDrag(e, index, path.id)}
                    onTouchStart={(e) => handlePathDrag(e, index, path.id)}
                    style={{
                        cursor: 'grabbing',
                        filter: `${index === selectedPath ? 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))' : 'none'} `
                    }}
                />
            ))}
        </>)
}
export default Drawing
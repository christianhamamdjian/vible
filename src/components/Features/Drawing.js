import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";
// import svgPath from '../Helpers/pathSmooth';

const Drawing = () => {
    const { paths, selectedPath, handlePathClick, handlePathDrag, handlePathSelect } = React.useContext(MoodboardContext);
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
                    onClick={(e) => handlePathClick(e, index, path.id)}
                    onPointerDown={(e) => handlePathDrag(e, index, path.id)}
                    onPointerMove={(e) => handlePathSelect(e, index, path.id)}
                    onTouchStart={(e) => handlePathDrag(e, index, path.id)}
                    cursor="grabbing"
                    style={{
                        cursor: 'grabbing',
                        pointerEvents: "auto",
                        filter: `${index === selectedPath ? 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))' : 'none'} `
                    }}
                />
            ))}
        </>)
}
export default Drawing
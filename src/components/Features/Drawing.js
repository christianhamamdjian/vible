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
                    d={svgPath(path["path"])}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke={path.color}
                    strokeWidth={path.line}
                    onClick={() => handlePathClick(index, path.id)}
                    onPointerDown={handlePathDrag}
                    onTouchStart={handlePathDrag}
                    style={{
                        cursor: 'grabbing',
                        filter: `${index === selectedPath ? 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))' : 'none'} `
                    }}
                />
            ))}
        </>)
}
export default Drawing
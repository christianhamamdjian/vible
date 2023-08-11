import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";
// import svgPath from '../Helpers/pathSmooth';

const Drawing = () => {
    const { paths, selectedPath, handlePathClick, handlePathDrag, handlePathSelect } = React.useContext(MoodboardContext);

    const renderPath = (points) => {
        if (points.length < 2) return null

        let pathData = `M ${points[0].x} ${points[0].y}`

        for (let i = 1; i < points.length - 1; i++) {
            const x = (points[i].x + points[i + 1].x) / 2
            const y = (points[i].y + points[i + 1].y) / 2
            pathData += ` Q ${points[i].x} ${points[i].y}, ${x} ${y}`
        }

        pathData += ` T ${points[points.length - 1].x} ${points[points.length - 1].y}`

        return pathData
    }

    return (
        <>
            {paths.map((path, index) => (
                <path
                    key={index}
                    // d={svgPath(path["path"])} // Line smoothing to be fixed
                    //d={`M${path["path"].map((point) => `${point.x} ${point.y}`).join(' L')}`}
                    d={`${renderPath(path["path"])} ${path.closed ? "Z" : ""}`}
                    fill={path.closed ? path.fill : "none"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke={path.group === "activeGroup" ? "red" : path.color}
                    strokeWidth={path.line}
                    //onClick={(e) => handlePathClick(e, index, path.id)}
                    onPointerDown={(e) => path.group !== "activeGroup" && handlePathDrag(e, index, path.id)}
                    onPointerMove={(e) => handlePathSelect(e, index, path.id)}
                    onTouchStart={(e) => path.group !== "activeGroup" && handlePathDrag(e, index, path.id)}
                    cursor="grabbing"
                    style={{
                        cursor: 'grabbing',
                        pointerEvents: "auto",
                        filter: `${index === selectedPath ? 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))' : 'none'} `,
                        userSelect: "none"
                    }}
                />
            ))}
        </>)
}
export default Drawing
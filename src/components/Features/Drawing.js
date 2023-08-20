import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";
// import svgPath from '../Helpers/pathSmooth';

const Drawing = () => {
    const { paths, selectedPath, handlePathClick, handlePathDrag, handlePathSelect, handlePathGroupDrag } = React.useContext(MoodboardContext);

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
                <>
                    <defs>
                        <marker id="startarrow" markerWidth="10" markerHeight="7"
                            refX="10" refY="3.5" orient="auto">
                            <polygon
                                points="10 0, 10 7, 0 3.5"
                                //fill={path.group === "activeGroup" ? "red" : path.color}
                                fill={path.color}
                            />
                        </marker>
                        <marker id="endarrow" markerWidth="10" markerHeight="7"
                            refX="0" refY="3.5" orient="auto" markerUnits="strokeWidth">
                            <polygon
                                points="0 0, 10 3.5, 0 7"
                                // fill={path.group === "activeGroup" ? "red" : path.color}
                                fill={path.color}
                            />
                        </marker>
                    </defs>
                    <path
                        // key={index}
                        key={Date.now()}
                        // d={svgPath(path["path"])} // Line smoothing to be fixed
                        //d={`M${path["path"].map((point) => `${point.x} ${point.y}`).join(' L')}`}
                        d={`${renderPath(path["path"])} ${path.closed ? "Z" : ""}`}
                        fill={path.closed ? path.fill : "none"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray={path.dashed && "10,10"}
                        markerEnd={path.arrowEnd && "url(#endarrow)"}
                        markerStart={path.arrowStart && "url(#endarrow)"}
                        stroke={path.group === "activeGroup" ? "red" : path.color}
                        strokeWidth={path.line}
                        //onClick={(e) => handlePathClick(e, index, path.id)}
                        onPointerDown={(e) => path.group !== "activeGroup" ? handlePathDrag(e, index, path.id) : handlePathGroupDrag(e)}
                        onPointerMove={(e) => handlePathSelect(e, index, path.id)}
                        onTouchStart={(e) => path.group !== "activeGroup" && handlePathDrag(e, index, path.id)}
                        cursor="grabbing"
                        style={{
                            cursor: 'grabbing',
                            pointerEvents: "auto",
                            filter: `${index === selectedPath ? 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))' : 'none'} `,
                            userSelect: "none",
                            opacity: path.opacity
                        }}
                    />
                </>
            ))}
        </>)
}
export default Drawing
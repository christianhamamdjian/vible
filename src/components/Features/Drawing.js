import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";
import renderPath from '../helpers/pathSmooth';

const Drawing = () => {
    const { paths, pathRef, selectedPath, handlePathDrag, handlePathSelect, handlePathGroupDrag } = React.useContext(MoodboardContext);

    return (
        <>
            {paths.length > 0 && paths.map((path, index) => (
                <g key={index}>
                    <defs>
                        <marker key={path.id} id={`startarrow-${path.id + 1}`} markerWidth="10" markerHeight="7"
                            refX="10" refY="3.5" orient="auto" >
                            <polygon
                                points="10 0, 10 7, 0 3.5"
                                fill={path.color}
                            />
                        </marker>
                        <marker key={path.id + 1} id={`endarrow-${path.id}`} markerWidth="10" markerHeight="7"
                            refX="0" refY="3.5" orient="auto" markerUnits="strokeWidth" >
                            <polygon
                                points="0 0, 10 3.5, 0 7"
                                fill={path.color}
                            />
                        </marker>
                    </defs>
                    <path
                        key={index}
                        ref={pathRef}
                        // d={svgPath(path["path"])} // Line smoothing to be fixed
                        //d={`M${path["path"].map((point) => `${point.x} ${point.y}`).join(' L')}`}
                        d={`${renderPath(path["path"])} ${path.closed ? "Z" : ""}`}
                        fill={path.closed ? path.fill : "none"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray={path.dashed ? "10,10" : null}
                        markerEnd={path.arrowEnd ? `url(#endarrow-${path.id})` : null}
                        markerStart={path.arrowStart ? `url(#startarrow-${path.id + 1})` : null}
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
                </g>
            ))}
        </>)
}
export default Drawing
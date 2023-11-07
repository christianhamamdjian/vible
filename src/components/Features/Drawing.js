import React from 'react';
//import pencilPattern from '../../assets/crayon-scribble-textures.png';
import { MoodboardContext } from "../../context/moodboardContext";
import renderPath from '../helperFunctions/pathSmooth';

const Drawing = () => {
    const { activeBoard, paths, pathRef, selectedPath, handlePathDrag, handlePathSelect, handlePathGroupDrag, tempPath } = React.useContext(MoodboardContext);
    const firstGroupPath = paths.filter(el => el.group === "activeGroup")
    return (
        <>
            {tempPath && <path
                d={`${renderPath(tempPath["path"])}`}
                fill={tempPath.closed ? tempPath.fill : "none"}
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke={tempPath.color}
                strokeWidth={tempPath.line}
            />}
            {paths.length > 0 && paths.map((path, index) => (
                <g key={index}>
                    {path.board === activeBoard.id && <>  <defs>
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
                        {/* <pattern id="patt" patternUnits="userSpaceOnUse" width="30" height="30">
                            <image href={pencilPattern} x="0" y="0" width="80" height="80" />
                        </pattern>

                        <pattern id="texture_diagonal" x="0" y="0" width="6%" height="2%" patternUnits="objectBoundingBox">
                            <path d="M 0 0 l 12 22" style={{ strokeWidth: ".1rem", stroke: "black", fill: "none" }} />
                        </pattern> */}

                    </defs>
                        <path
                            key={index}
                            className='drawing-path'
                            style={{
                                filter: `${index === selectedPath ? 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))' : 'none'} `,
                                opacity: path.opacity
                            }}
                            id={path.id}
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
                            // stroke="url(#patt)"
                            // stroke="url(#texture_diagonal)"
                            strokeWidth={path.line}
                            onPointerDown={(e) => path.group !== "activeGroup" ? handlePathDrag(e, index, path.id) : handlePathGroupDrag(e)}
                            onTouchStart={(e) => path.group !== "activeGroup" ? handlePathDrag(e, index, path.id) : handlePathGroupDrag(e)}
                            onPointerMove={(e) => handlePathSelect(e, index, path.id)}
                            onTouchMove={(e) => handlePathSelect(e, index, path.id)}
                            cursor="grabbing"
                        />
                        {path.group === "activeGroup" && path.id === firstGroupPath[0].id &&
                            <>
                                <circle
                                    id="move"
                                    fill="#cccccc"
                                    cx={path?.["path"][0]["x"]}
                                    cy={path?.["path"][0]["y"]}
                                    style={{ opacity: ".8" }}
                                    r="30"
                                    onPointerDown={(e) => handlePathGroupDrag(e)}
                                    onTouchStart={(e) => handlePathGroupDrag(e)}
                                />
                                <circle
                                    id="move"
                                    fill="#ffffff"
                                    cx={path?.["path"][0]["x"]}
                                    cy={path?.["path"][0]["y"]}
                                    style={{ opacity: ".6" }}
                                    r="25"
                                    onPointerDown={(e) => handlePathGroupDrag(e)}
                                    onTouchStart={(e) => handlePathGroupDrag(e)}
                                />
                                {/* <rect
                                    id="move"
                                    fill="#ffffff"
                                    x={path?.["path"][0]["x"] - 20}
                                    y={path?.["path"][0]["y"] - 20}
                                    width="40"
                                    height="40"
                                    style={{ opacity: ".6" }}
                                    rx="12"
                                    onPointerDown={(e) => handlePathGroupDrag(e)}
                                    onTouchStart={(e) => handlePathGroupDrag(e)}
                                /> */}
                            </>
                        }
                    </>
                    } </g>
            ))}
        </>
    )
}
export default Drawing
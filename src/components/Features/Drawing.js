import React, { useState, useRef } from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Drawing = () => {
    const { paths, handleEditPath, dragOffsetPath, isEditingPath, currentPath, color, line, isErasing, handleDeletePath, handleMouseDown, handleMouseUp } = React.useContext(MoodboardContext);
    //const [pathClicked, setPathClicked] = useState(null)
    //const [rotation, setRotation] = useState("220")
    //const [circlePosition, setCirclePosition] = useState({})
    //const handlePathClicked = (event, path) => {
    //     let svg = event.target
    //     let CTM = svg.getScreenCTM();
    //     setCirclePosition({ x: ((event.clientX - CTM.e)), y: ((event.clientY - CTM.f)) })
    //     setPathClicked(path)
    // }
    const pathRef = useRef();
    const getDrawingCenter = (path) => {
        if (!path) return
        const pathBBox = path.getBBox();
        const centerX = pathBBox.x + pathBBox.width / 2;
        const centerY = pathBBox.y + pathBBox.height / 2;
        console.log(centerX, centerY);
        return { x: centerX, y: centerY };
    };
    return (
        <>
            {paths.map((path, index) => (
                <g
                    key={index}
                    // transform={`translate(${path.x || 0},${path.y || 0})`}
                    transform={`translate(${path.x || 0},${path.y || 0})`}
                    // `rotate(${path.angle} ${getDrawingCenter()} `
                    //`rotate(${path.angle} ${getDrawingCenter(path && pathRef.current).x} ${getDrawingCenter(path && pathRef.current).y})`

                    //cursor={"crosshair"}
                    style={{
                        cursor: 'crosshair',
                        // transform: pathRef.current && `rotate(${path.angle} ${getDrawingCenter(pathRef.current).x} ${getDrawingCenter(pathRef.current).y})`
                        //transform: `rotate(${path.angle}deg) ${path.x}, ${path.y}`,
                        // transformOrigin: `${(path.x + path.width) / 2} ${(path.y + path.height) / 2}`,
                        //transformOrigin: `${path.x}, ${path.y}`,
                        // transform: `scale(${path.angle})`
                    }}
                >
                    {/* {pathClicked && pathClicked.id === path.id ?
                        <>
                            <circle
                                cx={circlePosition.x}
                                cy={circlePosition.y}
                                r="8"
                                fill="red"
                                stroke="white"
                                strokeWidth="2"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleDeletePath(path)}
                            />
                            <circle
                                cx={circlePosition.x + 20}
                                cy={circlePosition.y}
                                r="8"
                                fill="orange"
                                stroke="white"
                                strokeWidth="2"
                                style={{ cursor: 'pointer' }}
                                //onMouseDown={() => setPathClicked(null)}
                                onClick={(event) => handleEditPath(event, path.id)}
                            />
                            <circle
                                cx={circlePosition.x + 40}
                                cy={circlePosition.y}
                                r="8"
                                fill="green"
                                draggable="true"
                                stroke="white"
                                strokeWidth="2"
                                style={{ cursor: 'move' }}
                                onMouseDown={(event) => handleMouseDown(event, path)}
                                onTouchStart={(e) => handleMouseDown(e, path)}
                            />
                        </> : null} */}
                    <path
                        className='draggable'
                        x={path.x}
                        y={path.y}
                        d={path.path}
                        ref={pathRef}
                        //transform="scale(2.0)"
                        //stroke={`${pathClicked && pathClicked.id === path.id ? "red" : path.color}`}
                        stroke={path.color}
                        fill="none"
                        strokeWidth={path.line}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        draggable="true"
                        onMouseDown={isErasing ? (() => handleDeletePath(path)) : ((event) => handleMouseDown(event, path))}
                        //onMouseOut={() => handleDeletePath(path)}
                        onMouseUp={handleMouseUp}
                        onTouchStart={(e) => handleMouseDown(e, path)}
                        onTouchEnd={isErasing ? (() => handleDeletePath(path)) : null}
                        onClick={(event) => handleEditPath(event, path.id)}
                        //onClick={(e) => handlePathClicked(e, path)}
                        transform={pathRef.current && `rotate(${path.angle} ${getDrawingCenter(pathRef.current).x} ${getDrawingCenter(pathRef.current).y})`}
                        style={{
                            cursor: 'crosshair',
                            //transform: `rotate(${path.angle}deg)`,
                            //transform: `rotate(${path.angle} ${getDrawingCenter(path && pathRef.current).x} ${getDrawingCenter(path && pathRef.current).y})`,
                            // `translate(${path.x || 0},${path.y || 0})`

                            //transformOrigin: `${(path.x + path.width) / 2} ${(path.y + path.height) / 2}`,
                            //transformOrigin: `center`,
                            // transform: `scale(${path.angle})`
                        }}
                    ></path>
                </g >
            ))}
            {
                currentPath && (
                    <path
                        d={currentPath}
                        stroke={color}
                        fill="none"
                        strokeWidth={line}
                    />)
            }
        </>)
}
export default Drawing
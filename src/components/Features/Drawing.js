import React, { useState } from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Drawing = () => {
    const { paths, currentPath, color, line, isErasing, handleDeletePath, handleMouseDown, handleMouseUp } = React.useContext(MoodboardContext);
    const [pathClicked, setPathClicked] = useState(null)
    const [rotation, setRotation] = useState("220")
    const [circlePosition, setCirclePosition] = useState({})
    const handlePathClicked = (event, path) => {
        let svg = event.target
        let CTM = svg.getScreenCTM();
        setCirclePosition({ x: ((event.clientX - CTM.e)), y: ((event.clientY - CTM.f)) })
        setPathClicked(path)
    }
    return (
        <>
            {paths.map((path, index) => (
                <g
                    key={index}
                    transform={`translate(${path.x},${path.y})`}
                    cursor={"crosshair"}
                >
                    {pathClicked && pathClicked.id === path.id ?
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
                                onClick={() => setPathClicked(null)}
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
                        </> : null}
                    <path
                        className='draggable'
                        x={path.x}
                        y={path.y}
                        d={path.path}
                        stroke={`${pathClicked && pathClicked.id === path.id ? "red" : path.color}`}
                        fill="none"
                        strokeWidth={path.line}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        draggable="true"
                        onMouseDown={isErasing ? (() => handleDeletePath(path)) : ((event) => handleMouseDown(event, path))}
                        onMouseUp={handleMouseUp}
                        onTouchStart={pathClicked && ((e) => handleMouseDown(e, path))}
                        onTouchEnd={isErasing ? (() => handleDeletePath(path)) : null}
                        onClick={(e) => handlePathClicked(e, path)}
                        style={{ cursor: 'crosshair', transform: `rotate(${0}deg)`, transformOrigin: '50% 50% ' }}
                    ></path>
                </g>
            ))}
            {currentPath && (
                <path
                    d={currentPath}
                    stroke={color}
                    fill="none"
                    strokeWidth={line}
                />)}
        </>)
}
export default Drawing
import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Drawing = () => {
    const { paths, isDrawing, getDrawingCenter, currentPath, color, line, isErasing, handleDeletePath, handleMouseDown, handleMouseUp, pathRef } = React.useContext(MoodboardContext);

    // const { x: originX, y: originY } = getDrawingCenter()
    // console.log(originX, originY);
    return (
        <>
            {paths.map((path, index) => (
                <path
                    key={index}
                    className='draggable'
                    x={path.x}
                    y={path.y}
                    d={path.path}
                    ref={pathRef}
                    stroke={path.color}
                    fill="none"
                    //fill="rgbs(120,65,24,.3)"
                    strokeWidth={path.line}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    draggable="true"
                    onMouseDown={isErasing ? (() => handleDeletePath(path)) : ((event) => handleMouseDown(event, path))}
                    onMouseUp={handleMouseUp}
                    onTouchStart={(e) => handleMouseDown(e, path)}
                    onTouchEnd={isErasing ? (() => handleDeletePath(path)) : null}
                    transform={
                        `
                            translate(${path.x},${path.y}) 
                            rotate(${path.angle})  
                            scale(${path.scale})
                        `
                    }
                    // transform={
                    //     `
                    //         translate(${path.x},${path.y}) 
                    //         rotate(${path.angle} ${originX} ${originY})  
                    //         scale(${path.scale})
                    //     `
                    // }
                    transform-origin={`${path.centerX} ${path.centerY}`}
                    style={{
                        cursor: 'crosshair',
                    }}
                />
            ))}
            {
                isDrawing && currentPath && (
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
import React, { useReducer, useEffect, useRef } from 'react';

const initialState = {
    paths: [
        { id: 'path1', d: 'M100,100 L200,200 L300,100 Z', rotation: 0, scale: 1, isSelected: false },
        { id: 'path2', d: 'M150,150 L250,150', rotation: 0, scale: 1, isSelected: false },
        { id: 'path3', d: 'M200,200 L300,300 L400,200', rotation: 0, scale: 1, isSelected: false },
    ],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_PATH':
            return {
                ...state,
                paths: state.paths.map((path) =>
                    path.id === action.payload.id ? { ...path, ...action.payload.changes } : path
                ),
            };
        case 'TOGGLE_PATH_SELECTION':
            return {
                ...state,
                paths: state.paths.map((path) =>
                    path.id === action.payload.id ? { ...path, isSelected: action.payload.isSelected } : path
                ),
            };
        default:
            return state;
    }
};

const SVGEditor = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const svgRef = useRef(null);
    const selectionRef = useRef({ startX: 0, startY: 0, endX: 0, endY: 0 });

    useEffect(() => {
        const savedState = localStorage.getItem('svgEditorState');
        if (savedState) {
            dispatch({ type: 'UPDATE_PATH', payload: JSON.parse(savedState) });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('svgEditorState', JSON.stringify(state.paths));
    }, [state.paths]);

    const handleRotationChange = (pathId, rotation) => {
        dispatch({
            type: 'UPDATE_PATH',
            payload: { id: pathId, changes: { rotation } },
        });
    };

    const handleScaleChange = (pathId, scale) => {
        dispatch({
            type: 'UPDATE_PATH',
            payload: { id: pathId, changes: { scale } },
        });
    };

    const handleMouseDown = (event, pathId) => {
        event.preventDefault();
        const svg = svgRef.current;
        const svgPoint = svg.createSVGPoint();
        svgPoint.x = event.clientX;
        svgPoint.y = event.clientY;
        const cursorPoint = svgPoint.matrixTransform(svg.getScreenCTM().inverse());

        selectionRef.current.startX = cursorPoint.x;
        selectionRef.current.startY = cursorPoint.y;

        if (!event.shiftKey) {
            dispatch({ type: 'TOGGLE_PATH_SELECTION', payload: { id: pathId, isSelected: true } });
        } else {
            dispatch({ type: 'TOGGLE_PATH_SELECTION', payload: { id: '', isSelected: false } });
        }
    };

    const handleMouseUp = () => {
        const selectedPaths = state.paths.filter((path) => path.isSelected);
        const selectedPathIds = selectedPaths.map((path) => path.id);
        const updatedPaths = state.paths.map((path) =>
            selectedPathIds.includes(path.id) ? { ...path, isSelected: true } : { ...path, isSelected: false }
        );

        dispatch({ type: 'UPDATE_PATH', payload: updatedPaths });

        selectionRef.current = { startX: 0, startY: 0, endX: 0, endY: 0 };
    };

    const handleMouseMove = (event) => {
        if (selectionRef.current.startX === 0 && selectionRef.current.startY === 0) {
            return;
        }

        const svg = svgRef.current;
        const svgPoint = svg.createSVGPoint();
        svgPoint.x = event.clientX;
        svgPoint.y = event.clientY;
        const cursorPoint = svgPoint.matrixTransform(svg.getScreenCTM().inverse());

        selectionRef.current.endX = cursorPoint.x;
        selectionRef.current.endY = cursorPoint.y;

        const { startX, startY, endX, endY } = selectionRef.current;

        const selectedPaths = state.paths.filter((path) => {
            const pathElement = svg.getElementById(path.id);
            const pathRect = pathElement.getBoundingClientRect();
            const pathX = pathRect.x + pathRect.width / 2;
            const pathY = pathRect.y + pathRect.height / 2;

            return pathX >= startX && pathX <= endX && pathY >= startY && pathY <= endY;
        });

        const selectedPathIds = selectedPaths.map((path) => path.id);
        const updatedPaths = state.paths.map((path) =>
            selectedPathIds.includes(path.id) ? { ...path, isSelected: true } : { ...path, isSelected: false }
        );

        dispatch({ type: 'UPDATE_PATH', payload: updatedPaths });
    };

    return (
        <div>
            <svg
                ref={svgRef}
                width="500"
                height="500"
                style={{ border: '1px solid #000' }}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {state.paths.map((path) => (
                    <g
                        key={path.id}
                        transform={`rotate(${path.rotation} 250 250) scale(${path.scale})`}
                        onMouseDown={(e) => handleMouseDown(e, path.id)}
                    >
                        <path
                            id={path.id}
                            d={path.d}
                            fill="none"
                            stroke={path.isSelected ? '#ff0000' : '#000'}
                            strokeWidth="2"
                        />
                    </g>
                ))}
            </svg>
            {state.paths.map((path) => (
                <div key={path.id}>
                    <label htmlFor={`rotation_${path.id}`}>Rotation for {path.id}: </label>
                    <input
                        id={`rotation_${path.id}`}
                        type="number"
                        value={path.rotation}
                        onChange={(e) => handleRotationChange(path.id, parseInt(e.target.value))}
                    />
                    <br />
                    <label htmlFor={`scale_${path.id}`}>Scale for {path.id}: </label>
                    <input
                        id={`scale_${path.id}`}
                        type="number"
                        value={path.scale}
                        onChange={(e) => handleScaleChange(path.id, parseFloat(e.target.value))}
                    />
                    <br />
                </div>
            ))}
        </div>
    );
};

export default SVGEditor;

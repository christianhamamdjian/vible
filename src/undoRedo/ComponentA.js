import React from 'react';
import { useMyContext } from './context';

const ComponentA = () => {
    const { paths, handleChangePaths, handleUndoErase, handleRedoErase, canUndoErase, canRedoErase } = useMyContext();

    // const handleAddPath = () => {
    //     const newPath = { id: Math.random(), value: `Data A - ${paths.length + 1}` };
    //     handleChangePaths([...paths, newPath]);
    // };

    const handleRemovePath = (id) => {
        const newPaths = paths.filter((item) => item.id !== id);
        console.log(newPaths)
        handleChangePaths(newPaths);
    };

    return (
        <div>
            <h2>Component A</h2>
            <div>
                {/* <button onClick={handleAddPath}>Add Path</button> */}
                <button onClick={handleUndoErase} disabled={!canUndoErase}>
                    Undo
                </button>
                <button onClick={handleRedoErase} disabled={!canRedoErase}>
                    Redo
                </button>
            </div>
            <div>
                {paths.map((item) => (
                    <div key={item.id}>
                        <span>{item.value}</span>
                        <button onClick={() => handleRemovePath(item.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComponentA;
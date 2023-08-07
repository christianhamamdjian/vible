import React from 'react';
import { useMyContext } from './context';

const ComponentA = () => {
    const { textA, handleChangeA, handleUndoA, handleRedoA, canUndoA, canRedoA } = useMyContext();

    return (
        <div>
            <h2>Component A</h2>
            <div>
                <button onClick={handleUndoA} disabled={!canUndoA}>
                    Undo
                </button>
                <button onClick={handleRedoA} disabled={!canRedoA}>
                    Redo
                </button>
            </div>
            <div>
                <input value={textA} onChange={(e) => handleChangeA({ textA: e.target.value })} />
            </div>
        </div>
    );
};

export default ComponentA;
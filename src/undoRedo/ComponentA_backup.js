import React from 'react';
import { useMyContext } from './context';

const ComponentA = () => {
    const { counterA, textA, handleChangeA, handleUndoA, handleRedoA, canUndoA, canRedoA } = useMyContext();

    return (
        <div>
            <h2>Component A</h2>
            <div>
                <div>Counter A: {counterA}</div>
                <button onClick={() => handleChangeA({ counterA: counterA + 1, textA })}>Increment</button>
                <button onClick={() => handleChangeA({ counterA: counterA - 1, textA })}>Decrement</button>
                <button onClick={handleUndoA} disabled={!canUndoA}>
                    Undo
                </button>
                <button onClick={handleRedoA} disabled={!canRedoA}>
                    Redo
                </button>
            </div>
            <div>
                <input value={textA} onChange={(e) => handleChangeA({ counterA, textA: e.target.value })} />
            </div>
        </div>
    );
};

export default ComponentA;
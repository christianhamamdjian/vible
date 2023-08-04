import React from 'react';
import { useMyContext } from './context';

const ComponentB = () => {
    const { counterB, textB, handleChangeB, handleUndoB, handleRedoB, canUndoB, canRedoB } = useMyContext();

    return (
        <div>
            <h2>Component B</h2>
            <div>
                <div>Counter B: {counterB}</div>
                <button onClick={() => handleChangeB({ counterB: counterB + 10, textB })}>Increment by 10</button>
                <button onClick={() => handleChangeB({ counterB: counterB - 10, textB })}>Decrement by 10</button>
                <button onClick={handleUndoB} disabled={!canUndoB}>
                    Undo
                </button>
                <button onClick={handleRedoB} disabled={!canRedoB}>
                    Redo
                </button>
            </div>
            <div>
                <input value={textB} onChange={(e) => handleChangeB({ counterB, textB: e.target.value })} />
            </div>
        </div>
    );
};

export default ComponentB;
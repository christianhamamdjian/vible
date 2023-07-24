import React, { useState, createContext, useContext } from "react"

function useUndo() {
    const [history, setHistory] = useState({ history: [], currentIndex: 0 })
    const [state, setState] = useState()

    const execute = (executeFn, undoFn) => {
        const cmd = { executeFn, undoFn } // creates a command object
        setHistory(prevState => {
            const { history, currentIndex } = prevState // extracts the history from the state object
            setState(cmd.executeFn(prevState)) // executes the executeFn from command
            return { history: [...history, cmd], currentIndex: currentIndex + 1 } // returns the new state
        })
    }

    const undo = () => {
        setHistory(prevState => {
            const { history, currentIndex } = prevState // extracts the history from
            if (currentIndex <= 0) return prevState // doesn't undo if there is no history backwards
            const lastCmd = history[currentIndex - 1]
            setState(lastCmd.undoFn()) // executes the undoFn from command
            return { history, currentIndex: currentIndex - 1 } // returns the new state
        })
    }

    const redo = () => {
        setHistory(prevState => {
            const { history, currentIndex } = prevState // extracts the history from
            if (currentIndex >= history.length) return prevState // doesn't redo if there is no history forward
            const nextCmd = history[currentIndex]
            setState(nextCmd.executeFn(prevState)) // executes the executeFn from command
            return { history, currentIndex: currentIndex + 1 }
        })
    }

    const canUndo = history.currentIndex > 0
    const canRedo = history.currentIndex < history.length - 1

    return { execute, undo, redo, canUndo, canRedo, state }
}
////// I'm providing this trough a context provider:


const UndoRedoContext = createContext({})

const UndoRedoProvider = (props) => {
    const undoRedo = useUndo();

    return (
        <UndoRedoContext.Provider value={undoRedo}>
            {props.children}
        </UndoRedoContext.Provider>
    );
};

const useUndoRedoContext = () => useContext(UndoRedoContext);


//////Then I have a simple Component for testing purposes:


function UndoRedo() {
    const undoRedo = useUndoRedoContext()
    const nameInput = undoRedo.state;
    const handleInputChange = (e) => {
        e.preventDefault()
        const text = e.target.value // Make a copy of the string
        undoRedo.execute(
            () => text,
            () => nameInput
        )
    }

    return (
        <React.Fragment>
            <div>
                <input type="text" placeholder="Name" onChange={handleInputChange} />
                {nameInput}
            </div>
            <div>
                <button onClick={undoRedo.undo}>Undo</button>
                <button onClick={undoRedo.redo}>Redo</button>
            </div>
        </React.Fragment>
    )
}

export default UndoRedo

// ReactDOM.createRoot(
//     document.getElementById("root")
// ).render(
//     <UndoRedoProvider>
//         <EditUser />
//     </UndoRedoProvider>
// );
import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [textA, setTextA] = useState('');

    const [historyA, setHistoryA] = useState([{ textA }]);
    const [positionA, setPositionA] = useState(0);

    const handleChangeA = (newState) => {
        setTextA(newState.textA);
        setHistoryA((prevHistory) => [...prevHistory.slice(0, positionA + 1), newState]);
        setPositionA((prevPosition) => prevPosition + 1);
    };

    const handleUndoA = () => {
        if (positionA > 0) {
            setPositionA((prevPosition) => prevPosition - 1);
            setTextA(historyA[positionA - 1].textA);
        }
    };

    const handleRedoA = () => {
        if (positionA < historyA.length - 1) {
            setPositionA((prevPosition) => prevPosition + 1);
            setTextA(historyA[positionA + 1].textA);
        }
    };

    return (
        <MyContext.Provider
            value={{
                textA,
                setTextA,
                handleChangeA,
                handleUndoA,
                handleRedoA,
                canUndoA: positionA > 0,
                canRedoA: positionA < historyA.length - 1,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => useContext(MyContext);

export default MyContextProvider;
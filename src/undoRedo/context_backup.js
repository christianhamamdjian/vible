import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [counterA, setCounterA] = useState(0);
    const [textA, setTextA] = useState('');

    const [counterB, setCounterB] = useState(0);
    const [textB, setTextB] = useState('');

    const [historyA, setHistoryA] = useState([{ counterA, textA }]);
    const [positionA, setPositionA] = useState(0);

    const [historyB, setHistoryB] = useState([{ counterB, textB }]);
    const [positionB, setPositionB] = useState(0);

    const handleChangeA = (newState) => {
        setCounterA(newState.counterA);
        setTextA(newState.textA);

        setHistoryA((prevHistory) => [...prevHistory.slice(0, positionA + 1), newState]);
        setPositionA((prevPosition) => prevPosition + 1);
    };

    const handleChangeB = (newState) => {
        setCounterB(newState.counterB);
        setTextB(newState.textB);

        setHistoryB((prevHistory) => [...prevHistory.slice(0, positionB + 1), newState]);
        setPositionB((prevPosition) => prevPosition + 1);
    };

    const handleUndoA = () => {
        if (positionA > 0) {
            setPositionA((prevPosition) => prevPosition - 1);
            setCounterA(historyA[positionA - 1].counterA);
            setTextA(historyA[positionA - 1].textA);
        }
    };

    const handleUndoB = () => {
        if (positionB > 0) {
            setPositionB((prevPosition) => prevPosition - 1);
            setCounterB(historyB[positionB - 1].counterB);
            setTextB(historyB[positionB - 1].textB);
        }
    };

    const handleRedoA = () => {
        if (positionA < historyA.length - 1) {
            setPositionA((prevPosition) => prevPosition + 1);
            setCounterA(historyA[positionA + 1].counterA);
            setTextA(historyA[positionA + 1].textA);
        }
    };

    const handleRedoB = () => {
        if (positionB < historyB.length - 1) {
            setPositionB((prevPosition) => prevPosition + 1);
            setCounterB(historyB[positionB + 1].counterB);
            setTextB(historyB[positionB + 1].textB);
        }
    };

    return (
        <MyContext.Provider
            value={{
                counterA,
                setCounterA,
                textA,
                setTextA,
                counterB,
                setCounterB,
                textB,
                setTextB,
                handleChangeA,
                handleChangeB,
                handleUndoA,
                handleUndoB,
                handleRedoA,
                handleRedoB,
                canUndoA: positionA > 0,
                canRedoA: positionA < historyA.length - 1,
                canUndoB: positionB > 0,
                canRedoB: positionB < historyB.length - 1,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => useContext(MyContext);

export default MyContextProvider;
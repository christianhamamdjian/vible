import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [paths, setpaths] = useState([]);
    const [historyErase, setHistoryErase] = useState([{ paths }]);
    const [positionErase, setPositionErase] = useState(0);

    const handleChangePaths = (newpaths) => {
        setpaths(newpaths);

        setHistoryErase((prevHistory) => [...prevHistory.slice(0, positionErase + 1), { paths: newpaths }]);
        setPositionErase((prevPosition) => prevPosition + 1);
    };

    const handleUndoErase = () => {
        if (positionErase > 0) {
            setPositionErase((prevPosition) => prevPosition - 1);
            setpaths(historyErase[positionErase - 1].paths);
        }
    };

    const handleRedoErase = () => {
        if (positionErase < historyErase.length - 1) {
            setPositionErase((prevPosition) => prevPosition + 1);
            setpaths(historyErase[positionErase + 1].paths);
        }
    };

    return (
        <MyContext.Provider
            value={{
                paths,
                handleChangePaths,
                handleUndoErase,
                handleRedoErase,
                canUndoErase: positionErase > 0,
                canRedoErase: positionErase < historyErase.length - 1,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => useContext(MyContext);

export default MyContextProvider;
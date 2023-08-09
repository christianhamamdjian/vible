import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [paths, setpaths] = useState([
        {
            "id": 0.36945842998028056,
            "value": "Data A - 1"
        },
        {
            "id": 0.42822399433850755,
            "value": "Data A - 2"
        },
        {
            "id": 0.004037999658055735,
            "value": "Data A - 3"
        },
        {
            "id": 0.8747686982830283,
            "value": "Data A - 4"
        },
        {
            "id": 0.007846458338718332,
            "value": "Data A - 5"
        },
        {
            "id": 0.9341922043053632,
            "value": "Data A - 6"
        }
    ]);
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
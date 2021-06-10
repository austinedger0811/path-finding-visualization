import React, { useState, createContext, useMemo } from 'react'

export const OptionsContext = createContext();

export const OptionsProvider = (props) => {

    const [algorithmIndex, setAlgorithmIndex] = useState(0);
    const [wallIndex, setWallIndex] = useState(0);
    const menuValue= useMemo(() => ({
        algorithmIndex, setAlgorithmIndex,
        wallIndex, setWallIndex,
    }), [algorithmIndex, wallIndex]);

    return (
        <OptionsContext.Provider value={menuValue}>
            {props.children}
        </OptionsContext.Provider>
    );
};
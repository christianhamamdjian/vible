import React from 'react';
import MyContextProvider from './context';
import ComponentA from "./ComponentA"
// import ComponentB from "./ComponentB"

const UndoRedo = () => {
    return (
        <MyContextProvider>
            <ComponentA />
            {/* <ComponentB /> */}
        </MyContextProvider>
    );
};

export default UndoRedo;
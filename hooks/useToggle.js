import { View, Text } from 'react-native'
import { createContext, useContext, useEffect, useState } from "react";

const ToggleContext = createContext(false)

export const ToggleProvider = ({ children }) => {
    const [toggle, setToggle] = useState(false)
    const toggleFunction = () => {
        setToggle(!toggle)
    }

    return (<ToggleContext.Provider
        value={{
            toggle,
            toggleFunction
        }}>
        {children}
    </ToggleContext.Provider>
    );
};

export default function useToggle() {
    return useContext(ToggleContext);
}


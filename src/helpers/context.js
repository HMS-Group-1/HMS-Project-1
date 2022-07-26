import React from 'react';
import { useState } from 'react';

export const ContextProvider = React.createContext(null);

export const ContextWrapper = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState('');

    return(
        <ContextProvider.Provider value={{isLogin, setIsLogin, token, setToken}}>
            {props.children}
        </ContextProvider.Provider>
    )
}

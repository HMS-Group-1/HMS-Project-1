import React from 'react';
import { useState } from 'react';

export const ContextProvider = React.createContext(null);

export const ContextWrapper = (props) => {
    const [isLogin, setIsLogin] = useState(false);

    return(
        <ContextProvider.Provider value={{isLogin, setIsLogin}}>
            {props.children}
        </ContextProvider.Provider>
    )
}

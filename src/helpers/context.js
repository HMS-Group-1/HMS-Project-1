import React from 'react';
import { useState } from 'react';

export const ContextProvider = React.createContext(null);

export const ContextWrapper = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const [name, setName] = useState('');
    const [userId, setUserId] = useState(null);


    return(
        <ContextProvider.Provider value={{isLogin, setIsLogin, name, setName, userId, setUserId}}>
            {props.children}
        </ContextProvider.Provider>
    )
}

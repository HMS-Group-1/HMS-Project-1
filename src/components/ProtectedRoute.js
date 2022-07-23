import React, { useContext } from 'react';
import {Navigate} from 'react-router-dom'
import { ContextProvider } from '../helpers/context';

const ProtectedRoute = ({children}) => {
    const context = useContext(ContextProvider);
    const isLogin =  context.isLogin;
    if(isLogin === false){
        return <Navigate to={'/'} />
    }else{
        return children
    }
}

export default ProtectedRoute
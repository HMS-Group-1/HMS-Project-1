import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ContextProvider } from '../helpers/context';

const ProtectedRoute = ({ children }) => {
	const { isLogin } = useContext(ContextProvider);
	if (isLogin.status === false) {
		return <Navigate to={'/'} />;
	} else {
		return children;
	}
};

export default ProtectedRoute;

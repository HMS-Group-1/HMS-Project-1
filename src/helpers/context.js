import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ContextProvider = React.createContext(null);

export const ContextWrapper = (props) => {
	const [isLogin, setIsLogin] = useLocalStorage('isLogin', {
		nama: '',
		id: null,
		status: false,
	});

	return <ContextProvider.Provider value={{ isLogin, setIsLogin }}>{props.children}</ContextProvider.Provider>;
};

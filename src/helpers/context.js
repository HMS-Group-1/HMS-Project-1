import React from 'react';
import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ContextProvider = React.createContext(null);

export const ContextWrapper = (props) => {
	const [isLogin, setIsLogin] = useLocalStorage('isLogin', {
		nama: '',
		id: 0,
		status: false,
	});

	return <ContextProvider.Provider value={{ isLogin, setIsLogin }}>{props.children}</ContextProvider.Provider>;
};

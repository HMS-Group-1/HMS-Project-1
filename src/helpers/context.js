import React from 'react';
import { useState } from 'react';

export const ContextProvider = React.createContext(null);

export const ContextWrapper = (props) => {
	const [isLogin, setIsLogin] = useState({
		nama: '',
		id: 0,
		status: false,
	});

	return <ContextProvider.Provider value={{ isLogin, setIsLogin }}>{props.children}</ContextProvider.Provider>;
};

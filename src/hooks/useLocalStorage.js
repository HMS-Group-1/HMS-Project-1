import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
	const [setLogin, setIsLogin] = useState(() => {
		if (typeof window === 'undefined') {
			return initialValue;
		}
		try {
			const fromLocalStorage = window.localStorage.getItem(key);
			return fromLocalStorage ? JSON.parse(fromLocalStorage) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const changeIsLogin = (value) => {
		try {
			console.log(Function);
			const valueToStore = value instanceof Function ? value(setLogin) : value;
			console.log(valueToStore);
			setIsLogin(valueToStore);
			if (typeof window !== 'undefined') {
				localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			console.log(error);
		}
	};
	return [setLogin, changeIsLogin];
};

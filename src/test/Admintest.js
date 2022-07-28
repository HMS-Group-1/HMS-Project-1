import axios from 'axios';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './Admintest.css';

const Admintest = () => {
	const [response, setResponse] = useState([]);
	const [expire, setExpire] = useState('');
	const navigateTo = useNavigate();

	useEffect(() => {
		getNewToken();
		getAllUsers();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getNewToken = async () => {
		try {
			const response = await axios.get('http://localhost:5000/token');
			console.log(response);
			const decoded = jwt_decode(response.data.accessToken);
			console.log(decoded);
			setExpire(decoded.exp);
		} catch (error) {
			if (error.response) {
				navigateTo('/');
			}
		}
	};

	const newInstance = axios.create();
	newInstance.interceptors.request.use(
		async (config) => {
			const date = new Date();
			if (expire * 1000 < date.getTime()) {
				const response = await axios.get('http://localhost:5000/token');
				console.log(response);
				config.headers.Authorization = `Bearer ${response.data.accessToken}`;
				const decoded = jwt_decode(response.data.accessToken);
				setExpire(decoded.exp);
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	const getAllUsers = async () => {
		const listUsers = await newInstance.get('http://localhost:5000/admin/user');
		setResponse(listUsers.data);
	};

	return (
		<div>
			<h1>List User</h1>
			<div className="wrapper">
				{response.length > 0
					? response.map((user) => (
							<div className="box" key={user.id}>
								<div>{user.id}</div>
								<div>{user.no_telp}</div>
								<div>{user.role}</div>
							</div>
					  ))
					: 'Loading...'}
			</div>
		</div>
	);
};

export default Admintest;

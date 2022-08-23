import React, { useState, useEffect, useContext } from 'react';
import axios from '../../helpers/interceptor';
import notInterceptor from 'axios';
import Logo from '../../assets/capture1.PNG';
import { Link, useNavigate } from 'react-router-dom';
import { ContextProvider } from '../../helpers/context';
import { getInitials } from '../../helpers/constant';

const UserList = () => {
	const [users, setUser] = useState([]);
	const { setIsLogin } = useContext(ContextProvider);
	const navigateTo = useNavigate();
	const { isLogin } = useContext(ContextProvider);
	const [menu, setMenu] = useState(false);
	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		const response = await axios.get('https://hms-backend-recreate.herokuapp.com/admin/user/');
		setUser(response.data);
	};

	const deleteUser = async (id) => {
		try {
			await axios.delete(`https://hms-backend-recreate.herokuapp.com/admin/deleteUser/${id}`);
			getUsers();
		} catch (error) {
			console.log(error);
		}
	};
	const menuHandler = () => {
		setMenu(!menu);
	};

	const logOutHandler = async () => {
		try {
			await notInterceptor.delete('https://hms-backend-recreate.herokuapp.com/logout');
			setIsLogin({ nama: '', id: null, status: false });
			localStorage.removeItem('isLogin');
			navigateTo('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="desktop:sticky desktop:top-0 desktop:z-20 desktop:pb-1 bg-white rounded-b-lg p-5">
			<div className="flex gap-2 ">
				<Link to="/">
					<button onClick={logOutHandler} className="bg-merahTua text-white px-3 py-2 rounded-md flex">
						Logout
					</button>
				</Link>
				<div className="w-100 h-100 px-3 py-2 bg-yellow-300 rounded-full">
					<p onClick={menuHandler} className="w-full h-full relative hover:cursor-pointer flex justify-center items-center text-lg text-white font-medium">
						{getInitials(isLogin.nama)}
					</p>
					{menu && (
						<div className="bg-blue-400 z-20 mt-1 rounded-md w-[180px] py-2 absolute left-3 top-11">
							<ul className="flex flex-col gap-2">
								<Link to="/admin/book">
									<li className="text-sm hover:bg-blue-500 py-1 text-white pl-2">List Buku</li>
								</Link>
								<Link to="/">
									<li className="text-sm hover:bg-blue-500 py-1 text-white pl-2" onClick={logOutHandler}>
										Keluar
									</li>
								</Link>
							</ul>
						</div>
					)}
				</div>
			</div>
			<br />
			<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
				<div>
					<img src={Logo} alt="logo" className="w-[300px]" />
					<br />
					<br />
					<h1 className="title uppercase">Daftar Admin dan anggota</h1>
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-blue-300 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="py-3 px-6">
									No
								</th>
								<th scope="col" className="py-3 px-6">
									Nama
								</th>
								<th scope="col" className="py-3 px-6">
									Email
								</th>
								<th scope="col" className="py-3 px-6">
									No Telpon
								</th>
								<th scope="col" className="py-3 px-6">
									Role
								</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user, index) => (
								<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={user.id}>
									<td className="py-4 px-6">{index + 1}</td>
									<td className="py-4 px-6">{user.nama}</td>
									<td className="py-4 px-6">{user.email}</td>
									<td className="py-4 px-6">{user.no_telp}</td>
									<td className="py-4 px-6">{user.role}</td>
									<td>
										<Link to={`edit/${user.id}`} className="bg-biru text-white px-3 py-1 rounded-md">
											Edit
										</Link>
										<button onClick={() => deleteUser(user.id)} className="bg-merahTua text-white px-2 py-1 rounded-md">
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default UserList;

import React, { useContext, useState } from 'react';
import Logo from '../assets/logobukabuku.png';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { ContextProvider } from '../helpers/context';
import notInterceptor from 'axios';
import { getInitials } from '../helpers/constant';

function Navbar() {
	const { setIsLogin } = useContext(ContextProvider);
	const navigateTo = useNavigate();
	const { isLogin } = useContext(ContextProvider);
	const [menu, setMenu] = useState(false);

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
	const EditUserHandler = async () => {
		navigateTo('/EditUser');
	};

	return (
		<div className="flex my-4  tablet:justify-between w-full tablet:my-4 desktop:z-20">
			<div className="w-1/2">
				<Link to="/book">
					<img src={Logo} className="w-40" alt="" />
				</Link>
			</div>
			{!isLogin.status ? (
				<div className="flex gap-2 justify-end w-1/2">
					<Link to="/login">
						<button className="bg-merahTua text-white px-2 py-1 rounded-md">Masuk</button>
					</Link>
					<Link to="/register">
						<button className="bg-biru text-white px-2 py-1 rounded-md">Daftar</button>
					</Link>
				</div>
			) : (
				<div className="flex gap-2 justify-end w-1/2">
					<Link to="/">
						<button onClick={logOutHandler} className="bg-merahTua text-white px-3 py-2 rounded-md">
							Logout
						</button>
					</Link>
					<div className="w-10 h-10 bg-yellow-300 rounded-full">
						<p onClick={menuHandler} className="w-full h-full relative hover:cursor-pointer flex justify-center items-center text-lg text-white font-medium">
							{getInitials(isLogin.nama)}
						</p>
						{menu && (
							<div className="bg-blue-400 z-20 mt-1 rounded-md w-[180px] py-2 absolute right-0 top-11">
								<ul className="flex flex-col gap-2">
									<Link to="/book">
										<li className="text-sm hover:bg-blue-500 py-1 text-white pl-2">List Buku</li>
									</Link>
									<Link to="/pinjambuku">
										<li className="text-sm hover:bg-blue-500 py-1 text-white pl-2">Pinjam Buku</li>
									</Link>
									<Link to="/kembalikanbuku">
										<li className="text-sm hover:bg-blue-500 py-1 text-white pl-2">Kembalikan Buku</li>
									</Link>
									<Link to="/history_peminjaman">
										<li className="text-sm hover:bg-blue-500 py-1 text-white pl-2">History Peminjaman</li>
									</Link>
									<Link to="/EditUser">
										<li className="text-sm hover:bg-blue-500 py-1 text-white pl-2">EditUser</li>
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
			)}
		</div>
	);
}

export default Navbar;

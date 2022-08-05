import React, { useContext, useState } from 'react';
import Logo from '../assets/capture1.PNG';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { ContextProvider } from '../helpers/context';
import axios from 'axios';
import { getInitials } from '../helpers/constant';

function Navbar() {
	const navigateTo = useNavigate();
	const { isLogin } = useContext(ContextProvider);
	const [menu, setMenu] = useState(false);
	const menuHandler = () => {
		setMenu(!menu);
	};
	const logOutHandler = async () => {
		try {
			await axios.delete('http://localhost:5000/logout');
			localStorage.removeItem('isLogin');
			navigateTo('/');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="flex mb-4  tablet:justify-between w-full tablet:mb-4 tablet:mt-2 desktop:z-20">
			<div className="w-1/2">
				<img src={Logo} className="w-40" alt="" />
			</div>
			{!isLogin.status ? (
				<div className="flex gap-2 justify-end w-1/2">
					<Link to="/Masuk">
						<button className="bg-merahTua text-white px-2 py-1 rounded-md">Masuk</button>
					</Link>
					<Link to="/Daftar">
						<button className="bg-biru text-white px-2 py-1 rounded-md">Daftar</button>
					</Link>
				</div>
			) : (
				<div className="flex gap-2 justify-end w-1/2">
					<div className="w-10 h-10 bg-yellow-300 rounded-full">
						<p onClick={menuHandler} className="w-full h-full relative hover:cursor-pointer flex justify-center items-center text-lg text-white font-medium">
							{getInitials(context.name)}
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

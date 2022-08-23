import React, { useState, useEffect, useContext } from 'react';
import axios from '../../helpers/interceptor';
import notInterceptor from 'axios';
import Logo from '../../assets/capture1.PNG';
import { Link, useNavigate } from 'react-router-dom';
import { ContextProvider } from '../../helpers/context';

function toBase64(img) {
	//arr = new Uint8Array(arr) if it's an ArrayBuffer
	return btoa(img.reduce((data, byte) => data + String.fromCharCode(byte), ''));
}

const GetBook = () => {
	const [response, setResponse] = useState([]);
	const { setIsLogin } = useContext(ContextProvider);
	const { isLogin } = useContext(ContextProvider);
	const navigateTo = useNavigate();
	const [menu, setMenu] = useState(false);
	console.log(response);

	useEffect(() => {
		fetchBook();
	}, []);

	const fetchBook = async () => {
		const response = await axios.get('https://hms-backend-recreate.herokuapp.com/admin/book');
		setResponse(response.data);
	};

	const deleteBook = async (id) => {
		try {
			await axios.delete(`https://hms-backend-recreate.herokuapp.com/admin/deleteBook/${id}`);
			setResponse([]);
			fetchBook();
		} catch (error) {
			console.log(error);
		}
	};

	const truncateString = (str, num) => {
		if (str?.length > num) {
			return str.slice(0, num) + '...';
		} else {
			return str;
		}
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

	const menuHandler = () => {
		setMenu(!menu);
	};

	function getInitials(string) {
		var names = string.split(' '),
			initials = names[0].substring(0, 1).toUpperCase();

		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	}

	return (
		<>
			<div className="flex w-full items-center p-5">
				<div className="w-[80px] h-[80px] px-3 py-2 bg-yellow-300 rounded-full">
					<p onClick={menuHandler} className="w-full h-full relative hover:cursor-pointer flex justify-center items-center text-lg text-white font-medium">
						{getInitials(isLogin.nama)}
					</p>
					{menu && (
						<div className="bg-blue-400 z-20 mt-1 rounded-md w-[180px] py-2 absolute left-3 top-11">
							<ul className="flex flex-col gap-2">
								<Link to="/admin/user">
									<li className="text-sm hover:bg-blue-500 py-1 text-white pl-2">User List</li>
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
				<Link to="/">
					<button onClick={logOutHandler} className="bg-merahTua text-white px-3 py-1 ml-3 rounded-md">
						Logout
					</button>
				</Link>
			</div>
			<div></div>
			<div className=" p-5 font-sans">
				<img src={Logo} alt="logo" className="mb-5 w-[300px]" />
				<h1 className="text-center">Daftar Buku</h1>
				<br />
				<br />
				<br />

				<Link to={`/admin/createBook`} className="bg-biru text-white px-3 py-1 rounded-md">
					Create new
				</Link>
				<br />
				<br />
				{response.length > 0
					? response.map((book) => (
							<div className="border-solid border-2 border-black p-3 ">
								<div>
									<img src={`data:image/png;base64, ${toBase64(book.gambar.data)}`} alt={book.judul_buku} className="h-[200px] w-[200px]" />
								</div>
								<div className="pt-3 font-bold">Nama Buku: {book.judul_buku}</div>
								<div className="pt-3">Kategori Buku: {book.kategori_id} </div>
								<div className="pt-3">Deskripsi Buku: {truncateString(book.deskripsi, 1000)} </div>
								<div>
									<div className="pt-3">Rak: {book.rak_id}</div>
								</div>
								<div>
									<div className="pt-3">Tahun terbit: {book.tahun_terbit}</div>
								</div>
								<Link to={`/admin/updateBook/${book.id}`} className="bg-biru text-white px-3 py-2 rounded-md">
									Edit
								</Link>
								<span className="pl-3"></span>
								<button onClick={() => deleteBook(book.id)} className="bg-merahTua text-white px-3 py-2 rounded-md">
									Delete
								</button>
							</div>
					  ))
					: 'loading...'}
			</div>
		</>
	);
};

export default GetBook;

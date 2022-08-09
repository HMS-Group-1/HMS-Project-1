import React, { useState, useEffect, useContext} from "react";
import axios from "../../helpers/interceptor";
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
		const response = await axios.get('http://localhost:5000/admin/book');
		setResponse(response.data);
	};

	const deleteBook = async (id) => {
		try {
		  await axios.delete(`http://localhost:5000/admin/deleteBook/${id}`);
		  fetchBook();
		} catch (error) {
		  console.log(error);
		}
	  };

	  const truncateString = (str, num) => {
		if (str?.length > num) {
			return str.slice(0, num) + '...'
		} else {
			return str
		}
	};

	const logOutHandler = async () => {
		try {
			await axios.delete('http://localhost:5000/logout');
			localStorage.removeItem('isLogin');
			setIsLogin({ nama: '', id: null, status: false });
			navigateTo('/');
		} catch (error) {
			console.log(error);
		}
	};

	const menuHandler = () => {
		setMenu(!menu);
	};
	


	return (
		<>
		<div>
		
		</div>
			<div className="mt-2 p-5 font-sans">
				<img src={Logo} alt="logo" className="mb-5 w-[300px]" />
				<h1 className='text-center'>Daftar Buku</h1>
				<br /><br /><br/>
				<Link to="/">
			<button onClick={logOutHandler} className="bg-merahTua text-white px-3 py-1 rounded-md float-right">
				Logout
			</button>
		</Link>
				<Link to={`/admin/createBook`} className="bg-biru text-white px-3 py-1 rounded-md">Create new</Link>
				<br /><br />
				{response.length > 0
					? response.map((book) => (
						<div className="border-solid border-2 border-black p-3 ">
							<div><img src={`data:image/png;base64, ${toBase64(book.gambar.data)}`} alt={book.judul_buku} className="h-[200px] w-[200px]" /></div>
							<div className="pt-3 font-bold">Nama Buku: {book.judul_buku}</div>
							<div className="pt-3">Kategori Buku: {book.kategori_id} </div>
							<div className="pt-3">Deskripsi Buku: {truncateString(book.deskripsi, 1000)} </div>
							<div><div className="pt-3">Rak: {book.rak_id}</div></div>
							<div><div className="pt-3">Tahun terbit: {book.tahun_terbit}</div></div>
							<Link to={`/admin/updateBook/${book.id}`} className="bg-biru text-white px-3 py-2 rounded-md">Edit</Link>
							<span className='pl-3'></span>
							<button onClick={() => deleteBook(book.id)}
								className="bg-merahTua text-white px-3 py-2 rounded-md">
								Delete</button>
						</div>

					))
					: 'loading...'}
			</div></>
		
	);
};

export default GetBook;
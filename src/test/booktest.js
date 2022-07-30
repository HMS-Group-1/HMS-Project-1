import { useEffect, useState } from 'react';
import axios from '../helpers/interceptor';
import { Link } from 'react-router-dom';

function toBase64(img) {
	//arr = new Uint8Array(arr) if it's an ArrayBuffer
	return btoa(img.reduce((data, byte) => data + String.fromCharCode(byte), ''));
}

const GetBook = () => {
	const [response, setResponse] = useState([]);

	console.log(response);

	useEffect(() => {
		fetchBook();
	}, []);

	const fetchBook = async () => {
		const response = await axios.get('http://localhost:5000/admin/book');
		setResponse(response.data);
	};

	return (
		<div>
			<Link to={'create'}>Create new</Link>
			{response.length > 0
				? response.map((book) => (
						<Link to={`detail/${book.id}`}>
							<div>Nama Buku: {book.judul_buku}</div>
							<div>Kategori Buku: {book.kategori_id}</div>
							<div>Deskripsi Buku: {book.deskripsi}</div>
							<img src={`data:image/png;base64, ${toBase64(book.gambar.data)}`} alt={book.judul_buku} />
							<div>Rak: {book.rak_id}</div>
							<div>Tahun terbit: {book.tahun_terbit}</div>
						</Link>
				  ))
				: 'loading...'}
		</div>
	);
};

export default GetBook;

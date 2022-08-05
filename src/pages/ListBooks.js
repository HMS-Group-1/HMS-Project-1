import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from '../helpers/interceptor';
import { useEffect } from 'react';
import { toBase64, truncateString, toTitleCase } from '../helpers/constant';
import SketelonBooks from '../components/SketelonBooks';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import searchIllustration from '../assets/searching-data.svg';

const ListBooks = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState({
		page: 0,
		maxPage: 1,
		search_query: '',
	});

	const getBooks = async () => {
		const response = await axios.get('http://localhost:5000/book', {
			params: {
				page: search.page,
				limit: 12,
				search_query: search.search_query,
			},
		});
		setBooks(response.data.hasilBuku);
		console.log(response.data);
		setSearch((prevState) => ({
			...prevState,
			maxPage: response.data.jumlahHalaman,
		}));
		setLoading(false);
	};

	const pageNumberHandler = (e, val) => {
		const pageNumber = val - 1;
		setSearch((prevState) => ({
			...prevState,
			page: pageNumber,
		}));
	};

	const btnSearchHandler = async () => {
		setLoading(true);
		const input = document.getElementById('search').value;
		const response = await axios.get('http://localhost:5000/book', {
			params: {
				page: 0,
				limit: 12,
				search_query: input,
			},
		});
		setBooks(response.data.hasilBuku);
		setSearch((prevState) => ({
			...prevState,
			maxPage: response.data.jumlahHalaman,
		}));
		setLoading(false);
	};

	const handleKeydown = async (e) => {
		const input = document.getElementById('search').value;
		if (e.key === 'Enter') {
			setLoading(true);
			const response = await axios.get('http://localhost:5000/book', {
				params: {
					page: 0,
					limit: 12,
					search_query: input,
				},
			});
			setBooks(response.data.hasilBuku);
			setSearch((prevState) => ({
				...prevState,
				maxPage: response.data.jumlahHalaman,
			}));
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		getBooks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search.page]);

	return (
		<div className="bg-white h-full">
			<div className="flex-col relative m-4 tablet:w-[90%] desktop:max-w-[1024px] tablet:m-auto tablet:mb-4 h-[100%]">
				<div className="desktop:sticky desktop:top-0 desktop:z-20 desktop:pb-1 bg-white rounded-b-lg">
					<Navbar />
					<div className="my-2 flex mb-4 desktop:mb-8">
						<input type="text" id="search" className="py-2 px-4 w-full shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline" onKeyDown={handleKeydown} placeholder="Cari nama atau deskripsi..." />
						<button onClick={btnSearchHandler} className="px-4 rounded-md bg-unguTua text-white ml-2">
							Cari
						</button>
					</div>
				</div>
				<div className="h-full w-full grid grid-cols-2 tablet:grid-cols-4  laptop:grid-cols-5 gap-4 tablet:gap-8 justify-between items-start content-between">
					{loading && Array.from({ length: 10 }, (v, i) => <SketelonBooks key={i} />)}
					{books &&
						books
							.filter((book) => book.judul_buku.toLocaleLowerCase().includes(''))
							.map((book, index) => (
								<Link to={`detail/${book.id}`} key={index}>
									<div className="h-[290px] w-[160px] desktop:w-[180px] rounded-md shadow-md bg-slate-400/10 justify-center mb-4 shrink">
										<div className="h-[180px] relative w-full object-cover rounded-br-lg rounded-bl-lg">
											<img src={`data:image/png;base64, ${toBase64(book.gambar.data)}`} alt={book.judul_buku} className="h-full w-full object-cover rounded-br-lg rounded-bl-lg" />
											<p className="z-10 absolute top-0 right-0 text-white text-sm mt-2 bg-biru w-fit px-2 py-1 m-0 rounded-tl-xl rounded-bl-xl">{toTitleCase(book.Kategori_id.kategori_nama)}</p>
										</div>
										<div className="flex flex-col m-2">
											<p className="text-sm text-slate-900 font-medium">{truncateString(book.judul_buku, 33)}</p>
											<p className="text-xs text-slate-600">Tahun : {book.tahun_terbit}</p>
											<p className="text-xs text-slate-600">Stock : {book.stok}</p>
										</div>
									</div>
								</Link>
							))}
				</div>
				{books.length < 1 && (
					<div className="w-full flex flex-col items-center content-center">
						<img src={searchIllustration} alt="Search Illustration" className="max-w-[300px]" />
						<p>
							Tidak ada buku<span className="font-semibold"> {search.search_query}</span> didalam database
						</p>
					</div>
				)}
				{books.length >= 1 && (
					<div className="flex justify-center my-4">
						<Stack spacing={2}>
							<Pagination count={search.maxPage} color="primary" onChange={pageNumberHandler} />
						</Stack>
					</div>
				)}
			</div>
		</div>
	);
};

export default ListBooks;

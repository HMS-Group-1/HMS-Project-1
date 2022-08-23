import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ContextProvider } from '../helpers/context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SketelonTable from './SketelonTable';
import { toTitleCase } from '../helpers/constant';
import { Pagination, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const TablePinjam = () => {
	const context = useContext(ContextProvider);
	const [books, setBooks] = useState([]);
	let [tableNumber, setTableNumber] = useState(0);
	let number = tableNumber * 15 + 1;
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState({
		page: 0,
		maxPage: 1,
		search_query: '',
	});

	const getBooks = async () => {
		const res = await axios.get('https://hms-backend-recreate.herokuapp.com/token', {
			withCredentials: true,
		});
		const tokenRef = res.data.accessToken;
		const response = await axios.get('https://hms-backend-recreate.herokuapp.com/book', {
			params: {
				page: search.page,
				limit: 15,
				search_query: search.search_query,
			},
			headers: { Authorization: `Bearer ${tokenRef}` },
		});
		setTableNumber(response.data.halamanKe);
		setBooks(response.data.hasilBuku);
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
		const res = await axios.get('https://hms-backend-recreate.herokuapp.com/token', {
			withCredentials: true,
		});
		const tokenRef = res.data.accessToken;
		const response = await axios.get('https://hms-backend-recreate.herokuapp.com/book', {
			params: {
				page: 0,
				limit: 12,
				search_query: input,
			},
			headers: { Authorization: `Bearer ${tokenRef}` },
		});
		setBooks(response.data.hasilBuku);
		setSearch((prevState) => ({
			...prevState,
			maxPage: response.data.jumlahHalaman,
		}));
		setLoading(false);
	};

	const handleKeydown = async (e) => {
		const res = await axios.get('https://hms-backend-recreate.herokuapp.com/token', {
			withCredentials: true,
		});
		const tokenRef = res.data.accessToken;
		const input = document.getElementById('search').value;
		console.log(input);
		if (e.key === 'Enter') {
			setLoading(true);
			const response = await axios.get('https://hms-backend-recreate.herokuapp.com/book', {
				params: {
					page: 0,
					limit: 12,
					search_query: input,
				},
				headers: { Authorization: `Bearer ${tokenRef}` },
			});
			setBooks(response.data.hasilBuku);
			setSearch((prevState) => ({
				...prevState,
				maxPage: response.data.jumlahHalaman,
			}));
			setLoading(false);
		}
	};

	const pinjamHandler = async (id) => {
		const res = await axios.get('https://hms-backend-recreate.herokuapp.com/token', {
			withCredentials: true,
		});
		const tokenRef = res.data.accessToken;
		try {
			await axios.post(
				`https://hms-backend-recreate.herokuapp.com/pinjam/${id}`,
				{
					data: {
						userId: context.userId,
					},
				},
				{
					headers: { Authorization: `Bearer ${tokenRef}` },
				}
			);
			getBooks();
			toast.success('Buku berhasil dipinjam');
		} catch (error) {
			toast.error(`Opps sepertinya buku telah dipinjam`);
		}
	};

	useEffect(() => {
		setLoading(true);
		getBooks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search.page]);

	return (
		<div className="w-full h-full">
			<ToastContainer />
			<div className="my-2 flex mb-4 desktop:mb-8 desktop:w-1/4">
				<input type="text" id="search" className="py-2 px-4 w-full shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline" onKeyDown={handleKeydown} placeholder="Cari buku" />
				<button onClick={btnSearchHandler} className="px-4 rounded-md bg-unguTua text-white ml-2">
					Cari
				</button>
			</div>

			<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-blue-300 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="py-3 px-6">
								No
							</th>
							<th scope="col" className="py-3 px-6">
								Nama Buku
							</th>
							<th scope="col" className="py-3 px-6">
								Kategori
							</th>
							<th scope="col" className="py-3 px-6">
								Stock
							</th>
							<th scope="col" className="py-3 px-6">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{loading && Array.from({ length: 10 }, (v, i) => <SketelonTable type="pinjam" key={i} />)}
						{books &&
							books
								.filter((book) => book.judul_buku.toLocaleLowerCase().includes(''))
								.map((book, index) => (
									<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
										<th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{number++}
										</th>
										<Link to={`/book/detail/${book.id}`}>
											<td className="py-4 px-6">{book.judul_buku}</td>
										</Link>
										<td className="py-4 px-6 hover:text-slate-900">{toTitleCase(book.Kategori_id.kategori_nama)}</td>
										<td className="py-4 px-6">{book.stok}</td>
										<td className="py-4 px-6 hover:cursor-pointer">
											<p onClick={() => pinjamHandler(book.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
												Pinjam
											</p>
										</td>
									</tr>
								))}
					</tbody>
				</table>
			</div>
			<div className="flex justify-center my-4">
				<Stack spacing={2}>
					<Pagination count={search.maxPage} color="primary" onChange={pageNumberHandler} />
				</Stack>
			</div>
		</div>
	);
};

export default TablePinjam;

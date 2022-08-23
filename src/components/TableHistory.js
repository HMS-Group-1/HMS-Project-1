import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ContextProvider } from '../helpers/context';
import 'react-toastify/dist/ReactToastify.css';
import { Pagination, Stack } from '@mui/material';
import { toTitleCase, truncateString } from '../helpers/constant';
import SketelonTable from './SketelonTable';

const TableHistory = () => {
	let [tableNumber, setTableNumber] = useState(0);
	let number = tableNumber * 10 + 1;
	const [listKembali, setListKembali] = useState([]);
	const context = useContext(ContextProvider);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState({
		page: 0,
		maxPage: 1,
		search_query: '',
	});
	const getListPinjam = async () => {
		const res = await axios.get('https://hms-backend-recreate.herokuapp.com/token', {
			withCredentials: true,
		});
		const tokenRef = res.data.accessToken;
		// console.log(tokenRef)
		const response = await axios.get('https://hms-backend-recreate.herokuapp.com/listKembali', {
			params: {
				userId: context.userId,
				page: search.page,
				limit: 10,
				search_query: search.search_query,
				kategori: '',
				rak: '',
				isKembali: true,
			},
			headers: { Authorization: `Bearer ${tokenRef}` },
		});
		setListKembali(response.data.hasilBuku);
		setTableNumber(response.data.halamanKe);
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
		const response = await axios.get('https://hms-backend-recreate.herokuapp.com/listKembali', {
			params: {
				userId: context.userId,
				page: search.page,
				limit: 10,
				search_query: input,
				kategori: '',
				rak: '',
				isKembali: true,
			},
			headers: { Authorization: `Bearer ${tokenRef}` },
		});
		setListKembali(response.data.hasilBuku);
		setTableNumber(response.data.halamanKe);
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
		if (e.key === 'Enter') {
			setLoading(true);
			const response = await axios.get('https://hms-backend-recreate.herokuapp.com/listKembali', {
				params: {
					userId: context.userId,
					page: search.page,
					limit: 10,
					search_query: input,
					kategori: '',
					rak: '',
					isKembali: true,
				},
				headers: { Authorization: `Bearer ${tokenRef}` },
			});
			setListKembali(response.data.hasilBuku);
			setSearch((prevState) => ({
				...prevState,
				maxPage: response.data.jumlahHalaman,
			}));
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		getListPinjam();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search.page, search.search_query]);

	return (
		<div>
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
								Kategori Buku
							</th>
							<th scope="col" className="py-3 px-6">
								Tanggal Pengembalian
							</th>
							<th scope="col" className="py-3 px-6">
								Rak
							</th>
							<th scope="col" className="py-3 px-6">
								Status
							</th>
							<th scope="col" className="py-3 px-6">
								Durasi Peminjaman
							</th>
						</tr>
					</thead>
					<tbody>
						{loading && Array.from({ length: 10 }, (v, i) => <SketelonTable type="kembali" key={i} />)}
						{listKembali?.map((book, index) => (
							<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
								<th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{number++}
								</th>
								<td className="py-4 px-6">{truncateString(toTitleCase(book.tbl_buku.judul_buku), 48)}</td>
								<td className="py-4 px-6">{toTitleCase(book.tbl_buku.Kategori_id.kategori_nama)}</td>
								<td className="py-4 px-6">{book.tanggalPengembalian}</td>
								<td className="py-4 px-6">{toTitleCase(book.tbl_buku.Rak_id.lokasi_rak)}</td>
								<td className="py-4 px-6">
									{book.isKembali === true ? (
										<p className="text-green-600 text-sm text-center font-medium bg-green-600/20 py-1 px-2 rounded-md">Dikembalikan</p>
									) : (
										<p className="text-yellow-600 text-sm text-center font-medium bg-yellow-500/20 py-1 px-2 rounded-md">Dipinjam</p>
									)}
								</td>
								<td>
									<p className="text-center">{book.durasiPinjam} Hari</p>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{listKembali.length === 0 && (
					<div className="flex my-2 ml-2">
						<p className="m-auto ">Kamu belum pernah meminjam ataupun mengembalikan buku</p>
					</div>
				)}
			</div>
			<div className="flex justify-center my-4 w-full">
				<Stack spacing={2}>
					<Pagination count={search.maxPage} color="primary" onChange={pageNumberHandler} />
				</Stack>
			</div>
		</div>
	);
};

export default TableHistory;

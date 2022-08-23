import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ContextProvider } from '../helpers/context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pagination, Stack } from '@mui/material';
import { toTitleCase, diffInDays } from '../helpers/constant';
import SketelonTable from './SketelonTable';

const TablePengembalian = () => {
	let [tableNumber, setTableNumber] = useState(0);
	let number = tableNumber * 10 + 1;
	const [listPinjam, setListPinjam] = useState([]);
	const context = useContext(ContextProvider);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState({
		page: 0,
		maxPage: 1,
		search_query: '',
	});

	const kembaliHandler = async (id) => {
		const res = await axios.get('https://hms-backend-recreate.herokuapp.com/token', {
			withCredentials: true,
		});
		const tokenRef = res.data.accessToken;
		try {
			await axios.patch(
				`https://hms-backend-recreate.herokuapp.com/kembalikan/${id}`,
				{
					data: {
						userId: context.userId,
					},
				},
				{
					headers: { Authorization: `Bearer ${tokenRef}` },
				}
			);
			toast.success('Buku berhasil dikembalikan');
			getListPinjam();
		} catch (error) {
			toast.error(`${error.response.status} : ${error.response.statusText}`);
			console.log(error.response.status);
			console.log(error.response.statusText);
		}
	};

	const pageNumberHandler = (e, val) => {
		const pageNumber = val - 1;
		setSearch((prevState) => ({
			...prevState,
			page: pageNumber,
		}));
	};

	const getListPinjam = async () => {
		const res = await axios.get('https://hms-backend-recreate.herokuapp.com/token', {
			withCredentials: true,
		});
		const tokenRef = res.data.accessToken;
		const response = await axios.get('https://hms-backend-recreate.herokuapp.com/listPinjam', {
			params: {
				userId: context.userId,
				page: search.page,
				limit: 10,
				search_query: search.search_query,
				kategori: '',
				rak: '',
				isPinjam: true,
			},
			headers: { Authorization: `Bearer ${tokenRef}` },
		});
		setListPinjam(response.data.hasilBuku);
		setTableNumber(response.data.halamanKe);
		setSearch((prevState) => ({
			...prevState,
			maxPage: response.data.jumlahHalaman,
		}));
		setLoading(false);
	};

	useEffect(() => {
		setLoading(true);
		getListPinjam();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search.page]);
	return (
		<div>
			<ToastContainer />
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
								Tanggal Peminjaman
							</th>
							<th scope="col" className="py-3 px-6">
								Rak
							</th>
							<th scope="col" className="py-3 px-6">
								Durasi Peminjaman
							</th>
							<th scope="col" className="py-3 px-6">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{loading && Array.from({ length: 10 }, (v, i) => <SketelonTable type="kembali" key={i} />)}
						{listPinjam?.map((book, index) => (
							<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
								<th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{number++}
								</th>
								<td className="py-4 px-6">{toTitleCase(book.tbl_buku.judul_buku)}</td>
								<td className="py-4 px-6">{toTitleCase(book.tbl_buku.Kategori_id.kategori_nama)}</td>
								<td className="py-4 px-6">{book.tanggalPinjam}</td>
								<td className="py-4 px-6">{toTitleCase(book.tbl_buku.Rak_id.lokasi_rak)}</td>
								<td className="py-4 px-6">
									{book.isPinjam === true ? (
										<p className="text-yellow-600 text-sm text-center font-medium bg-yellow-500/20 py-1 px-2 rounded-md">{diffInDays(book.tanggalPinjam) === 0 ? 1 : diffInDays(book.tanggalPinjam)} Hari</p>
									) : (
										<p className="text-green-600 text-sm text-center font-medium bg-green-600/20 py-1 px-2 rounded-md">Dikembalikan</p>
									)}
								</td>
								{book.isPinjam === true ? (
									<td className="py-4 px-6 hover:cursor-pointer">
										<p onClick={() => kembaliHandler(book.buku_id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
											Kembalikan
										</p>
									</td>
								) : (
									<td className="py-4 px-6 hover:cursor-not-allowed">
										<p className="font-medium text-gray-600">Kembalikan</p>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
				{listPinjam.length === 0 && (
					<div className="flex my-2">
						<p className="m-auto ">Tidak ada buku yang telah dipinjam</p>
					</div>
				)}
			</div>
			<div className="flex justify-center my-4">
				<Stack spacing={2}>
					<Pagination count={search.maxPage} color="primary" onChange={pageNumberHandler} />
				</Stack>
			</div>
		</div>
	);
};

export default TablePengembalian;

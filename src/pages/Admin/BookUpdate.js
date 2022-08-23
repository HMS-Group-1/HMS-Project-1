import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../helpers/interceptor';
import Logo from '../../assets/capture1.PNG';
import './Admintest.css';

function toBase64(img) {
	//arr = new Uint8Array(arr) if it's an ArrayBuffer
	return btoa(img.reduce((data, byte) => data + String.fromCharCode(byte), ''));
}

const GetBookById = () => {
	const [judul_buku, setjudul_buku] = useState('');
	const [kategori_id, setKategori_id] = useState([]);
	const [selectedKategori, setSelectedKategori] = useState('');
	const [deskripsi, setDeskripsi] = useState('');
	const [gambar, setGambar] = useState('');
	const [preview, setPreview] = useState('');
	const [fileToUpload, setFileToUpload] = useState('');
	const [stok, setStok] = useState('');
	const [rak_id, setRak_id] = useState([]);
	const [selectedRak, setSelectedRak] = useState('');
	const [tahun_terbit, setTahun_terbit] = useState('');
	const { id } = useParams();
	const navigateTo = useNavigate();
	const [judulError, setJudulError] = useState('');
	const [kategoriError, setKategoriError] = useState('');
	const [deskripsiError, setDeskripsiError] = useState('');
	const [stokError, setStokError] = useState('');
	const [rakError, setRakError] = useState('');
	const [tahunError, setTahunError] = useState('');

	console.log(selectedKategori);

	useEffect(() => {
		theBook();
		getKategori();
		getRak();
	}, []);

	const theBook = async () => {
		const response = await axios.get(`https://hms-backend-recreate.herokuapp.com/kategori/book/${id}`);
		setjudul_buku(response.data.judul_buku);
		setSelectedKategori(response.data.kategori_id);
		setDeskripsi(response.data.deskripsi);
		setGambar(response.data.gambar.data);
		setSelectedRak(response.data.rak_id);
		setStok(response.data.stok);
		setTahun_terbit(response.data.tahun_terbit);
	};

	const getKategori = async () => {
		const response = await axios.get('https://hms-backend-recreate.herokuapp.com/kategori');
		setKategori_id(response.data);
	};

	const getRak = async () => {
		const response = await axios.get('https://hms-backend-recreate.herokuapp.com/rak');
		setRak_id(response.data);
	};

	const changeImage = (e) => {
		const image = e.target.files[0];
		console.log(e.target.files);
		const createURL = URL.createObjectURL(image);
		setGambar('');
		setPreview(createURL);
		setFileToUpload(image);
	};

	const submit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('gambar', fileToUpload);
		formData.append('judul_buku', judul_buku);
		formData.append('kategori_id', selectedKategori);
		formData.append('deskripsi', deskripsi);
		formData.append('gambar', fileToUpload);
		formData.append('stok', stok);
		formData.append('rak_id', selectedRak);
		formData.append('tahun_terbit', tahun_terbit);
		try {
			await axios.patch(`https://hms-backend-recreate.herokuapp.com/admin/updateBook/${id}`, formData, {
				headers: {
					'Content-type': 'multipart/form-data',
				},
			});
			navigateTo('/admin/book');
		} catch (error) {
			if (error.response.data.errors) {
				setJudulError('');
				setKategoriError('');
				setDeskripsiError('');
				setStokError('');
				setRakError('');
				setTahunError('');
				error.response.data.errors.map((e) => {
					if (e.param === 'judul_buku') setJudulError(e.msg);
					if (e.param === 'kategori_id') setKategoriError(e.msg);
					if (e.param === 'deskripsi') setDeskripsiError(e.msg);
					if (e.param === 'stok') setStokError(e.msg);
					if (e.param === 'rak_id') setRakError(e.msg);
					if (e.param === 'tahun_terbit') setTahunError(e.msg);
				});
			}
		}
	};

	return (
		<div>
			<form className="container pl-4" onSubmit={submit}>
				<img src={Logo} alt="logo" className="w-[300px] mt-5 pb-3" />
				<h1 className="text-center">Update Book</h1>
				<label>Judul Buku: </label>
				<input type="text" className="form-control border-2" value={judul_buku} onChange={(e) => setjudul_buku(e.target.value)} />
				{judulError}
				<label className="form-label">Kategori</label>
				{kategori_id.length > 0 ? (
					<select className="form-select border-2" onChange={(e) => setSelectedKategori(parseInt(e.target.value))}>
						<option s elected value={selectedKategori} disabled hidden>
							{selectedKategori}
						</option>
						{kategori_id.map((kategori, index) => (
							<option key={index} value={kategori.id}>
								{index + 1}
							</option>
						))}
					</select>
				) : (
					<select>
						<option>Please Wait..</option>
					</select>
				)}
				{kategoriError}
				<label className="form-label">Deskripsi</label>
				<textarea className="form-control border-2" type="text" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
				{deskripsiError}
				<label className="form-label">Gambar</label>
				{gambar ? <img src={`data:image/png;base64, ${toBase64(gambar)}`} alt={judul_buku} /> : ''}
				{preview ? <img src={preview} /> : ''}
				<label className="file-upload">
					<input
						id="update"
						className="block w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
						type="file"
						onChange={changeImage}
					/>
				</label>
				<label className="form-label">Stok</label>
				<input className="form-control border-2" type="text" value={stok} onChange={(e) => setStok(e.target.value)} />
				{stokError}
				<label className="form-label">Rak</label>
				{rak_id.length > 0 ? (
					<select className="form-select border-2" onChange={(e) => setSelectedRak(parseInt(e.target.value))}>
						<option selected value={selectedRak} disabled hidden>
							{selectedRak}
						</option>
						{rak_id.map((rak, index) => (
							<option key={index} value={rak.id}>
								{index + 1}
							</option>
						))}
					</select>
				) : (
					<select>
						<option>Please Wait..</option>
					</select>
				)}
				{rakError}
				<label className="form-label ">Tahun Terbit</label>
				<input className="form-control border-2" type="text" value={tahun_terbit} onChange={(e) => setTahun_terbit(e.target.value)} />
				{tahunError}
				<button type="submit" className="bg-biru text-white px-3 py-2 rounded-md">
					Update
				</button>
			</form>
		</div>
	);
};

export default GetBookById;

import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../helpers/interceptor';
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
		const response = await axios.get(`http://localhost:5000/admin/book/${id}`);
		setjudul_buku(response.data.judul_buku);
		setSelectedKategori(response.data.kategori_id);
		setDeskripsi(response.data.deskripsi);
		setGambar(response.data.gambar.data);
		setSelectedRak(response.data.rak_id);
		setStok(response.data.stok);
		setTahun_terbit(response.data.tahun_terbit);
	};

	const getKategori = async () => {
		const response = await axios.get('http://localhost:5000/kategori');
		setKategori_id(response.data);
	};

	const getRak = async () => {
		const response = await axios.get('http://localhost:5000/rak');
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
			await axios.patch(`http://localhost:5000/admin/updateBook/${id}`, formData, {
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
			<form className="container" onSubmit={submit}>
				<label>Judul Buku: </label>
				<input type="text" value={judul_buku} onChange={(e) => setjudul_buku(e.target.value)} />
				{judulError}
				<label>Kategori</label>
				{kategori_id.length > 0 ? (
					<select onChange={(e) => setSelectedKategori(parseInt(e.target.value))}>
						<option selected value={selectedKategori} disabled hidden>
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
				<label>Deskripsi</label>
				<textarea type="text" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
				{deskripsiError}
				<label>Gambar</label>
				{gambar ? <img src={`data:image/png;base64, ${toBase64(gambar)}`} alt={judul_buku} /> : ''}
				{preview ? <img src={preview} /> : ''}
				<label className="file-upload">
					<input type="file" onChange={changeImage} />
					Choose a file
				</label>
				<label>Stok</label>
				<input type="text" value={stok} onChange={(e) => setStok(e.target.value)} />
				{stokError}
				<label>Rak</label>
				{rak_id.length > 0 ? (
					<select onChange={(e) => setSelectedRak(parseInt(e.target.value))}>
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
				<label>Tahun Terbit</label>
				<input type="text" value={tahun_terbit} onChange={(e) => setTahun_terbit(e.target.value)} />
				{tahunError}
				<button type="submit">Update</button>
			</form>
		</div>
	);
};

export default GetBookById;

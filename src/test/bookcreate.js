import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../helpers/interceptor';
import './Admintest.css';

const Bookcreate = () => {
	const [judul_buku, setjudul_buku] = useState('');
	const [judulError, setJudulError] = useState('');
	const [kategori_id, setKategori_id] = useState([]);
	const [kategoriError, setKategoriError] = useState('');
	const [selectedKategori, setSelectedKategori] = useState('');
	const [deskripsi, setDeskripsi] = useState('');
	const [deskripsiError, setDeskripsiError] = useState('');
	const [preview, setPreview] = useState('');
	const [fileToUpload, setFileToUpload] = useState('');
	const [stok, setStok] = useState('');
	const [stokError, setStokError] = useState('');
	const [rak_id, setRak_id] = useState([]);
	const [rakError, setRakError] = useState('');
	const [selectedRak, setSelectedRak] = useState('');
	const [tahun_terbit, setTahun_terbit] = useState('');
	const [tahunError, setTahunError] = useState('');
	const navigateTo = useNavigate();

	useEffect(() => {
		getKategori();
		getRak();
	}, []);

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
			await axios.post(`http://localhost:5000/admin/createBook/`, formData, {
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
						<option selected value="" disabled hidden></option>
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
				{preview ? <img src={preview} alt="Upload gagal" /> : 'Gambar tidak boleh kosong'}
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
						<option selected value="" disabled hidden></option>
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
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default Bookcreate;

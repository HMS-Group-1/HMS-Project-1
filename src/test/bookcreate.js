import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../helpers/interceptor';
import './Admintest.css';

function toBase64(img) {
	//arr = new Uint8Array(arr) if it's an ArrayBuffer
	return btoa(img.reduce((data, byte) => data + String.fromCharCode(byte), ''));
}

const Bookcreate = () => {
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
			console.log(error);
		}
	};

	return (
		<div>
			<form className="container" onSubmit={submit}>
				<label>Judul Buku: </label>
				<input type="text" value={judul_buku} onChange={(e) => setjudul_buku(e.target.value)} />
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
				<label>Deskripsi</label>
				<textarea type="text" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
				<label>Gambar</label>
				{preview ? <img src={preview} /> : ''}
				<label className="file-upload">
					<input type="file" onChange={changeImage} />
					Choose a file
				</label>
				<label>Stok</label>
				<input type="text" value={stok} onChange={(e) => setStok(e.target.value)} />
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
				<label>Tahun Terbit</label>
				<input type="text" value={tahun_terbit} onChange={(e) => setTahun_terbit(e.target.value)} />
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default Bookcreate;

import axios from '../helpers/interceptor.js';
import { React, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Logo from '../assets/capture1.PNG';
import '../styles/KembalikanBuku.css';
import { ContextProvider } from '../helpers/context.js';

const DetailBuku = () => {
	const params = useParams();
	const { isLogin } = useContext(ContextProvider);
	const [books, setBookShow] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getKategoris();
	}, []);
	const getKategoris = useCallback(async () => {
		const { data: res } = await axios.get(`https://hms-backend-recreate.herokuapp.com/kategori/book/${params.id}`);
		setBookShow(res);
		setTimeout(setLoading(true), 2000);
	}, [params.id]);

	const onBinaryMessage = (img) => {
		return btoa(img.reduce((data, byte) => data + String.fromCharCode(byte), ''));
	};

	const navigate = useNavigate();

	function kembali() {
		navigate('/book');
	}
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
						userId: isLogin.id,
					},
				},
				{
					headers: { Authorization: `Bearer ${tokenRef}` },
				}
			);
			toast.success('Buku berhasil dipinjam');
			navigate('/book');
		} catch (error) {
			toast.error(`Opps sepertinya buku telah dipinjam`);
			console.log(error.response.status);
			console.log(error.response.statusText);
		}
	};

	return (
		<div class="container-fluid">
			<ToastContainer />
			<div class="row mx-3 my-5">
				<div class="col-4"></div>
				<div class="col-4">
					<img src={Logo} alt="" className="w-[400px]"></img>
				</div>
				<div class="col-3"></div>
			</div>
			<hr className="line"></hr>
			<br></br>
			{loading ? (
				<div key={books.id}>
					<div class="flex tablet:mx-3 desktop:justify-center desktop:items-center ">
						<img class="desktop:w-4/12  tablet:mx-12 tablet:my-2  mobile:mx-12 " src={`data:image/png;base64, ${onBinaryMessage(books.gambar.data)}`} alt={books.judul_buku} />
					</div>
					<div class="flex justify-start desktop:flex-col font-poppins  mobile:mx-12 mobile:my-5 mobile:px-5 mobile:items-center mobile:pb-8  ">
						<h1 className="font-bold text-3xl justify-start flex-col rounded-md font-poppins">
							<b>{books.judul_buku}</b>
						</h1>
						<br></br>
						<h2 className="text-xl font-bold justify-start flex-col rounded-md font-poppins">
							<strong>No : {books.id}</strong>
						</h2>
						<br></br>
						<h3 className="text-2xl font-bold justify-start flex-col rounded-md font-poppins">
							<strong>Category: {books.Kategori_id.kategori_nama}</strong>
						</h3>
						<br></br>
						<h2 className="text-2xl font-bold justify-start flex-col rounded-md font-poppins">
							<strong>Sinopsis</strong>
						</h2>
						<hr></hr>
						<p className="text-xl justify-start w-7/12 flex-col rounded-md font-poppins">{books.deskripsi}</p>
						<div class="pt-4 desktop:flex-row tablet:flex tablet:flex-col mobile:flex mobile:flex-col">
							<button className="bg-red-500 w-12/12 text-white w-full font-bold py-3 px-4 mx-1 rounded-md mb-3 focus:outline-none focus:shadow-outline" onClick={kembali}>
								kembali
							</button>
							<button className="bg-blue-500 w-12/12 text-white w-full font-bold py-3 px-4 mx-1 rounded-md mb-3 focus:outline-none focus:shadow-outline" onClick={() => pinjamHandler(books.id)}>
								Pinjam
							</button>
						</div>
					</div>
					<div class="col-1"></div>
				</div>
			) : (
				'loading'
			)}
		</div>
	);
};
export default DetailBuku;

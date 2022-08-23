import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import logo from '../assets/logobukabuku.png';
import { ContextProvider } from '../helpers/context';

const Login = () => {
	const { setIsLogin } = useContext(ContextProvider);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [emailErrorMessage, setEmailErrorMessage] = useState('');
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
	const navigateTo = useNavigate();

	const Auth = async (e) => {
		e.preventDefault();
		try {
			await axios
				.post('https://hms-backend-recreate.herokuapp.com/login', {
					email: email,
					password: password,
				})
				.then((response) => {
					const decoded = jwt_decode(response.data.accessToken);
					setIsLogin({ nama: decoded.nama, id: decoded.userId, status: true });
					if (decoded.role === 'admin') return navigateTo('/admin/user');
					if (decoded.role === 'anggota') return navigateTo('/book');
				});
		} catch (error) {
			if (error.response) {
				setMessage(error.response.data.message);
				setEmailErrorMessage('');
				setPasswordErrorMessage('');
				if (error.response.data.errors) {
					error.response.data.errors.forEach((e) => {
						if (e.param) {
							if (e.param === 'email') setEmailErrorMessage(e.msg);
							if (e.param === 'password') setPasswordErrorMessage(e.msg);
						}
					});
				}
			}
		}
	};

	return (
		<div className=" pt-7  desktop:flex desktop:items-center desktop:h-screen desktop:justify-center tablet:mx-3">
			<div className="desktop:w-5/12 laptop: w-full mobile:w-full tablet:w-full ">
				<div>
					<img className=" desktop:w-12/12 w-9/12 tablet:mx-12 tablet:my-2  mobile:mx-12 " src={logo} alt="logo" />
				</div>
				<figure className="tablet:mx-12 mobile:mx-12">
					<blockquote className="font-poppins font-semibold py-3 text-justify desktop:leading-normal desktop:text-2xl tablet:text-xl tablet:leading-loose tablet:my-2 tablet:w-full mobile:pt-3 mobile:text-base mobile:leading-loose mobile:my-2">
						Buku adalah pembawa peradaban. Tanpa buku, sejarah itu sunyi, sastra itu bodoh, sains lumpuh, pemikiran dan spekulasi terhenti. Buku adalah mesin perubahan, jendela, di dunia, mercusuar yang didirikan di lautan waktu
					</blockquote>
					<figcaption className="font-poppins font-semibold desktop:text-2xl tablet:text-xl tablet:pb-5 mobile:text-base mobile:pb-5"> -Barbara W.Tuchman</figcaption>
				</figure>
			</div>

			<div className="bg-red-50 flex justify-start flex-col rounded-md font-poppins  mobile:mx-12 mobile:my-5 mobile:px-5 mobile:items-center mobile:pb-8  ">
				<h3 className=" font-semibold w-11/12 tablet:w-full tablet:pl-3 tablet:text-2xl mobile:pt-8  mobile:text-xl  mobile:w-full mobile:px-3">Selamat Datang,</h3>
				<h5 className="w-11/12 pt-0 pb-3 tablet:w-full tablet:pl-3 tablet:pt-1 tablet:text-base mobile:w-full mobile:text-sm mobile:px-3">Masuk dengan akunmu dulu ya!</h5>
				<form onSubmit={Auth} className="flex flex-col w-full mobile:px-3">
					<p className="text-center text-merahTua font-bold text-lg desktop:mb-2 tablet:my-2 mobile:my-2">{message}</p>
					<label className="pb-2" htmlFor="email">
						Email
					</label>
					<input
						className="appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="text"
						placeholder="@email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<p className="text-merahTua font-bold text-lg pb-2 mb-1">{emailErrorMessage}</p>
					<label className="pb-2" htmlFor="password">
						Password
					</label>
					<input
						className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline "
						id="password"
						type="password"
						placeholder="******************"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<p className="text-merahTua font-bold text-lg tablet:my-1 mobile:my-1">{passwordErrorMessage}</p>
					<div className="items-center justify-between pt-4 tablet:flex tablet:flex-col mobile:flex mobile:flex-col">
						<button className="bg-yellow-200 text-black w-full font-bold py-2 px-4 rounded-md mb-3 focus:outline-none focus:shadow-outline tablet:pt-3" type="submit">
							masuk
						</button>
						<p className="inline-block align-baseline font-semibold text-sm text-blue-500 tablet:pt-2 ">
							Belum punya akun?{' '}
							<Link className="hover:underline" to={'/register'}>
								Daftar Sekarang!
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;

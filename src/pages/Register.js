import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logobukabuku.png';

const Register = () => {
	const [nama, setNama] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [no_telp, setNo_telp] = useState('');
	const [role] = useState('anggota');
	const navigateTo = useNavigate();
	const [message, setMessage] = useState('');
	const [namaErrorMessage, setNamaErrorMessage] = useState('');
	const [emailErrorMessage, setEmailErrorMessage] = useState('');
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
	const [no_telpErrorMessage, setNo_telpErrorMessage] = useState('');

	const register = async (e) => {
		e.preventDefault();
		try {
			await axios.post('https://hms-backend-recreate.herokuapp.com/register', {
				nama: nama,
				email: email,
				password: password,
				no_telp: no_telp,
				role: role,
			});
			navigateTo('/');
		} catch (error) {
			if (error.response) {
				setMessage(error.response.data.message);
				setEmailErrorMessage('');
				setPasswordErrorMessage('');
				setNamaErrorMessage('');
				setNo_telpErrorMessage('');
				if (error.response.data.errors) {
					error.response.data.errors.forEach((e) => {
						if (e.param) {
							if (e.param === 'nama') setNamaErrorMessage(e.msg);
							if (e.param === 'email') setEmailErrorMessage(e.msg);
							if (e.param === 'password') setPasswordErrorMessage(e.msg);
							if (e.param === 'no_telp') setNo_telpErrorMessage(e.msg);
						}
					});
				}
			}
		}
	};

	return (
		<div className=" pt-7 desktop:flex desktop:items-center desktop:h-screen desktop:justify-center tablet:mx-3">
			<div className="desktop:w-4/12 laptop: w-ful  tablet:w-full mobile:w-full">
				<div>
					<img className=" desktop:w-12/12 w-9/12 tablet:mx-12 tablet:my-2 mobile:mx-12 " src={logo} alt="logo" />
				</div>
				<figure className="tablet:mx-12 mobile:mx-12">
					<blockquote className="font-poppins font-semibold  text-justify desktop:py-7 desktop:text-2xl desktop:leading-loose  tablet:text-2xl tablet:my-2 tablet:py-5 tablet:leading-loose tablet:w-full mobile:my-5 mobile:text-base mobile:leading-loose">
						Buku adalah pembawa peradaban. Tanpa buku, sejarah itu sunyi, sastra itu bodoh, sains lumpuh, pemikiran dan spekulasi terhenti. Buku adalah mesin perubahan, jendela, di dunia, mercusuar yang didirikan di lautan waktu
					</blockquote>
					<figcaption className="font-poppins font-semibold desktop:text-2xl tablet:text-xl tablet:pb-5 mobile:text-base"> -Barbara W.Tuchman</figcaption>
				</figure>
			</div>

			<div className="bg-red-50 flex justify-start flex-col rounded-md font-poppins  desktop:w-4/12 mobile:mx-12 mobile:my-5 mobile:px-5 mobile:items-center mobile:pb-8  ">
				<h3 className=" font-semibold w-11/12 tablet:w-full tablet:pl-4 tablet: tablet:text-2xl mobile:pt-8  mobile:text-xl  mobile:full ">Selamat Datang,</h3>
				<h5 className="w-11/12 pt-0 pb-5 tablet:w-full tablet:pl-4 tablet:pt-1 tablet:text-base mobile:w-11/12 mobile:text-sm">Daftar akunmu dulu ya!</h5>
				<form onSubmit={register} className="flex flex-col w-full mobile:px-4">
					<p className="text-center text-merahTua font-bold text-lg -mb-2">{message}</p>
					<div className="desktop:flex desktop:flex-row desktop:items-center desktop:-mb-2 tablet:mt-6 mobile:mt-6">
						<div className="desktop:w-full">
							<label className="pb-2" for="nama">
								Nama
							</label>
							<input
								value={nama}
								onChange={(e) => setNama(e.target.value)}
								class=" appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline "
								id="nama"
								type="text"
								placeholder="Masukkan Nama"
							/>
							<p className="text-center text-merahTua font-bold text-base desktop:hidden">{namaErrorMessage}</p>
						</div>
						<div className="desktop:mt-2 desktop:w-full tablet:mt-2 mobile:mt-2">
							<label className="pb-2" for="no_telp">
								Nomor Telepon
							</label>
							<input
								value={no_telp}
								onChange={(e) => setNo_telp(e.target.value)}
								class=" appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="no_telp"
								type="text"
								oninput={(e) => e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '1')}
								placeholder="08xxxxxxxx"
							/>
							<p className="text-center text-merahTua font-bold text-base desktop:hidden">{no_telpErrorMessage} </p>
						</div>
					</div>
					<div className="desktop:flex desktop:flex-row  tablet:hidden mobile:hidden">
						<p className="text-center text-merahTua font-bold text-lg desktop:text-sm  desktop:w-full">{namaErrorMessage} </p>
						<p className="text-center text-merahTua font-bold text-lg desktop:w-full  desktop:text-sm">{no_telpErrorMessage}</p>
					</div>
					<div className="desktop:flex desktop:flex-row desktop:items-center ">
						<div className="desktop:w-full">
							<label className="pb-2 desktop:mr-4" for="Email">
								Email
							</label>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								class=" appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline "
								id="Email"
								type="text"
								placeholder="Masukkan Email"
							/>
						</div>
						<p className="text-center text-merahTua font-bold text-base  desktop:hidden desktop:text-sm desktop:w-full">{emailErrorMessage} </p>
						<div className="desktop:w-full tablet:mt-2 mobile:mt-2">
							<label className="pb-2" for="password">
								Password
							</label>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								class="appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700  leading-tight focus:outline-none focus:shadow-outline "
								id="password"
								type="password"
								placeholder="******************"
							/>
							<p className="text-center text-merahTua font-bold text-base  desktop:hidden desktop:text-sm desktop:w-full">{passwordErrorMessage} </p>
						</div>
					</div>
					<div className="desktop:flex desktop:flex-row desktop:justify-start tablet:hidden mobile:hidden">
						<p className="text-center text-merahTua font-bold text-lg  desktop:text-sm  desktop:w-full">{emailErrorMessage} </p>
						<p className="text-center text-merahTua font-bold text-lg desktop: w-full desktop:text-sm">{passwordErrorMessage}</p>
					</div>

					<label className="pb-2 tablet:mt-2 mobile:mt-2" for="role">
						Role
					</label>
					<select className="bg-white border rounded w-full py-2 px-3 mb-4" id="role">
						<option className="" value={role}>
							anggota
						</option>
					</select>
					<div class="items-center justify-between  tablet:flex tablet:flex-col tablet:mt-4 mobile:flex mobile:flex-col mobile:mt-4">
						<button class="bg-yellow-200 text-black w-full font-bold py-2 px-4 rounded-md mb-3 focus:outline-none focus:shadow-outline tablet:pt-3" type="submit">
							daftar
						</button>
						<p class="inline-block align-baseline font-bold text-sm text-blue-500 tablet:pt-2 ">
							Sudah punya akun?{' '}
							<Link className="hover:underline" to={'/login'}>
								{' '}
								Masuk di sini
							</Link>{' '}
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;

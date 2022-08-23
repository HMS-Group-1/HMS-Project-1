import React, { useCallback, useContext, useEffect, useState } from 'react';
import Logo from '../assets/capture1.PNG';
import { useNavigate } from 'react-router-dom';
import axios from '../helpers/interceptor.js';
import { ContextProvider } from '../helpers/context';

const EditUser = () => {
	const { isLogin, setIsLogin } = useContext(ContextProvider);
	const [nama, setNama] = useState();
	const [email, setEmail] = useState();
	const [password, setNewPassword] = useState();
	const [oldpassword, setOldPassword] = useState();
	const [no_telp, setNo_telp] = useState();
	const [errorNama, setErrorNama] = useState(false);
	const [errorEmail, setErrorEmail] = useState(false);
	const [errorPass, setErrorPass] = useState(false);
	const [errorTelp, setErrorTelp] = useState(false);
	const [errorTelpLength, setErrorTelpLength] = useState(false);
	const [isNormalData, setIsNormalData] = useState(true);
	const [isChangePass, setIsChangePass] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	var userData = {};
	const submitData = async (e) => {
		e.preventDefault();
		setErrorNama('');
		setErrorEmail('');
		setErrorTelpLength('');
		setErrorPass('');
		if (nama === '' || nama === undefined) {
			return setErrorNama(true);
		}
		if (email === '' || email === undefined) {
			return setErrorEmail(true);
		}
		if (no_telp === '' || no_telp === undefined) {
			return setErrorTelp(true);
		}
		if (no_telp.toString().length !== 10 || no_telp.toString().length === undefined) {
			return setErrorTelpLength(true);
		}
		if (isChangePass) {
			if (password === '' || password === undefined) {
				setErrorPass(true);
			}
		}
		if ((nama !== undefined || nama !== '') && (email !== undefined || email !== '') && (no_telp !== '' || no_telp !== undefined || no_telp.length === 10)) {
			try {
				console.log('MASUK');
				await axios.patch(`https://hms-backend-recreate.herokuapp.com/updateuser`, {
					nama: nama,
					email: email,
					password: password,
					no_telp: no_telp,
				});
				setIsLogin({ ...isLogin, nama: nama });
				if (isNormalData) {
					navigate('/book');
				}
			} catch (error) {
				console.log(error);
			}
			if (isChangePass) {
				if ((password !== undefined || password !== '') && (oldpassword !== undefined || oldpassword !== '')) {
					try {
						await axios.patch(`https://hms-backend-recreate.herokuapp.com/changePassword`, {
							oldPassword: oldpassword,
							newPassword: password,
						});
						navigate('/book');
					} catch (error) {
						setErrorMessage(error.response.data);
						console.log(errorMessage);
					}
				}
			}
		}
	};
	useEffect(() => {
		getUser();
	}, []);
	const getUser = async () => {
		const { data: res } = await axios.get(`https://hms-backend-recreate.herokuapp.com/userdata`);
		userData = res;
		console.log(userData);
		if (userData != null || userData !== undefined) {
			setNama(userData.nama);
			setEmail(userData.email);
			setNo_telp(userData.no_telp);
		}
	};
	const navigate = useNavigate();
	function kembali() {
		navigate('/book');
	}
	function GantiPass(e) {
		e.preventDefault();
		setIsChangePass(true);
		setIsNormalData(false);
	}
	function cancelPass(e) {
		e.preventDefault();
		setIsChangePass(false);
		setIsNormalData(true);
	}
	return (
		<div class="container-fluid">
			<div class="row">
				<div class="col-4"></div>
				<div class="col-4">
					<img src={Logo} alt=""></img>
				</div>
				<div class="col-3"></div>
				<br></br>
				<br></br>
				<h4 class="font-bold text-5xl justify-start flex-col rounded-md font-poppins">Edit User</h4>
				<br></br>
				<hr></hr>
				<br></br>
				<form onSubmit={submitData}>
					{userData !== undefined ? (
						<div class="pt-2  desktop:flex  tablet:mx-3">
							<div class="desktop:w-6/12 laptop: w-full mobile:w-full tablet:w-full ">
								<div class="col-12">
									<label class="font-bold text-2xl justify-start flex-col rounded-md font-poppins "> New Username </label>
									<input type="text" class="appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setNama(e.target.value)} value={nama}></input>
									{errorNama ? (
										<div class="alert alert-danger alert-dismissible">
											<strong>Danger!</strong> Nama Tidak Boleh Kosong
										</div>
									) : (
										<div></div>
									)}
								</div>
								<div class="col-12">
									<label class="font-bold text-2xl justify-start flex-col rounded-md font-poppins "> New Email Address </label>
									<input type="email" class="appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setEmail(e.target.value)} value={email}></input>
									{errorEmail ? (
										<div class="alert alert-danger alert-dismissible">
											<strong>Danger!</strong> Email Tidak Boleh Kosong
										</div>
									) : (
										<div></div>
									)}
								</div>
								<div class="col-12">
									<label class="font-bold text-2xl justify-start flex-col rounded-md font-poppins ">New Phone Number </label>
									<input type="number" class="appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setNo_telp(e.target.value)} value={no_telp}></input>
									{errorTelp ? (
										<div class="alert alert-danger alert-dismissible">
											<strong>Danger!</strong> Telepon Tidak Boleh Kosong
										</div>
									) : (
										<div></div>
									)}
									{errorTelpLength ? (
										<div class="alert alert-danger alert-dismissible">
											<strong>Danger!</strong>No Telepon Harus terdiri dari 10 Angka
										</div>
									) : (
										<div></div>
									)}
								</div>
							</div>
							{isChangePass ? (
								<div class="flex justify-start flex-col rounded-md font-poppins  mobile:mx-12 mobile:my-5 mobile:px-5 mobile:items-center mobile:pb-8  ">
									<div class="card">
										<div class="row">
											<div class="col-6">
												<label class="font-bold text-2xl justify-start flex-col rounded-md font-poppins "> Old Password </label>
												<input type="password" class="appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setOldPassword(e.target.value)}></input>
												{errorPass ? (
													<div class="alert alert-danger alert-dismissible">
														<strong>Danger!</strong> Password Tidak Boleh Kosong
													</div>
												) : (
													<div></div>
												)}
											</div>
											<div class="col-6">
												<label class="font-bold text-2xl justify-start flex-col rounded-md font-poppins "> Change Password </label>
												<input type="password" class="appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setNewPassword(e.target.value)}></input>
												{errorPass ? (
													<div class="alert alert-danger alert-dismissible">
														<strong>Danger!</strong> Password Tidak Boleh Kosong
													</div>
												) : (
													<div></div>
												)}
											</div>
											{errorMessage !== undefined ? <div>{errorMessage}</div> : <div></div>}
											<div class="col-2 pt-5">
												<button class="bg-red-500 text-white w-full font-bold py-2 px-4 rounded-md mb-3 focus:outline-none focus:shadow-outline" onClick={cancelPass}>
													cancel
												</button>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div></div>
							)}
						</div>
					) : (
						<p>loading</p>
					)}

					<div class="pt-4 desktop:flex-row tablet:flex tablet:flex-col mobile:flex mobile:flex-col">
						<button class="bg-red-500 w-1/12 text-white  font-bold py-3 px-4 mx-1 rounded-md mb-3 focus:outline-none focus:shadow-outline" onClick={kembali}>
							kembali
						</button>
						<button class="bg-green-500 w-1/12 text-white  font-bold py-3 px-4 mx-1 rounded-md mb-3 focus:outline-none focus:shadow-outline" onClick={GantiPass}>
							Ganti Password
						</button>
						<button class="bg-blue-500 w-1/12 text-white font-bold py-3 px-4 mx-1 rounded-md mb-3 focus:outline-none focus:shadow-outline" type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default EditUser;

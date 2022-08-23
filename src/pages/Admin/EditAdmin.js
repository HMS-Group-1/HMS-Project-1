import React, { useState, useEffect } from 'react';
import axios from '../../helpers/interceptor';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from '../../assets/capture1.PNG';

const EditAdmin = () => {
	const [nama, setName] = useState('');
	const [namaError, setNamaError] = useState('');
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [no_telp, setNoTelp] = useState('');
	const [no_telpError, setNo_telpError] = useState('');
	const [role, setRole] = useState('');
	const navigate = useNavigate();
	const { id } = useParams();

	const updateUser = async (e) => {
		e.preventDefault();
		try {
			await axios.patch(`https://hms-backend-recreate.herokuapp.com/admin/updateUser/${id}`, {
				nama: nama,
				email: email,
				no_telp: no_telp,
				role: role,
			});
			navigate('/admin/user');
		} catch (error) {
			if (error.response) {
				setNamaError('');
				setEmailError('');
				setNo_telpError('');
				error.response.data.errors.forEach((e) => {
					if (e.param === 'nama') setNamaError(e.msg);
					if (e.param === 'email') setEmailError(e.msg);
					if (e.param === 'no_telp') setNo_telpError(e.msg);
				});
			}
		}
	};

	const getUserById = async () => {
		const response = await axios.get(`https://hms-backend-recreate.herokuapp.com/admin/user/${id}`);
		setName(response.data.nama);
		setEmail(response.data.email);
		setNoTelp(response.data.no_telp);
		setRole(response.data.role);
	};

	useEffect(() => {
		getUserById();
	}, []);

	return (
		<div className="container-fluid px-4 py-4">
			<div className="row">
				<div className="col-4"></div>
				<div className="col-4">
					<img src={Logo} alt="" className="w-[300px] px-2 py-3"></img>
				</div>
				<div className="col-3"></div>
				<br></br>
				<br></br>
				<h4 className="font-bold text-2xl text-center flex-col rounded-md font-poppins">Edit User & Admin</h4>
				<br></br>
				<hr></hr>
				<br></br>
				<form onSubmit={updateUser} className="flex justify-start flex-col rounded-md font-poppins">
					<div className="card">
						<div className="row ">
							<div className="col-6">
								<label className="font-bold text-2xl justify-start flex-col rounded-md font-poppins ">Nama</label>
								<input type="text" className="appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline" value={nama} onChange={(e) => setName(e.target.value)} placeholder="Nama" />
							</div>
							<div className="-mt-3">{namaError}</div>
						</div>
						<div className="col-12">
							<label className="font-bold text-2xl justify-start flex-col rounded-md font-poppins">Email</label>
							<input type="email" className="appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
						</div>
						<div className="-mt-3">{emailError}</div>
						<div className="col-12">
							<label className="font-bold text-2xl justify-start flex-col rounded-md font-poppins">No Telpon</label>
							<input type="text" className="appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700  focus:outline-none focus:shadow-outline" value={no_telp} onChange={(e) => setNoTelp(e.target.value)} placeholder="No Telpon" />
						</div>
						<div className="-mt-3 mb-3">{no_telpError}</div>
					</div>
					<div className="col-12">
						<label className="font-bold text-2xl justify-start flex-col rounded-md font-poppins mr-2">Role</label>
						<select value={role} onChange={(e) => setRole(e.target.value)} className="border rounded w-half py-2 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline">
							<option value="admin">admin</option>
							<option value="anggota">anggota</option>
						</select>
					</div>
					<button type="submit" className="bg-biru text-white px-2 py-1 rounded-md">
						Update
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditAdmin;

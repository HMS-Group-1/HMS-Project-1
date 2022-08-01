import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BukuAdmin from './pages/daftarbukuadmin';
import DetailBuku from './pages/detailBuku';
import EditUser from './pages/EditUser';
import Login from './pages/Login';

import PinjamBuku from './pages/pinjambuku';
import Register from './pages/Register';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/edit" element={<PinjamBuku />} />
			<Route path="/detail" element={<DetailBuku />} />
			<Route path="/admin/daftarbuku" element={<BukuAdmin />} />
			<Route path="/daftaruser" element={<PinjamBuku />} />
			<Route path="/EditUser" element={<EditUser />} />
		</Routes>
	);
}
export default Router;

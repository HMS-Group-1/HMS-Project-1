import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

import PinjamBuku from './pages/pinjambuku';
import Register from './pages/Register';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/pinjambuku" element={<PinjamBuku />} />
			<Route path="/kembalikanbuku" element={<PinjamBuku />} />
			<Route path="/daftaruser" element={<PinjamBuku />} />
		</Routes>
	);
}
export default Router;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import PinjamBuku from './pages/pinjambuku';
import Register from './pages/Register';
import Admintest from './test/Admintest';
import GetBook from './test/booktest';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/admin/book" element={<GetBook />} />
			<Route path="/detail/:id" />
			<Route path="/admin/user" element={<Admintest />} />
			<Route path="/register" element={<Register />} />
			<Route path="/pinjambuku" element={<PinjamBuku />} />
			<Route path="/kembalikanbuku" element={<PinjamBuku />} />
			<Route path="/daftaruser" element={<PinjamBuku />} />
		</Routes>
	);
}
export default Router;

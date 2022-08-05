import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EditUser from './pages/EditUser';
import ListBooks from './pages/ListBooks';
import Login from './pages/Login';

import PinjamBuku from './pages/pinjambuku';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import DetailBuku from './pages/detailBuku';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/book" element={<ProtectedRoute><ListBooks /></ProtectedRoute>} />
			<Route path="/book/detail/:id" element={<ProtectedRoute><DetailBuku /></ProtectedRoute>} />
			{/* <Route path="/pinjambuku" element={<PinjamBuku />} />
			<Route path="/kembalikanbuku" element={<PinjamBuku />} /> */}
			<Route path="/EditUser" element={<EditUser />} />
		</Routes>
	);
}
export default Router;

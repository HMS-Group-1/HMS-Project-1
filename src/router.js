import React from 'react';
import { Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import ListBooks from './pages/ListBooks';
=======
>>>>>>> bf61aabcddd8a645ab36c3c2b2c4c9124f2b0de5
import Login from './pages/Login';

import PinjamBuku from './pages/pinjambuku';
import Register from './pages/Register';
<<<<<<< HEAD
import ProtectedRoute from './components/ProtectedRoute';
=======
>>>>>>> bf61aabcddd8a645ab36c3c2b2c4c9124f2b0de5

function Router() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/register" element={<Register />} />
<<<<<<< HEAD
			<Route path="/book" element={<ProtectedRoute><ListBooks /></ProtectedRoute>} />
=======
>>>>>>> bf61aabcddd8a645ab36c3c2b2c4c9124f2b0de5
			<Route path="/pinjambuku" element={<PinjamBuku />} />
			<Route path="/kembalikanbuku" element={<PinjamBuku />} />
			<Route path="/daftaruser" element={<PinjamBuku />} />
		</Routes>
	);
}
export default Router;

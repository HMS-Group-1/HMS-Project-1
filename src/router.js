import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ListBooks from './pages/ListBooks';
import Login from './pages/Login';
import PinjamBuku from './pages/pinjambuku';
import Register from './pages/Register';
import Admintest from './test/Admintest';
import Bookcreate from './test/bookcreate';
import GetBookById from './test/bookdetail';
import GetBook from './test/booktest';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/admin/book" element={<GetBook />} />
			<Route path="/admin/book/detail/:id" element={<GetBookById />} />
			<Route path="/admin/book/create" element={<Bookcreate />} />
			<Route path="/admin/user" element={<Admintest />} />
			<Route path="/register" element={<Register />} />
			<Route
				path="/book"
				element={
					<ProtectedRoute>
						<ListBooks />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/detail"
				element={
					<ProtectedRoute>
						<ListBooks />
					</ProtectedRoute>
				}
			/>
			<Route path="/pinjambuku" element={<PinjamBuku />} />
			<Route path="/kembalikanbuku" element={<PinjamBuku />} />
			<Route path="/daftaruser" element={<PinjamBuku />} />
		</Routes>
	);
}
export default Router;

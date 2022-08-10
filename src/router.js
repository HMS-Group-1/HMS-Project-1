import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EditUser from './pages/EditUser';
import ListBooks from './pages/ListBooks';
import Login from './pages/Login';
import PinjamBuku from './pages/pinjambuku';
import KembalikanBuku from './pages/kembalikanbuku';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import DetailBuku from './pages/detailBuku';
import EditAdmin from './pages/Admin/EditAdmin';
import UserList from './pages/Admin/UserList';
import BookList from './pages/Admin/BookList';
import BookCreate from './pages/Admin/BookCreate';
import BookUpdate from './pages/Admin/BookUpdate';
import HistoryPeminjaman from './pages/HistoryPeminjaman';
import Home from './pages/Home';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
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
				path="/book/detail/:id"
				element={
					<ProtectedRoute>
						<DetailBuku />
					</ProtectedRoute>
				}
			/>
			<Route path="/EditUser" element={<EditUser />} />
			<Route path="/admin/user/edit/:id" element={<EditAdmin />} />
			<Route path="/admin/user" element={<UserList />} />
			<Route path="/admin/book" element={<BookList />} />
			<Route path="/admin/updateBook/:id" element={<BookUpdate />} />
			<Route path="/admin/createBook" element={<BookCreate />} />
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
			<Route
				path="/pinjambuku"
				element={
					<ProtectedRoute>
						<PinjamBuku />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/kembalikanbuku"
				element={
					<ProtectedRoute>
						<KembalikanBuku />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/history_peminjaman"
				element={
					<ProtectedRoute>
						<HistoryPeminjaman />
					</ProtectedRoute>
				}
			/>
			<Route path="/daftaruser" element={<PinjamBuku />} />
		</Routes>
	);
}
export default Router;

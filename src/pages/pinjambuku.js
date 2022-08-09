import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import TablePinjam from '../components/TablePinjam';
const PinjamBuku = () => {
	return (
		<div className="flex-col h-[100%] relative m-4 tablet:w-[90%] laptop:-w-[90%] desktop:max-w-[80%] tablet:m-auto tablet:mb-4">
			<Navbar />
			<TablePinjam />
			<Footer/>
		</div>
	);
};
export default PinjamBuku;

import React from 'react';
import Navbar from '../components/Navbar';
import TablePinjam from '../components/TablePinjam';
const PinjamBuku = () => {
	return (
		<div className="flex-col h-screen relative m-4 tablet:w-[90%] desktop:max-w-[1024px] tablet:m-auto tablet:mb-4">
			<Navbar />
			<TablePinjam />
		</div>
	);
};
export default PinjamBuku;

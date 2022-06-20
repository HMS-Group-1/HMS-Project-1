import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import './Carousel.css';

function Carous() {
	return (
		<Carousel>
			<Carousel.Item>
				<h2>Buku adalah pembawa peradaban. Tanpa Buku, sejarah itu sunyi, sastra itu bodoh, sains lumpuh, pemikiran dan spekulasi terhenti. Buku adalah mesin perubahan, jendela di dunia, mercusuar didirikan di lautan waktu."</h2>
				<p>- Barbara W. Tuchman</p>
			</Carousel.Item>
			<Carousel.Item>
				<h2>Membaca itu ibarat menambang. Semakin dalam, semakin banyak hal berharga yang didapat."</h2>
				<p>- Jeni Karay</p>
			</Carousel.Item>
			<Carousel.Item>
				<h2>Membaca adalah alat paling dasar untuk meraih hidup yang baik."</h2>
				<p>- Joseph Addison</p>
			</Carousel.Item>
		</Carousel>
	);
}

export default Carous;

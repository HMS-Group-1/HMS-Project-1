import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navy } from '../navbar/navbar';
import Carous from '../content/Carousel/Carousel';
import LogInOut from '../content/LoginForm/LoginForm';
import Futer from '../footer/footer';
import './Landing Page.css';

function LandingPage() {
	return (
		<>
			<Navy />
			<div className=" row justify-content-center fs-5 ">
				<div className="col-md-7 ">
					<Carous />
				</div>
				<div className="col-md-4 ">
					<LogInOut />
				</div>
			</div>
			<Futer />
		</>
	);
}

export default LandingPage;

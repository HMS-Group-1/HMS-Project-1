
import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Home.css';
import HeroSection from '../components/HeroSection';
import Partner from '../components/Partner';
import Testimonial from '../components/Testimonial';
import PopulerBooks from '../components/PopulerBooks';
import Footer from '../components/Footer';

function Home() {
	return (
		<div className='bg-white w-full'>
			<div className='flex-col h-screen relative w-5/6 m-auto tablet:w-full laptop:-w-[90%] desktop:max-w-[80%] tablet:m-auto tablet:mb-4'>
				<Navbar />
				<HeroSection />
				<PopulerBooks />
				<Partner />
				<Testimonial />
				<div className='bottom-[120px] relative'>
					<Footer />
				</div>
			</div>
		</div>
	);
}

export default Home;

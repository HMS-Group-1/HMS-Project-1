import React, { useEffect } from 'react'
import bookIlustration from '../assets/bookIlustration.jpg';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);
    return (
        <div className='flex flex-col tablet:flex-row tablet:mt-12'  data-aos="fade-up"  data-aos-offset="200">
            <div className='tablet:w-1/2 item-center content-center  justify-center flex-col'>
                <p className='text-4xl text-slate-800 font-bold mb:8 tablet:mb-8'>THE LIBRARY THAT'S <span className='text-blue-600'>ALWAYS OPEN.</span></p>
                <p className='text-lg text-slate-700 font-medium'>Find your books : explore over 500.000 textbook and non-fiction
                    titles in every subject.
                </p>
                <Link to='/login'>
                    <button className='tablet:mt-8 mt-6 tablet:w-1/3 hover:bg-blue-800 bg-blue-600 px-4 py-2 rounded-md text-lg font-medium text-white'>Get Started</button>
                </Link>
            </div>
            <div className='tablet:w-1/2 flex justify-end mt-4 tablet:mt-0'>
                <img className='object-contain w-[400px] rounded-xl border-yellow-400' src={bookIlustration} alt="bookIlustration" />
            </div>
        </div>
    )
}

export default HeroSection
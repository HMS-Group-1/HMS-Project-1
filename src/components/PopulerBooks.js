import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Link } from 'react-router-dom';
import { booksDummy } from '../helpers/booksDummy';
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const PopulerBooks = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);

    const slideLeft = () => {
        let slider = document.getElementById('sliderPopularBooks')
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const slideRight = () => {
        let slider = document.getElementById('sliderPopularBooks')
        slider.scrollLeft = slider.scrollLeft + 500
    }
    return (
        <div className='my-20' data-aos="fade-up"  data-aos-offset="200">
            <div className='flex items-center justify-between mb-4'>
                <p className='text-slate-800 font-semibold text-2xl tablet:text-3xl w-1/2 tablet:w-full'>Popular Books</p>
                <Link to='/register' className=' w-1/2 tablet:w-full justify-end flex'>
                    <p className='text-blue-600 font-medium text-lg hover:text-blue-800'>Explore More <span><KeyboardArrowRightIcon /></span></p>
                </Link>
            </div>
            <div>
                <div className='relative'>
                    <div className='absolute z-10 flex flex-row justify-between w-full bottom-[50%]'>
                        <KeyboardArrowLeftIcon onClick={slideLeft} fontSize="large" className='bg-slate-400 rounded-full text-white hover:bg-slate-500 cursor-pointer' />
                        <KeyboardArrowRightIcon onClick={slideRight} fontSize="large" className='bg-slate-400 rounded-full fontSize="large" text-white hover:bg-slate-500 cursor-pointer' />
                    </div>
                    <div id='sliderPopularBooks' className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative flex gap-8'>
                        {booksDummy.map((book, id) => (
                            <div className='inline-block min-w-[180px] max-w[180px] rounded-lg relative my-2 shadow-md z-90 bg-white' key={id}>
                                <img src={book.img} className='w-full h-full object-cover rounded-lg' alt="Popular Book" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopulerBooks
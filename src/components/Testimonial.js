import React, { useEffect } from 'react'
import { testimoni } from '../helpers/testimoniData';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Testimonial = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);

    const slideLeft = () =>{
        let slider = document.getElementById('sliderTestimoni')
        slider.scrollLeft = slider.scrollLeft - 400
    }

    const slideRight = () =>{
        let slider = document.getElementById('sliderTestimoni')
        slider.scrollLeft = slider.scrollLeft + 400
    }
    return (
        <div className=' relative mt-20 px-2' data-aos="fade-up"  data-aos-offset="200">
            <div className='flex items-center tablet:flex-row px-4 rounded-md tablet:px-0 py-4 tablet:py-0 flex-col justify-between w-full bg-yellow-400/10'>
                <div className='tablet:m-8'>
                    <p className='font-semibold text-2xl tablet:text-3xl text-slate-700 tablet:mb-2 text-center tablet:text-left'>Our Testimonial</p>
                    <p className='font-normal text-sm tablet:text-base text-slate-700 text-center tablet:text-left'>What Our Member Say About BukaBuku</p>
                </div>
                <div className='tablet:m-8 mt-4  flex flex-row h-8'>
                    <button  onClick={slideLeft} className='px-6 rounded-l-full font-medium py-1 bg-white text-slate-600'>Prev</button>
                    <button  onClick={slideRight} className='px-6 rounded-r-full font-medium py-1 ml-4 bg-blue-600 text-white'>Next</button>
                </div>
            </div>
            <div className='mt-10'>
                <div>
                    <div id='sliderTestimoni' className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative flex gap-8'>
                        {testimoni.map((people, id) => (
                            <div className='inline-block rounded-md relative min-w-[430px] shadow-md p-6 bg-white my-2 tablet:mb-20' key={id}>
                                <div className='flex gap-8 items-center mb-4'>
                                    <div className=''>
                                        <img className='w-[60px] h-[60px] border-slate-500 border-2 object-cover rounded-full' src={people.img} alt="Student" />
                                    </div>
                                    <div className='whitespace-pre-line'>
                                        <p className='text-slate-900 font-semibold'>{people.name}</p>
                                        <p className='text-slate-800 text-sm font-medium'>{people.job}</p>
                                    </div>
                                </div>
                                <div className='whitespace-pre-line'>
                                    <p className='text-slate-700 font-normal text-sm'>{people.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial
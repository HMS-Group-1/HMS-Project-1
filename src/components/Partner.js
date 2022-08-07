import React, { useEffect } from 'react';
import google from '../assets/googleLogo.png'
import netflix from '../assets/netflixLogo.png'
import samsung from '../assets/samsungLogo.png'
import shopee from '../assets/shopeeLogo.png'
import tokopedia from '../assets/tokopediaLogo.png'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Partner = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);
    return (
        <div className='flex justify-center mt-20 flex-col' data-aos="fade-up"  data-aos-offset="200">
            <p className='text-slate-600 font-semibold text-base text-center mb-4'>Trusted  more than <span className='text-center font-semibold text-base text-blue-600'>+1500 company and leading universities </span>in Indonesia</p>
            <div className='flex justify-center tablet:flex-row flex-col items-center gap-2 md:flex-wrap'>
                <img className=' w-[180px] object-contain' src={google} alt="" />
                <img className=' w-[180px] object-contain' src={netflix} alt="" />
                <img className=' w-[180px] object-contain' src={samsung} alt="" />
                <img className=' w-[180px] object-contain' src={shopee} alt="" />
                <img className=' w-[180px] object-contain' src={tokopedia} alt="" />
            </div>
        </div>
    )
}

export default Partner
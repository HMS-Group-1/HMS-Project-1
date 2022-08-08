import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import '../styles/Footer.css';



function Footer() {
  return (
    <div className='footer'>
        <div className='flex justify-center content-center items-center m-auto gap-4'>
            <InstagramIcon className='w-20 text-slate-900 cursor-pointer' />
            <TwitterIcon className='w-20 text-slate-900 cursor-pointer' />
            <FacebookIcon className='w-20 text-slate-900 cursor-pointer' />
        </div>
            <p className='text-slate-900 text-sm'> &copy; 2022 Copyright : BukaBuku</p>
    </div>
  )
}

export default Footer
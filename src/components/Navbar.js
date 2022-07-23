import React, { useContext } from 'react'
import Logo from '../assets/capture1.PNG';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { ContextProvider } from '../helpers/context';


function Navbar() {
	const navigateTo = useNavigate();
  const context = useContext(ContextProvider);
  const logOutHandler = async() =>{
    try {
      context.setIsLogin(false)
      navigateTo('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex mb-4  tablet:justify-between w-full tablet:mb-4 tablet:mt-2 desktop:z-20'>
    <div className='w-1/2'>
        <img src={Logo} className='w-40' alt='' />
      </div>
      {!context.isLogin ? <div className='flex gap-2 justify-end w-1/2'>
        <Link to='/Masuk'>
          <button className='bg-merahTua text-white px-2 py-1 rounded-md'>Masuk</button>
        </Link>
        <Link to='/Daftar'>
          <button className='bg-biru text-white px-2 py-1 rounded-md'>Daftar</button>
        </Link>
      </div> :
      <div className='flex gap-2 justify-end w-1/2'>
      <Link to='/'>
        <button 
        onClick={logOutHandler}
        className='bg-biru text-white px-3 py-2 rounded-md'>Logout</button>
      </Link>
    </div>}
    </div>
  );
}

export default Navbar;
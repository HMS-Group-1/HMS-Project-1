import React from 'react'
import Logo from '../assets/capture1.PNG';
import {Link} from 'react-router-dom';
import '../styles/Navbar.css';


function Navbar() {
  return (
    <div className='navbar'>
        <div className='leftSide'>
            <img src={Logo} alt =''/>
        </div>
        <div className='rightSide'>
            <Link to='/Masuk'>
                <button className='bt1'>Masuk</button>
                </Link>
            <Link to='/Daftar'>
                <button className='bt2'>Daftar</button>
                </Link>
        </div>
    </div>
  );
}

export default Navbar;
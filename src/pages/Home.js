import React from 'react'
import Logo2 from '../assets/capture3.jpg';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

function Home() {
  return (
    <div className='home'>
      <Navbar/>
        <div className='headerContainer'>
            <img src={Logo2} alt = ''/>
        </div>
    </div>
  )
}

export default Home
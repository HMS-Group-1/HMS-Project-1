import React from 'react'
import {useNavigate} from "react-router-dom"
function MenuItem({image, name}) {
  const navigate = useNavigate();
  //menu route
 const menuHandler = () =>{
    if(name === 'Pinjam Buku')
    {
      navigate("/pinjambuku")
    }
    if(name === 'Kembalikan Buku')
    {
      navigate("/pinjambuku")
    }
    if(name === 'Daftar Buku')
    {
      navigate("/pinjambuku")
    }
  }
  return (
    <div className='menuItem'>
        <div style={{backgroundImage:`url(${image})`}} onClick={menuHandler}></div>
        <h2>{name}</h2>
    </div>
  )
}

export default MenuItem
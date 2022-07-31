import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

const NavBar2 = () =>{
    let navigate = useNavigate()
    let [Nav,setNav] = useState("")
        // console.log(name)
        if(Nav === 'daftar buku')
        {
          navigate("/daftarbuku")
        }
        if(Nav === 'kembalikan buku')
        {
          navigate("/kembalikanbuku")
        }
        if(Nav === 'back')
        {
          navigate("../")
        }
    return(
        <nav class = "navbar navbar-expand-sm bg-light navbar-light">
            <div class = "container-fluid">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <div class="nav-link h4 navtext" onClick={()=>setNav("daftar buku")}>Daftar Buku</div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link h4 navtext" onClick={()=>setNav("kembalikan buku")}>Kembalikan Buku</div>
                    </li>
                </ul>
                <button class='btn btn-danger' onClick={()=>setNav("back")}>Back</button>
            </div>
        </nav>
    )
}
export default NavBar2;
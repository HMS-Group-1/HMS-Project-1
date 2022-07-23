import React from "react";
import Logo from '../assets/capture1.PNG';
import NavBar2 from "../components/NavigationInside";
import KembaliForm from "../components/KembaliForm";

function KembalikanBuku()
{
    return(
        <div class = "container-fluid">
        <div class = "row mx-3 my-5">
            <div class = "col-md-4">
                <div class = 'bg-secondary'>
                <img src={Logo} alt=''></img>
                </div>
            </div>
        </div>
        <div class="my-5">
        <NavBar2/>
        </div>
        <div class="row">
            <div class ="col-12">
                <KembaliForm/>
            </div>
        </div>
    </div>
    )
}
export default KembalikanBuku;
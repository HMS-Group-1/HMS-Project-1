import React from "react";
import Logo from '../assets/capture1.PNG';
import Form from "../components/form";
import NavBar2 from "../components/NavigationInside";
const PinjamBuku = () => {
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
            <Form/>
        </div>
    )

}
export default PinjamBuku;
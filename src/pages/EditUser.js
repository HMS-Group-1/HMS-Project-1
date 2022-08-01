import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/capture1.PNG';
import { useNavigate } from "react-router-dom";
import axios from "../helpers/interceptor.js";


const EditUser = () => {
    const [nama, setNama] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [no_telp, setNo_telp] = useState();
    const [user,setUser] = useState({});

    const submitData = async (e) => {
        e.preventDefault();
        console.log(nama)
    }
    const getKategoris = async () => {
        const { data: res } = await axios.get(`http://localhost:5000/kategori/book/${1}`);
        setUser(res)
        console.log(res)
    }
    const navigate = useNavigate();
    function kembali() {
        navigate("../")
    }

    return (
        <div class='container-fluid'>
            <div class='row mx-5'>
                <div class='col-4'></div>
                <div class='col-4'>
                    <img src={Logo} alt=''></img>
                </div>
                <div class='col-3'></div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h4 class='font-bold text-5xl justify-start flex-col rounded-md font-poppins'>Edit User</h4>
                <hr></hr>
                <br></br>
                <br></br>
                <form onSubmit={submitData} class = 'form-control'>
                    <div class='col-6'>
                        <div class="col-12">
                            <br></br>
                            <label class="font-bold text-2xl justify-start flex-col rounded-md font-poppins "> Username </label>
                            <br></br>
                            <input type="text" class="form-control" onChange={(e) => setNama(e.target.value)}></input>
                        </div>
                        <div class="col-12">
                            <br></br>
                            <label class="font-bold text-2xl justify-start flex-col rounded-md font-poppins "> Alamat Email </label>
                            <br></br>
                            <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div class="col-12">
                            <br></br>
                            <label class="font-bold text-2xl justify-start flex-col rounded-md font-poppins "> No Telp </label>
                            <br></br>
                            <input type="number" class="form-control" onChange={(e) => setNo_telp(e.target.value)}></input>
                        </div>
                        <div class="col-12">
                            <br></br>
                            <label class="font-bold text-2xl justify-start flex-col rounded-md font-poppins "> Change Password </label>
                            <br></br>
                            <input type="password" class="form-control" onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                    </div>

                    <div class='row'>
                        <div class='col-1 pt-5'>
                            <button class="bg-red-500 text-white w-full font-bold py-2 px-4 rounded-md mb-3 focus:outline-none focus:shadow-outline" onClick={kembali}>kembali</button>
                        </div>
                        <div class='col-1 pt-5'>
                            <button class="bg-blue-500 text-white w-full font-bold py-2 px-4 rounded-md mb-3 focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}
export default EditUser;
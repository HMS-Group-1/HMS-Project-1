import React, { useCallback, useContext, useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/capture1.PNG';
import { useNavigate } from "react-router-dom";
import axios from "../helpers/interceptor.js";
import { ContextProvider } from "../helpers/context";


const EditUser = () => {
    const { isLogin } = useContext(ContextProvider);
    const [nama, setNama] = useState();
    const [email, setEmail] = useState();
    const [password, setNewPassword] = useState();
    const [oldpassword, setOldPassword] = useState();
    const [no_telp, setNo_telp] = useState();
    const [errorNama, setErrorNama] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [errorTelp, setErrorTelp] = useState(false);
    const [isNormalData, setIsNormalData] = useState(false);
    const [isChangePass, setIsChangePass] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    var userData = {};
    const submitData = async (e) => {
        e.preventDefault();
        if (nama === "" || nama === undefined) {
            setErrorNama(true);
        }
        if (email === "" || email === undefined) {
            setErrorEmail(true);
        }
        if(isChangePass)
        {
            if (password === "" || password === undefined) {
                setErrorPass(true);
            }
            if (no_telp === "" || no_telp === undefined) {
                setErrorTelp(true);
            }
        }
        if ((nama !== undefined || nama !== "") && (email !== undefined || email !== "") && (no_telp !== ""|| no_telp !== undefined)) {
            try {
                console.log("MASUK")
                await axios.patch(`http://localhost:5000/updateuser`, {
                    nama: nama,
                    email: email,
                    password: password,
                    no_telp: no_telp,
                })
                if(isNormalData)
                {
                    navigate("/book")
                }
            } catch (error) {
                console.log(error)
            }
            if(isChangePass)
            {
                if((password !== undefined || password !== "")&&(oldpassword !== undefined || oldpassword !== ""))
                {
                    try {
                        await axios.patch(`http://localhost:5000/changePassword`, {
                            oldPassword :oldpassword,
                            newPassword : password
                        })
                       navigate("/book")
                    } catch (error) {
                        setErrorMessage(error.response.data)
                        console.log(errorMessage)
                    }
                }
            }
        }
    }
    useEffect(() => {
        getUser();
    },[]);
    const getUser =  async ()=> {
        const { data: res } = await axios.get(`http://localhost:5000/userdata`);
        userData = res;
        console.log(userData)
        if(userData != null || userData !== undefined)
        {
            setNama(userData.nama)
            setEmail(userData.email)
            setNo_telp(userData.no_telp)
        }
    }
    const navigate = useNavigate();
    function kembali() {
        navigate("/book")
    }
    function GantiPass(e) {
        e.preventDefault();
        setIsChangePass(true);
        setIsNormalData(false);
    }
    function cancelPass(e) {
        e.preventDefault();
        setIsChangePass(false);
        setIsNormalData(true);
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
                <form onSubmit={submitData} class='form-control'>
                    {userData !== undefined ? 
                    <div class='row'>
                    <div class='col-6'>
                        <div class="col-12">
                            <br></br>
                            <label class="font-bold text-2xl justify-start flex-col rounded-md font-poppins "> New Username </label>
                            <br></br>
                            <input type="text" class="form-control" onChange={(e) => setNama(e.target.value)} value={nama}></input>
                            {errorNama ?
                                <div class="alert alert-danger alert-dismissible">
                                    <strong>Danger!</strong> Nama Tidak Boleh Kosong
                                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                </div> : <div></div>}
                        </div>
                        <div class="col-12">
                            <br></br>
                            <label class="font-bold text-2xl justify-start flex-col rounded-md font-poppins "> New Email Address </label>
                            <br></br>
                            <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)}  value={email}></input>
                            {errorEmail ?
                                <div class="alert alert-danger alert-dismissible">
                                    <strong>Danger!</strong> Email Tidak Boleh Kosong
                                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                </div> : <div></div>}
                        </div>
                        <div class="col-12">
                            <br></br>
                            <label class="font-bold text-2xl justify-start flex-col rounded-md font-poppins ">New Phone Number </label>
                            <br></br>
                            <input type="number" class="form-control" onChange={(e) => setNo_telp(e.target.value)}  value={no_telp}></input>
                            {errorTelp ?
                                <div class="alert alert-danger alert-dismissible">
                                    <strong>Danger!</strong> Telepon Tidak Boleh Kosong
                                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                </div> : <div></div>}
                        </div>
                    </div>
                        {isChangePass ?
                        <div class = "col-6">
                            <div class="card">
                                <div class="row">
                                    <div class="col-6">
                                        <br></br>
                                        <label class="font-bold text-2xl justify-start flex-col rounded-md font-poppins "> Old Password </label>
                                        <br></br>
                                        <input type="password" class="form-control" onChange={(e) => setOldPassword(e.target.value)}></input>
                                        {errorPass ?
                                            <div class="alert alert-danger alert-dismissible">
                                                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                                <strong>Danger!</strong> Password Tidak Boleh Kosong
                                            </div> : <div></div>}
                                    </div>
                                    <div class="col-6">
                                        <br></br>
                                        <label class="font-bold text-2xl justify-start flex-col rounded-md font-poppins "> Change Password </label>
                                        <br></br>
                                        <input type="password" class="form-control" onChange={(e) => setNewPassword(e.target.value)}></input>
                                        {errorPass ?
                                            <div class="alert alert-danger alert-dismissible">
                                                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                                <strong>Danger!</strong> Password Tidak Boleh Kosong
                                            </div> : <div></div>}
                                    </div>
                                    {errorMessage !== undefined ? <div>{errorMessage}</div> : <div></div>}
                                    <div class='col-2 pt-5'>
                                        <button class="bg-red-500 text-white w-full font-bold py-2 px-4 rounded-md mb-3 focus:outline-none focus:shadow-outline" onClick={cancelPass}>cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                            : <div></div>}
                </div> : <p>loading</p> }
                    

                    <div class='row'>
                        <div class='col-2 pt-5'>
                            <button class="bg-red-500 text-white w-full font-bold py-2 px-4 rounded-md mb-3 focus:outline-none focus:shadow-outline" onClick={kembali}>kembali</button>
                        </div>
                        <div class='col-2 pt-5'>
                            <button class="bg-green-500 text-white w-full font-bold py-3 px-4 rounded-md mb-3 focus:outline-none focus:shadow-outline" onClick={GantiPass}>Ganti Password</button>
                        </div>
                        <div class='col-2 pt-5'>
                            <button class="bg-blue-500 text-white w-full font-bold py-2 px-4 rounded-md mb-3 focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}
export default EditUser;
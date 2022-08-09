import React from 'react'
import React, { useState, useEffect, useContext} from "react";
import axios from "../../helpers/interceptor";
import Logo from '../../assets/capture1.PNG';
import { Link, useNavigate } from 'react-router-dom';


function ChooseAdmin() {
    return (
        <>
        <img src={Logo} alt="logo" className='w-[300px]' />

            <div className="container">
                <Link
                    to={`/admin/book`}
                    className="bg-biru text-white px-3 py-1 rounded-md">
                    Daftar User
                </Link>

                <h1>Atau</h1>

                <Link
                to={`/admin/user`}
                className="bg-merahTua text-white px-3 py-1 rounded-md">
                Daftar Buku
                </Link>
            </div>
            </>
    )
}

export default ChooseAdmin
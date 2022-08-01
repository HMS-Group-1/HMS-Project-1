import axios from "../helpers/interceptor.js"
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/capture1.PNG';
import "../styles/KembalikanBuku.css"

const DetailBuku = () => {
    const [books, setBookShow] = useState([]);
    const [kategori, setKategori] = useState('')
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState(1);

    useEffect(() => {
        getKategoris();
    }, []);
    // const getBook = async () => {
    //     const { data: res } = await axios.get(`http://localhost:5000/book/${1}`);
    //     setBookShow(res);
    //     setTimeout(setLoading(true), 2000)
    // }
    const getKategoris = async () => {
        const { data: res } = await axios.get(`http://localhost:5000/kategori/book/${1}`);
        setBookShow(res)
        setTimeout(setLoading(true), 2000)
        console.log(books.Kategori_id.kategori_nama)
    }
    const onBinaryMessage = (img) => {
        return btoa(
            img.reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
    }

    const navigate = useNavigate();

    function kembali() {
        navigate("../")
    }

    return (

        <div class="container-fluid">
            <div class="row mx-3 my-5">
                <div class='col-4'></div>
                <div class='col-4'>
                    <img src={Logo} alt=''></img>
                </div>
                <div class='col-3'></div>
            </div>
            <hr className="line"></hr>
            <br></br>
            {loading ? (
                <div class="row" key={books.id}>
                    <div class='col-2'></div>
                    <div class="col-4">
                        <img className="w-9/12 mx-24" src={`data:image/png;base64, ${onBinaryMessage(books.gambar.data)}`} alt={books.judul_buku} />
                    </div>
                    <div class="col-4">
                        <h1 className='font-bold text-5xl justify-start flex-col rounded-md font-poppins'><b>{books.judul_buku}</b></h1>
                        <br></br>
                        <h2 className='text-3xl font-bold justify-start flex-col rounded-md font-poppins'><strong>No : {books.id}</strong></h2>
                        <br></br>
                        <h3 className='text-4xl font-bold justify-start flex-col rounded-md font-poppins'><strong>Category: {books.Kategori_id.kategori_nama}</strong></h3>
                        <br></br>
                        <h2 className='text-4xl font-bold justify-start flex-col rounded-md font-poppins'><strong>Sinopsis</strong></h2>
                        <hr></hr>
                        <p className='text-2xl justify-start flex-col rounded-md font-poppins'>{books.deskripsi}</p>
                        <div class='row'>
                            <div class='col-8 pt-5'>
                                <button className="bt2" onClick={kembali}>kembali</button>
                            </div>
                        </div>
                    </div>
                    <div class='col-1'></div>
                </div>) : "loading"}
        </div>
    )

}
export default DetailBuku;
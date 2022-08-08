import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGambarBuku } from "../helpers/ListGambarBuku";
import "../styles/KembalikanBuku.css"
import "../styles/Navbar.css"

function Form() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBookShow] = useState(ListGambarBuku);
    console.log(searchQuery)
    console.log(books)
    const Reset = () =>{
        setSearchQuery('')
    }
    const PinjamBuku = () =>{
        navigate('../')
    }
    return (
        <div class='container-fluid'>
            <div class='row mx-5'>
                <div class='col-6'>
                    <h4 class ='text-start'>Cari Buku</h4>
                    <hr></hr>
                    <div class='row'>
                        <div class="col-4">
                            <label class="form-label"> Judul Buku </label>
                            <input type="text" class="form-control" onChange={(e) => setSearchQuery(e.target.value)}></input>
                        </div>
                        <div class="col-4">
                            <label class="form-label"> Nama Pengarang Buku </label>
                            <input type="text" class="form-control" onChange={(e) => setSearchQuery(e.target.value)}></input>
                        </div>
                        <div class="col-4">
                            <label class="form-label"> Tahun Terbit </label>
                            <input type="number" class="form-control" onChange={(e) => setSearchQuery(e.target.value)}></input>
                        </div>
                    </div>
                    <hr></hr>
                    <br></br>
                    <br></br>
                    <h4 class='text-start'>Data Peminjam</h4>
                    <hr></hr>
                    <div class="col-12">
                        <label class="form-label"> Nama Peminjam </label>
                        <input type="text" class="form-control"></input>
                    </div>
                    <div class="col-12">
                        <label class="form-label"> Lama Pinjam </label>
                        <input type="number" class="form-control"></input>
                    </div>
                    <div class="col-12">
                        <label class="form-label"> Alamat Email </label>
                        <input type="email" class="form-control"></input>
                    </div>
                </div>
                <div class='col-6'>
                    {books
                        .filter((book) => {
                            if (searchQuery === "") {
                                return 0;
                            } else if (
                                book.name.toLowerCase() === (searchQuery.toLowerCase())
                                || book.author.toLowerCase() === (searchQuery.toLowerCase())
                                || book.tahun === (searchQuery)
                            ) {
                                console.log(book)
                                return book;
                            }
                        }).map((book) => (
                            <div class='row' key={book.id}>
                                <div class='col-6'>
                                    <img className="image" src={book.image} alt='' />
                                </div>
                                <div class='col-6 bg-light'>
                                    <div class='row'>
                                        <div class='col-6'>
                                            <label class="form-label"> Nama Buku : </label>
                                        </div>
                                        <div class='col-6'>
                                            <label class='text-start'>{book.name}</label>
                                        </div>
                                        <div class='col-6'>
                                            <label class="form-label"> Nama Pengarang : </label>
                                        </div>
                                        <div class='col-6'>
                                            <label class='text-start'>{book.author}</label>
                                        </div>
                                        <div class='col-6'>
                                            <label class="form-label"> Tahun Terbit : </label>
                                        </div>
                                        <div class='col-6'>
                                            <label class='text-start'>{book.tahun}</label>
                                        </div>
                                        <div class='col-6'>
                                            <label class="form-label"> Rating </label>
                                        </div>
                                        <div class='col-6'>
                                            <label class='text-start'>{book.rating}/10</label>
                                        </div>
                                        <div class='col-12'>
                                            <label class="form-label"> Sinopsis Singkat : </label>
                                            <p class='text-justify'>{book.sinopsis}</p>
                                        </div>
                                        <div class='col-6'>
                                            <button className="bt1" onClick={PinjamBuku}>Pinjam Buku</button>
                                        </div>
                                        <div class='col-6'>
                                            <button className="bt2" onClick={Reset}>Reset</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
        </div >
    )
}
export default Form;
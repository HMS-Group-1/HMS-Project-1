import React, { useEffect, useState } from "react";
import axios from "axios";

const BukuAdmin = () => {
    const [books,setBooks] = useState([]);
    const [search,setSearch] = useState([]);
    
    useEffect(()=>{
        getBooks();
    })
    const getBooks = async () =>{
        const{data:res} = await axios.get("http://localhost:5000/admin/book");
        setBooks(res);
    };
    const deleteBooks = ()=>{

    }
    return (
        <div class='container-fluid'>
            <div class='card'>
                <div class = 'row'>
                    <div class = 'col-11'>
                    </div>
                    <div class = 'col-1'>
                    <span><button class = 'btn btn-danger'>log out</button></span>
                    </div>
                </div>
                <div class = 'row'>
                    <div class = 'col-6'>
                        <h2 class='h4 m-5'>Data Buku</h2>
                    </div>
                    <div class = 'col-3'>
                        <input type="text" class="form-control m-5" placeholder="Normal input"/>
                    </div>
                </div>
                <div class='px-3 mx-5'>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Judul Buku</th>
                                <th scope="col">Kategori</th>
                                <th scope="col">Tahun Terbit</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Hapus</th>
                            </tr>
                        </thead>
                        <tbody>
                        {books
                        .filter((book)=>{
                            if(search == ""){
                                return book;
                            }else if(book.nama
                                .toLowerCase()
                                .includes(search.toLowerCase()))
                                {
                                    return book;
                                }
                        })
                        .map((book,index)=>{
                            <tr key={book.id}>
                            <th scope="row">{index+1}</th>
                            <td>buku</td>
                            <td>kategori</td>
                            <td>2000</td>
                            <td>12</td>
                            <td><button className="bt2">Edit</button></td>
                            <td><button className="bt1" onClick={()=>deleteBooks()}>Hapus</button></td>
                        </tr>
                        })
                        }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
export default BukuAdmin;
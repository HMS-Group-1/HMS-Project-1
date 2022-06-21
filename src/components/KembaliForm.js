import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListGambarBuku } from "../helpers/ListGambarBuku";
import { ListPinjamBuku } from "../helpers/ListPinjamBuku";

function KembaliForm() {
    const navigate = useNavigate();
    const [books, setBookShow] = useState(ListPinjamBuku);
    const [peminjam, setPeminjam] = useState('');
    const [tanggal, setTanggal] = useState(Date);
    const [name, setName] = useState("")
    const [searchResult, setSeacrhResult] = useState(ListPinjamBuku);
    const [denda, setDenda] = useState()
    const SearchData = (e) => {
        e.preventDefault();
        books.filter((book) => {
            if (book.name.toLowerCase() === name.toLowerCase()) {
                setSeacrhResult(book)
                if (tanggal > book.tanggalPinjam) {
                    let date = new Date(tanggal + "Z");
                    let LateDate = new Date(book.tanggalPinjam + "Z");
                    let denda = (Math.abs(date - LateDate)) / (1000 * 3600 * 24) * 5000;
                    setDenda(denda);
                }
            }
        })
    }
    const Reset = () =>{
        setName('');
        setPeminjam('');
        setTanggal('');
    }
    const KembalikanBuku = () =>{
        navigate('../')
    }
    return (
        <div class='container-fluid'>
            <div class='row mx-5'>
                <div class='col-6'>
                    <h4 class='text-start'>Data Pengembalian Buku</h4>
                    <hr></hr>

                    <Form onSubmit={SearchData}>
                        <Form.Group>
                            <div class="col-12">
                                <Form.Label class="form-label"> Nama Buku </Form.Label>
                                <Form.Control type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                            </div>
                            <div class="col-12">
                                <Form.Label class="form-label"> Nama Peminjam </Form.Label>
                                <Form.Control type="text" class="form-control" value={peminjam} onChange={(e) => setPeminjam(e.target.value)}></Form.Control>
                            </div>
                            <div class="col-12">
                                <Form.Label class="form-label"> Tanggal Pinjam </Form.Label>
                                <Form.Control type="date" class="form-control" value={tanggal} onChange={(e) => setTanggal(e.target.value)}></Form.Control>
                            </div>
                            <br></br>
                        </Form.Group>
                        <Button type="submit" variant="primary">Submit</Button>
                    </Form>
                </div>
                <br /><br />

                <div class='col-6'>
                    <h4>Data Peminjam</h4>
                    <div class='row'>
                        <div class='col-6'>
                            <label class='form-label'>Nama Buku</label>
                        </div>
                        <div class='col-6'>
                            <label class='form-label'>{searchResult.name}</label>
                        </div>
                        <div class='col-6'>
                            <label class='form-label'>Nama Peminjam</label>
                        </div>
                        <div class='col-6'>
                            <label class='form-label'>{searchResult.peminjam}</label>
                        </div>
                        <div class='col-6'>
                            <label class='form-label'>Tanggal Pinjam</label>
                        </div>
                        <div class='col-6'>
                            <label class='form-label'>{searchResult.tanggalPinjam}</label>
                        </div>
                        <div class='col-6'>
                            <label class='form-label'>Denda</label>
                        </div>
                        <div class='col-6'>
                            <label class='form-label'>Rp {denda}.00</label>
                        </div>
                        <div class='col-6'>
                            <button className="bt2" onClick={KembalikanBuku}>Kembalikan Buku</button>
                        </div>
                        <div class='col-6'>
                            <button className="bt1" onClick={Reset}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default KembaliForm;
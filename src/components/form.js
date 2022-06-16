import React from "react";

const Form = () =>{
    return(
        <div class = 'container-fluid'>
            <div class ='row mx-5'>
                <div class="col-9">
                <label class="form-label"> Judul Buku </label>
                <input type="text" class="form-control"></input>
                </div>
                <div class="col-9">
                <label class="form-label"> Nama Peminjam </label>
                <input type="text" class="form-control"></input>
                </div>
                <div class="col-9">
                <label class="form-label"> Lama Pinjam </label>
                <input type="number" class="form-control"></input>
                </div>
                <div class="col-9">
                <label class="form-label"> Alamat Email </label>
                <input type="email" class="form-control"></input>
                </div>
            </div>
        </div>

    )
}
export default Form;
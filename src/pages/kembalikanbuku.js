import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TablePengembalian from "../components/TablePengembalian";

function KembalikanBuku() {
    return (
        <div className='flex-col h-screen relative m-4 tablet:w-[90%] desktop:max-w-[80%] laptop:-w-[90%] tablet:m-auto tablet:mb-4'>
            <Navbar />
            <TablePengembalian/>
            <Footer/>
        </div>
    )
}
export default KembalikanBuku;
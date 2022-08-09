import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import TableHistory from '../components/TableHistory'

const HistoryPeminjaman = () => {
    return (
        <div className='flex-col h-screen relative m-4 tablet:w-[90%] laptop:-w-[90%] desktop:max-w-[80%] tablet:m-auto tablet:mb-4'>
            <Navbar />
            <TableHistory/>
            <Footer/>
        </div>
    )
}

export default HistoryPeminjaman
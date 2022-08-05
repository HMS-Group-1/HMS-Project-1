import React from 'react'
import Navbar from '../components/Navbar'
import TableHistory from '../components/TableHistory'

const HistoryPeminjaman = () => {
    return (
        <div className='flex-col h-screen relative m-4 tablet:w-[90%] desktop:max-w-[1024px] tablet:m-auto tablet:mb-4'>
            <Navbar />
            <TableHistory/>
        </div>
    )
}

export default HistoryPeminjaman
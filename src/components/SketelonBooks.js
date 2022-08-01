import React from 'react'

const SketelonBooks = () => {
    return (
            <div className="h-[290px] w-[160px] animate-pulse desktop:w-[180px] rounded-md shadow-md bg-slate-400/10 justify-center mb-4 shrink">
                <div className="h-[180px] relative w-full object-cover rounded-br-lg rounded-bl-lg">
                    <p className='bg-slate-300 w-full h-[180px]'></p>
                </div>
                <div className="flex flex-col m-2 gap-1">
                    <p className='bg-slate-300 w-full rounded-sm h-6'></p>
                    <p className='bg-slate-300 w-2/5 rounded-sm h-4'></p>
                    <p className='bg-slate-300 w-3/5 rounded-sm h-4'></p>
                    <p className='bg-slate-300 w-2/5 rounded-sm h-4'></p>
                </div>
            </div>    
    )
}

export default SketelonBooks
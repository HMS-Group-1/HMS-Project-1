import React from 'react'

const SketelonTable = (props) => {
    return (
        <tr className="bg-white border-b animate-pulse dark:bg-gray-900 dark:border-gray-700">
            {props.type === 'pinjam' &&
                <>
                    <th scope="row" className="py-4 px-6 h-4 w-2 font-medium">
                        <p className='bg-slate-300 rounded-sm w-8 h-4'></p>
                    </th>
                    <td className="py-4 px-6">
                        <p className='bg-slate-300 rounded-sm w-30 h-4'></p>
                    </td>
                    <td className="py-4 px-6">
                        <p className='bg-slate-300 rounded-sm w-20 h-4'></p>
                    </td>
                    <td className="py-4 px-6">
                        <p className='bg-slate-300 rounded-sm w-8 h-4'></p>
                    </td>
                    <td className="py-4 px-6">
                        <p className='bg-slate-300 rounded-sm w-16 h-4'></p>
                    </td>
                </>}
                {props.type === 'kembali' &&
                <>
                    <th scope="row" className="py-4 px-6 h-4 w-2 font-medium">
                        <p className='bg-slate-300 rounded-sm w-8 h-4'></p>
                    </th>
                    <td className="py-4 px-6">
                        <p className='bg-slate-300 rounded-sm w-40 h-4'></p>
                    </td>
                    <td className="py-4 px-6">
                        <p className='bg-slate-300 rounded-sm w-20 h-4'></p>
                    </td>
                    <td className="py-4 px-6">
                        <p className='bg-slate-300 rounded-sm w-24 h-4'></p>
                    </td>
                    <td className="py-4 px-6">
                        <p className='bg-slate-300 rounded-sm w-16 h-4'></p>
                    </td>
                    <td className="py-4 px-6">
                        <p className='bg-slate-300 rounded-sm w-16 h-4'></p>
                    </td>
                    <td className="py-4 px-6">
                        <p className='bg-slate-300 rounded-sm w-20 h-4'></p>
                    </td>
                </>}
        </tr>
    )
}

export default SketelonTable
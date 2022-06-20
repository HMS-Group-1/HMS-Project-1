import React from "react";
import {Route,Routes} from 'react-router-dom'
import Menu from "./pages/Menu";
import PinjamBuku from "./pages/pinjambuku";
import KembalikanBuku from "./pages/kembalikanbuku";
function Router(){
    return(
        <Routes>
            <Route path='/' element ={<Menu/>}/>
            <Route path='/pinjambuku' element ={<PinjamBuku/>}/>
            <Route path='/kembalikanbuku' element ={<KembalikanBuku/>}/>
            <Route path='/daftaruser' element ={<PinjamBuku/>}/>
        </Routes>
    )
}
export default Router;
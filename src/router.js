import React from "react";
import {Route,Routes} from 'react-router-dom'
import Menu from "./pages/Menu";
import PinjamBuku from "./pages/pinjambuku";

function Router(){
    return(
        <Routes>
            <Route path='/' element ={<Menu/>}/>
            <Route path='/pinjambuku' element ={<PinjamBuku/>}/>
            <Route path='/kembalikanbuku' element ={<PinjamBuku/>}/>
            <Route path='/daftaruser' element ={<PinjamBuku/>}/>
        </Routes>
    )
}
export default Router;
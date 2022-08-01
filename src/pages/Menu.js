<<<<<<< HEAD
import React from 'react'
import { MenuList } from '../helpers/MenuList'
import MenuItem from '../components/MenuItem'
import Home from './Home'
import '../styles/Menu.css'

function Menu() {
  return (
    <div className='menu'>
      <Home/>
        <div className='menuList'>
            {MenuList.map((menuItem, key) => {
              console.log(key)
                return (
                    <MenuItem 
                    key = {key}
                    image={menuItem.image} 
                    name={menuItem.name}
                    />
            );
        })}
        </div>
    </div>
  )
}

=======
import React from 'react'
import { MenuList } from '../helpers/MenuList'
import MenuItem from '../components/MenuItem'
import Home from './Home'
import '../styles/Menu.css'

function Menu() {
  return (
    <div className='menu'>
      <Home/>
        <div className='menuList'>
            {MenuList.map((menuItem, key) => {
              console.log(key)
                return (
                    <MenuItem 
                    key = {key}
                    image={menuItem.image} 
                    name={menuItem.name}
                    />
            );
        })}
        </div>
    </div>
  )
}

>>>>>>> bf61aabcddd8a645ab36c3c2b2c4c9124f2b0de5
export default Menu
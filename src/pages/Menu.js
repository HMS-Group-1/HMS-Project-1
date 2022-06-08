import React from 'react'
import { MenuList } from '../helpers/MenuList'
import MenuItem from '../components/MenuItem'
import '../styles/Menu.css'

function Menu() {
  return (
    <div className='menu'>
        <div className='menuList'>
            {MenuList.map((menuItem, key) => {
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

export default Menu

import React from 'react';
import { MenuList } from '../helpers/MenuList';
import MenuItem from '../components/MenuItem';
import Home from './Home';
import '../styles/Menu.css';

function Menu() {
	return (
		<div className="menu">
			<Home />
			<div className="menuList">
				{MenuList.map((menuItem, key) => {
					console.log(key);
					return <MenuItem key={key} image={menuItem.image} name={menuItem.name} />;
				})}
			</div>
		</div>
	);
}

export default Menu;

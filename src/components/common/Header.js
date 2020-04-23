import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	const activeStyle = {
		color: 'orange'
	};
	return (
		<nav className="m-3">
			<NavLink to="/" exact activeStyle={activeStyle}>
				Home
			</NavLink>
			{'|'}
			<NavLink to="/courses" activeStyle={activeStyle}>
				Courses
			</NavLink>
			{'|'}
			<NavLink to="/about" activeStyle={activeStyle}>
				About
			</NavLink>
		</nav>
	);
};

export default Header;

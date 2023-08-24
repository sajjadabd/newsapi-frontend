//import { Link } from 'react-router-dom';

import { NavigationBar } from './StyledNavigation';
import { NavItem } from './StyledNavItem';

import { NavLink } from '../../components/Link/NavLink'

export default function Header () {
	return (
    <header>
      <nav>
        <NavigationBar>
          <NavItem><NavLink to="/">Home</NavLink></NavItem>
          <NavItem><NavLink to="/profile">Profile</NavLink></NavItem>
          <NavItem><NavLink to="/login">Login</NavLink></NavItem>
          <NavItem><NavLink to="/register">Register</NavLink></NavItem>
        </NavigationBar>
      </nav>
    </header>
	)
}

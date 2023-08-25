//import { Link } from 'react-router-dom';

import { UL } from './StyledUL';
import { NavItem } from './StyledNavItem';

import { NavLink } from '../../components/Link/NavLink'
import { Navigation } from './StyledNavigation';



export default function Header () {
	return (
    <header>
      <Navigation>
        <UL>
          <NavItem><NavLink to="/">Home</NavLink></NavItem>
          <NavItem><NavLink to="/profile">Profile</NavLink></NavItem>
          <NavItem><NavLink to="/login">Login</NavLink></NavItem>
          <NavItem><NavLink to="/register">Register</NavLink></NavItem>
        </UL>
        <aside>
          <form action="/logout" method="post">
            <button>logout</button>
          </form>
        </aside>
      </Navigation>
      
    </header>
	)
}

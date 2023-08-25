//import { Link } from 'react-router-dom';

import { UL } from './StyledUL';
import { NavItem } from './StyledNavItem';

import { NavLink } from '../../components/Link/NavLink'
import { Navigation } from './StyledNavigation';
import axios from 'axios';
import { logoutURL } from '../../services/api';



export default function Header () {

  const handleLogout = async (e : React.FormEvent) => {
    e.preventDefault();
    try {
      const access_token = localStorage.getItem('access_token'); // Retrieve access token from local storage
      await axios.post( logoutURL , null, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      localStorage.removeItem('access_token'); // Clear access token from local storage
      // Perform any other necessary cleanup or redirection
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
          <form 
           action="/logout"
           method="post"
           onSubmit={(e) => handleLogout(e)}
           >
            <button>logout</button>
          </form>
        </aside>
      </Navigation>
      
    </header>
	)
}

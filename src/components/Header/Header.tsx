
import { UL } from './StyledUL';
import { NavItem } from './StyledNavItem';

import { NavLink } from '../../components/Link/NavLink'
import { Navigation } from './StyledNavigation';
import axios from 'axios';
import { logoutURL } from '../../services/api';
import { Aside } from './StyledAside';

import { useLocation } from 'react-router-dom';

import { UserOutlined , PoweroffOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  Dropdown } from 'antd';

interface Props {
  username : string ,
  isUserAuthenticated : boolean ,
}


const items: MenuProps['items'] = [
  {
    label: <div style={{ color: 'red' }}>logout</div>,
    key: '1',
    icon: <PoweroffOutlined style={{ color: 'red' }} />,
  }
];



const Header : React.FC<Props> = ({
  username ,
  isUserAuthenticated
}) => {

  const location = useLocation();

  const handleLogout = async () => { 

    try {
      const access_token = localStorage.getItem('access_token'); // Retrieve access token from local storage
      
      await axios.post( logoutURL , null, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      localStorage.removeItem('access_token'); 

      window.location.href = "/";

    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuProps = {
    items,
    onClick: handleLogout,
  };

	return (
    <header>
      <Navigation>
        <UL>
          {isUserAuthenticated && (
            <>
            <NavItem className={location.pathname === '/' ? 'active' : ''}>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem className={location.pathname === '/profile' ? 'active' : ''}>
              <NavLink to="/profile">Profile</NavLink>
            </NavItem>
            </>
          )}
          {!isUserAuthenticated && (
            <>
              <NavItem><NavLink to="/login">Login</NavLink></NavItem>
              <NavItem><NavLink to="/register">Register</NavLink></NavItem>
            </>
          )}
        </UL>
        {isUserAuthenticated && (
          <Aside>
            <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
            Hi {username}
            </Dropdown.Button>
          </Aside>

        )}
      </Navigation>
      
    </header>
	)
}


export default Header
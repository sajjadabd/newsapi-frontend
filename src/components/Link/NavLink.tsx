import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const NavLink = styled(Link)`
  color:Silver ;
  text-decoration : none;
  &:hover{
    color: LightGray ;
  };
  &:focus{
      color: white  ;
  };
  &:active{
      color: white  ;
  };
`
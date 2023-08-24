import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const NavLink = styled(Link)`
  color:Silver ;
  &:hover{
    color: LightGray ;
  };
  &:focus{
      color: DarkSlateGray  ;
  };
  &:active{
      color: DarkSlateGray  ;
  };
`
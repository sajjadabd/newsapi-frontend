import styled from 'styled-components';

export const Navigation = styled.nav`
  background-color: ${({ theme }) => theme.footerColor};
  color: white;
  display : flex;
  justify-content : space-between;
  align-items : center;
  padding : 1em 2em;
`;

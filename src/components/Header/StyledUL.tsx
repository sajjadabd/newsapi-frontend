import styled from 'styled-components';

export const UL = styled.ul`
  background-color: ${({ theme }) => theme.footerColor};
  color: white;
  padding: 0;
  margin : 0;
  display : flex;
  list-style-type : none;
`;

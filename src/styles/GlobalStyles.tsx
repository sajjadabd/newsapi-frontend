import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${({ theme }) => theme.fontFamily};
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;
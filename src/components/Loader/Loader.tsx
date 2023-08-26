import styled from 'styled-components';

export const Loader = styled.div`
  margin : 0;
  display : flex;
  justify-content : center;
  align-items : center;
  height : 100vh;
  box-sizing : border-box;
`

export const ContentLoader = styled.div`
  margin : 0;
  display : flex;
  justify-content : center;
  align-items : center;
  height : 100%;
  box-sizing : border-box;
`


export const Spinner = styled.div`
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  border-top: 6px solid gray;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
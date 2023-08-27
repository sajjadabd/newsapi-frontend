import styled from 'styled-components';

const Input = styled.input.attrs(props => ({
  type: 'text', 
  placeholder: props.placeholder || 'Enter text',
  value: props.value || '', 
}))`
  /* Define your styling here */
  padding : 5px 10px;
  outline : none;
`;

export default Input;
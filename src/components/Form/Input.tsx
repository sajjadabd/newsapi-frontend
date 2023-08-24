import styled from 'styled-components';

const Input = styled.input.attrs(props => ({
  type: 'text', // Set the input type
  placeholder: props.placeholder || 'Enter text', // Default placeholder
  value: props.value || '', // Default value
}))`
  /* Define your styling here */
  padding : 10px 20px;
  outline : none;
`;

export default Input;
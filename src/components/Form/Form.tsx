import { StyledForm } from "./StyledForm"

interface Props {
  children: React.ReactNode; // Specify the type for the 'children' prop
}

const Form : React.FC<Props> = ({children}) => {
  return (
    <StyledForm>
      {children}
    </StyledForm>
  )
}

export default Form
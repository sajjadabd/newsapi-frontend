import { StyledForm } from "./StyledForm"

interface Props {
  children: React.ReactNode; 
}

const Form : React.FC<Props> = ({children}) => {
  return (
    <StyledForm>
      {children}
    </StyledForm>
  )
}

export default Form
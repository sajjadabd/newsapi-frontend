import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { Wrapper, LayoutWrapper } from "./LayoutWrapper";

interface Props {
  isUserAuthenticated : boolean ,
  children: React.ReactNode; // Specify the type for the 'children' prop
}

const Layout : React.FC<Props> = ({
  isUserAuthenticated ,
  children
}) => {
  return (
    <Wrapper>
      <Header isUserAuthenticated={isUserAuthenticated}  />
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
      <Footer />
    </Wrapper>
  )
}

export default Layout
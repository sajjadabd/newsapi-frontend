import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { Wrapper, LayoutWrapper } from "./LayoutWrapper";

interface Props {
  username : string,
  isUserAuthenticated : boolean ,
  children: React.ReactNode;
}

const Layout : React.FC<Props> = ({
  username ,
  isUserAuthenticated ,
  children
}) => {
  return (
    <Wrapper>
      <Header 
      username={username}
      isUserAuthenticated={isUserAuthenticated} 
       />
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
      <Footer />
    </Wrapper>
  )
}

export default Layout
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import LayoutWrapper from "./LayoutWrapper";

interface Props {
  children: React.ReactNode; // Specify the type for the 'children' prop
}

const Layout : React.FC<Props> = ({children}) => {
  return (
    <>
      <Header />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      <Footer />
    </>
  )
}

export default Layout
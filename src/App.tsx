import './App.css';
import { useState, useEffect } from 'react';
import { 
  BrowserRouter, 
  Route, 
  Routes , 
} from 'react-router-dom';



import Home from './pages/Home';
import Profile from './pages/Profile';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/Theme';
import Layout from './components/Layout/Layout';

import axios from 'axios';

import { validateTokenURL } from './services/api';

import { redirect } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  // const location = useLocation();
  // const currentPath = location.pathname;
  // console.table({currentPath});

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');

    if (access_token != null) {
      axios
        .post( validateTokenURL , { access_token })
        .then(response => {
          setIsUserAuthenticated(response.data.valid);
          setIsLoading(false); // Done loading
        })
        .catch(error => {
          console.error('Token validation error:', error);
          setIsUserAuthenticated(false);
          setIsLoading(false); // Done loading
        });
    } else {
      setIsLoading(false); // Done loading
    }

    return () => {
      // Cleanup
    }
  }, []);


  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  if (!isUserAuthenticated && window.location.pathname != '/login') {
    window.location.href = '/login';
    return ;
  }


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Layout>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );

}

export default App;
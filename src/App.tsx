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

import { Loader, Spinner } from './components/Loader/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [username , setUsername] = useState("");


  useEffect(() => {
    const access_token = localStorage.getItem('access_token');

    if (access_token != null) {
      axios
        .post( validateTokenURL , null, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(response => {
          const { valid , user } = response.data;
          setUsername(user.username);
          setIsUserAuthenticated(valid);
          setIsLoading(false); 
        })
        .catch(error => {
          console.error('Token validation error:', error);
          setIsUserAuthenticated(false);
          setIsLoading(false); 
        });
    } else {
      setIsLoading(false); 
    }

    return () => {
      // cleanup
    }
  }, []);


  if (isLoading) {
    return <Loader>
      <Spinner></Spinner>
    </Loader>;
  }
  
  if (!isUserAuthenticated && window.location.pathname != '/login') {
    window.location.href = '/login';
    return ;
  }


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Layout username={username} isUserAuthenticated={isUserAuthenticated} >

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
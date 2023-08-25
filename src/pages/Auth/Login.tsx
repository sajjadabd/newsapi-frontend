import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { StyledForm } from '../../components/Form/StyledForm';
import { loginRequestURL } from '../../services/api';



function Login() {

  const [formData, setFormData] = useState({
    email : '',
    password: '',
  });



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log('login...');

    try {

      const response = await axios.post( loginRequestURL , { 
        email : formData.email, 
        password : formData.password,
      });

      const { access_token } = response.data;

      //console.table({access_token})

      localStorage.setItem('access_token', access_token);

      // Redirect the user to the home page or another appropriate page
      window.location.href = '/'; 

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login failed:', error.response?.request.response);
      } else {
        console.error('Login failed:', error);
      }
    }
    
  };

  return (
    <div>
      <h2>Login Page</h2>

      <StyledForm onSubmit={handleSubmit}>

            {/* <label htmlFor="email">Email</label> */}

            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />

            {/* <label htmlFor="password">Password</label> */}

            <Input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleInputChange}
            />

            <Button type="submit">Login</Button>
        </StyledForm>

        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
  );
}

export default Login;
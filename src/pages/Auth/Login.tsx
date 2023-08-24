import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { StyledForm } from '../../components/Form/StyledForm';



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

    console.log('registered...');
    // Simulate a successful registration
    /*
    try {
      const response = await axios.post('/api/register', { 
        email : formData.email, 
        password : formData.password,
      })
      // Handle success (e.g., redirect to login page)
    } catch (error) {
      //console.error('Registration failed:', error);
    }
    */
    //const accessToken = 'sample_access_token';
    //localStorage.setItem('access_token', accessToken);

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

            <Button type="submit">Register</Button>
        </StyledForm>

        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
  );
}

export default Login;
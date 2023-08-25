import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {StyledForm} from '../../components/Form/StyledForm';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { registerRequestURL } from '../../services/api';




function Register() {

  const [formData, setFormData] = useState({
    username: '',
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
    
    try {
      const response = await axios.post( registerRequestURL , { 
        username : formData.username,
        email : formData.email, 
        password : formData.password,
      })

      const { access_token } = response.data;

      localStorage.setItem('access_token', access_token);

      // Redirect the user to the home page or another appropriate page
      window.location.href = '/home';

    } catch (error) {
      //console.error('Registration failed:', error);
    }
    

  };

  return (


    <div>
      <h2>Registration Page</h2>
      <StyledForm onSubmit={handleSubmit}>

          {/* <label htmlFor="username">Username</label> */}

          <Input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleInputChange}
          />



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

      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>


  );
}

export default Register;
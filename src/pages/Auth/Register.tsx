import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {StyledForm} from '../../components/Form/StyledForm';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';




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
    /*
    try {
      const response = await axios.post('/api/register', { 
        username : formData.username,
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
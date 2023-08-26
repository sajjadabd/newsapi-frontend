import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {StyledForm} from '../../components/Form/StyledForm';
// import Input from '../../components/Form/Input';
// import Button from '../../components/Form/Button';
import { registerRequestURL } from '../../services/api';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { Center } from '../../components/Center/Center';



function Register() {

  const [formData, setFormData] = useState({
    username: '',
    email : '',
    password: '',
  });
  const [submitFormLoading , setSubmitFormLoading] = useState(false);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    //event.preventDefault();
    setSubmitFormLoading(true);
    console.log('registered...');
    // Simulate a successful registration
    
    try {
      const response = await axios.post( registerRequestURL , { 
        username : formData.username,
        email : formData.email, 
        password : formData.password,
      })

      console.log(response.data)

      const { access_token } = response.data;

      localStorage.setItem('access_token', access_token);

      // Redirect the user to the home page or another appropriate page
      window.location.href = '/';

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Registration failed:', error.response?.request.response);
      } else {
        console.error('Registration failed:', error);
      }
    } finally {
      setSubmitFormLoading(false);
    }
    

  };

  return (

    
    <Center>
      <h2>Registration Page</h2>
      <Space style={{ width: '30%' }} direction="vertical">

          {/* <label htmlFor="username">Username</label> */}

          <Input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleInputChange}
            autoComplete="off"
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

          
          <Input.Password
            placeholder="password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          


          <Button 
          loading={submitFormLoading}
          style={{ width: '100%' }} 
          onClick={() => handleSubmit()}>
            Register
          </Button>
        </Space>

      <p>Already have an account? <Link to="/login">Login</Link></p>
    </Center>


  );
}

export default Register;
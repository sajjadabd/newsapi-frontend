import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { registerRequestURL } from '../../services/api';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { Center } from '../../components/Center/Center';
import { Typography } from 'antd';

const { Text } = Typography;

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
    setSubmitFormLoading(true);
    
    try {
      const response = await axios.post( registerRequestURL , { 
        username : formData.username,
        email : formData.email, 
        password : formData.password,
      })

      const { access_token } = response.data;

      localStorage.setItem('access_token', access_token);

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
      <Space direction="vertical">

          <Input
            size={"large"}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            autoComplete="off"
          />

          <Input
            size={"large"}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />


          <Input.Password
            size={"large"}
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          

          <Button 
            loading={submitFormLoading}
            style={{ width: '100%' }} 
            onClick={() => handleSubmit()}
            size={"large"}
          >
            Register
          </Button>

          
        </Space>

      <Space style={{ marginTop : '20px' }} direction="horizontal">
        <Text>Already have an account?</Text>
        <Link to="/login">
          <Text 
            style={{color : 'dodgerblue'}}
            underline 
          >
            Login
          </Text>
        </Link>
      </Space>

    </Center>


  );
}

export default Register;
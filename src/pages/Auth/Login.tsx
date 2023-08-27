import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { loginRequestURL } from '../../services/api';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { Center } from '../../components/Center/Center';
import { Typography } from 'antd';

const { Text } = Typography;

function Login() {

  const [formData, setFormData] = useState({
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
    console.log('login...');

    try {

      const response = await axios.post( loginRequestURL , { 
        email : formData.email, 
        password : formData.password,
      });

      const { access_token } = response.data;

      localStorage.setItem('access_token', access_token);

      window.location.href = '/'; 

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login failed:', error.response?.request.response);
      } else {
        console.error('Login failed:', error);
      }
    } finally {
      setSubmitFormLoading(false);
    }
    
  };

  return (
    <Center>
      <h2>Login Page</h2>

      <Space direction="vertical">

            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />

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
              Login
            </Button>

            
        </Space>


        <Space style={{ marginTop : '20px' }} direction="horizontal">
          <Text>Don't have an account?</Text>
          <Link to="/register">
            <Text 
              style={{color : 'dodgerblue'}}
              underline 
            >
              Register
            </Text>
          </Link>
        </Space>

      </Center>
  );
}

export default Login;
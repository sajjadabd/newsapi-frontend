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
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setGeneralError(null);
    if( name == "email" ) {
      setEmailError(null);
    } else if ( name == "password" ) {
      setPasswordError(null);
    }


    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

  };

  const handleSubmit = async () => {
    setSubmitFormLoading(true);

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
        //console.error('Login failed:', error.response?.request.response);
        const errorData = error.response?.data;
        if (errorData && typeof errorData === 'object') {

          if (errorData && errorData.error === "Invalid credentials") {
            // Handle specific "Invalid credentials" error
            setGeneralError("Invalid credentials!");
          } else {

            if (errorData.errors.email) {
              setEmailError(errorData.errors.email[0]);
            }
            if (errorData.errors.password) {
              setPasswordError(errorData.errors.password[0]);
            }
          }
        } else {
          setGeneralError('An error occurred during login.');
        }
      } else {
        setGeneralError('An error occurred during login.');
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
              status={ emailError ? 'error' : '' }
              size={"large"}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />

            {emailError && (
              <Text type="danger" style={{ marginBottom: '10px' }}>
                {emailError}
              </Text>
            )}

            <Input.Password
              status={ passwordError ? 'error' : '' }
              size={"large"}
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />


            {passwordError && (
              <Text type="danger" style={{ marginBottom: '10px' }}>
                {passwordError}
              </Text>
            )}
          


            <Button 
              loading={submitFormLoading}
              style={{ width: '100%' }} 
              onClick={() => handleSubmit()}
              size={"large"}
            >
              Login
            </Button>

            <Center>
            {generalError && (
              <Text type="danger" style={{ marginTop: '10px' , marginBottom: '10px' }}>
                {generalError}
              </Text>
            )}
            </Center>
            
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
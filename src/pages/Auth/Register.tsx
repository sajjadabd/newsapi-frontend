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
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setGeneralError(null);
    if( name == "username" ) {
      setUsernameError(null);
    } else if( name == "email" ) {
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
        //console.error('Registration failed:', error.response?.request.response);
        const errorData = error.response?.data;
        if (errorData && typeof errorData === 'object') {

          if (errorData && errorData.error === "Invalid credentials") {
            // Handle specific "Invalid credentials" error
            setGeneralError("An error occurred during registration!");
          } else {

            if (errorData.errors.username) {
              setUsernameError(errorData.errors.username[0]);
            }
            if (errorData.errors.email) {
              setEmailError(errorData.errors.email[0]);
            }
            if (errorData.errors.password) {
              setPasswordError(errorData.errors.password[0]);
            }

          }

          
          // Other field-specific errors
        } else {
          setGeneralError('An error occurred during registration!');
        }
      } else {
        setGeneralError('An error occurred during registration!');
        //console.error('Registration failed:', error);
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
            status={ usernameError ? 'error' : '' }
            size={"large"}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            autoComplete="off"
          />
          {usernameError && (
            <Text type="danger" style={{ marginBottom: '10px' }}>
              {usernameError}
            </Text>
          )}

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
            Register
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
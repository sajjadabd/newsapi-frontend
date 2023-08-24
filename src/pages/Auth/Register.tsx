import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';




function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/register', { 
        username,
        email, 
        password,
        passwordConfirmation
      })
      // Handle success (e.g., redirect to login page)
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Form>
      <h2>Register</h2>
      <Input type="text" value={email} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <Button onClick={handleRegister}>Register</Button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </Form>
  );
}

export default Register;
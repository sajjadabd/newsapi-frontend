import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      // Handle success (e.g., store token and redirect)
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Form>
      <h2>Login</h2>
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <Button onClick={handleLogin}>Login</Button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </Form>
  );
}

export default Login;
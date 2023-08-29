import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import Register from './Register';



describe('Register', () => {
  test('renders registration form', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const registerButton = screen.getByText('Register');

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });


  /*
  test('submits the form with valid data', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        access_token: 'mock-access-token',
      },
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('username');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByPlaceholderText('password');
    const registerButton = screen.getByText('Register');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      // Check for successful registration behavior
      expect(localStorage.getItem('access_token')).toEqual('mock-access-token');
      expect(window.location.href).toEqual('/'); // Assumes successful redirection
    });
  });
  */


});
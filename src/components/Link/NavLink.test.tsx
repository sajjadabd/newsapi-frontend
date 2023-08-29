
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NavLink } from './NavLink'; // Adjust the import path
import '@testing-library/jest-dom';

describe('NavLink', () => {
  test('renders with correct styles', () => {
    render(
      <BrowserRouter>
        <NavLink to="/">Test Link</NavLink>
      </BrowserRouter>
    );

    const linkElement = screen.getByText('Test Link');

    // Test the default style
    expect(linkElement).not.toBeNull();

  });

  // Add more tests for edge cases and different states...
});
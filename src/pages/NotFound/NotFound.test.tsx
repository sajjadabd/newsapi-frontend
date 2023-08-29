import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from './NotFound';

describe('NotFound', () => {
  test('displays the "Not Found" message', () => {
    render(<NotFound />);
    
    const heading = screen.getByRole('heading', { name: /404 Not Found/i });
    const message = screen.getByText(/The page you are looking for does not exist./i);

    expect(heading).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
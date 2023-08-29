import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Home from './Home';


describe('Home', () => {

  test('renders loading state initially', () => {
    render(<Home />);

    expect(screen.getByTestId('news-feed-loader')).toBeInTheDocument();
  });


});
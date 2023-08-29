
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import NewsFeedLoader from './NewsFeedLoader';

describe('NewsFeedLoader', () => {
  
  test('renders skeleton cards when loading', () => {
    render(<NewsFeedLoader loading={true} />);
    
    const skeletonCards = screen.getAllByRole('article');
    expect(skeletonCards).toHaveLength(16);
  });

});
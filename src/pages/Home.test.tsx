import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Home from './Home';
import axios from 'axios';
import {rest} from 'msw'
import {setupServer} from 'msw/node'

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/articles', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json([
      {
        id: 1,
        title: 'Test Article 1',
        description: 'Description of Test Article 1',
        source: 'Test Source 1',
      },
      {
        id: 2,
        title: 'Test Article 2',
        description: 'Description of Test Article 2',
        source: 'Test Source 2',
      },
    ]))
  }),
)


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Home Tests', () => {

  test('renders loading state initially', () => {
    render(<Home />);

    expect(screen.getByTestId('news-feed-loader')).toBeInTheDocument();
  });


  

});
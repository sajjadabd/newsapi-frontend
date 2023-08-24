import { Link } from 'react-router-dom';

export default function Header () {
	return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
	)
}

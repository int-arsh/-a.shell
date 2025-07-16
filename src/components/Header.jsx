import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import Logo from '../assets/logo.svg';

function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className={`logo-link${isHome ? ' logo-flashy' : ''}`}>
          <span className="logo-img" title="Zarathustra">
            <img src={Logo} alt="logo" style={{ height: '40px', width: '40px', verticalAlign: 'middle' }} />
          </span>
        </Link>
        <div className="nav-links">
          <Link to="/projects">Projects</Link>
          <Link to="/blogs">Blogs</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header; 
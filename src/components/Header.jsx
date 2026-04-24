import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authState = sessionStorage.getItem('hirehub_admin_auth');
    setIsAuthenticated(authState === 'true');
  });

  const handleLogout = () => {
    sessionStorage.removeItem('hirehub_admin_auth');
    setIsAuthenticated(false);
    setMenuOpen(false);
    navigate('/');
  };

  const handleLogin = () => {
    setMenuOpen(false);
    navigate('/admin');
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="header__logo" onClick={closeMenu}>
          Hire<span>Hub</span>
        </NavLink>

        <nav className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `header__link${isActive ? ' header__link--active' : ''}`
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/apply"
            className={({ isActive }) =>
              `header__link${isActive ? ' header__link--active' : ''}`
            }
            onClick={closeMenu}
          >
            Apply
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `header__link${isActive ? ' header__link--active' : ''}`
            }
            onClick={closeMenu}
          >
            Admin
          </NavLink>

          {isAuthenticated ? (
            <button className="header__link header__link--btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="header__link header__link--btn" onClick={handleLogin}>
              Login
            </button>
          )}
        </nav>

        <button
          className="header__hamburger"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
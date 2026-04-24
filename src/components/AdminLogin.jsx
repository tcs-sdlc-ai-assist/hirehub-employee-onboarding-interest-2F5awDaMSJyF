import { useState } from 'react';

export function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required.');
      return;
    }

    if (!password.trim()) {
      setError('Password is required.');
      return;
    }

    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('hirehub_admin_auth', 'true');
      if (onLogin) {
        onLogin();
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login">
        <div className="admin-login__icon">🔒</div>
        <h1 className="admin-login__title">Admin Login</h1>
        <p className="admin-login__subtitle">
          Enter your credentials to access the admin dashboard.
        </p>

        {error && (
          <div className="banner banner--error">
            <span className="banner__icon">❌</span>
            <span className="banner__message">{error}</span>
            <button
              className="banner__close"
              onClick={() => setError('')}
              aria-label="Dismiss error message"
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-group__label" htmlFor="username">
              Username<span className="form-group__required">*</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-group__input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError('');
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="password">
              Password<span className="form-group__required">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-group__input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
            />
          </div>

          <button type="submit" className="btn btn--primary btn--full">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
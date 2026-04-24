import { useState } from 'react';
import { AdminLogin } from './AdminLogin';

export function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('hirehub_admin_auth') === 'true'
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return children;
}

export default ProtectedRoute;
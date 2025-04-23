import { Navigate } from 'react-router-dom';
import { isUserLoggedIn } from '../api/auth';
import { ROUTES } from '../constants/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = isUserLoggedIn();
  
  if (!isAuthenticated) {
    // Redirige a la página de inicio si no está autenticado
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 
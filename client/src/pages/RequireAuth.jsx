// PrivateRoute.js
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useContext';

const RequireAuth = () => {
    const { token } = useAuth();
    const location = useLocation();
    return token ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace />;
};

export default RequireAuth;

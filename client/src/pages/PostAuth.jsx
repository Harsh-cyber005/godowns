import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useContext';

const PostAuth = () => {
    const { token } = useAuth();

    return token ? <Navigate to="/" /> : <Outlet />;
};

export default PostAuth;

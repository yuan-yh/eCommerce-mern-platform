import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    // make sure to redirect to the login page for guest users
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;
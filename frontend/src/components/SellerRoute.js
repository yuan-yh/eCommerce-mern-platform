import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react'

const SellerRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo && userInfo.role === "SELLER" ? (
        <Outlet />
    ) : (
        <Navigate to='/login' replace />
    );
}

export default SellerRoute;
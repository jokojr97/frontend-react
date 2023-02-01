import React, { useState } from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom';

const DefaultRoute = props => {
    const [isLogin, setIsLogin] = useState(false);
    return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default DefaultRoute
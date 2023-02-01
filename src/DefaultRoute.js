import React, { useState } from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom';

const DefaultRoute = props => {
    const isLogin = localStorage.isLogin != null;

    
    return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default DefaultRoute
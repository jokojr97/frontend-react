import React, { useState } from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom';

const DefaultRoute = props => {
    const isLogin = localStorage.isLogin != null;

    console.log("is login from home", localStorage.isLogin)
    console.log("is login from home2", isLogin)
    return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default DefaultRoute
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom';
import { LoaderCenter } from './page/_partials/loader';

const DefaultRoute = props => {
    const isLogin = localStorage.isLogin != null;
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(document.readyState == 'complete')
        // console.log("ready : ", ready)
    }, [])


    return isLogin ? !ready ? <LoaderCenter size="lg" /> : <Outlet /> : <Navigate to="/login" />;
}

export default DefaultRoute
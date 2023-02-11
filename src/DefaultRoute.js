import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom';
import Footr from './page/_partials/footer';
import { LoaderCenter } from './page/_partials/loader';
import NavMenu from './page/_partials/navbar';

const DefaultRoute = props => {
    const isLogin = localStorage.isLogin != null;
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(document.readyState == 'complete')
        // console.log("ready : ", ready)
    }, [])

    // const path = window.location.pathname

    return isLogin ? !ready ? <LoaderCenter size="lg" /> : <div> <NavMenu /> <div style={{ marginBottom: "40px" }} className="bg-light" ><Outlet /></div> <Footr /> </div> : <Navigate to="/login" />;
}

export default DefaultRoute
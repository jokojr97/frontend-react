import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import Login from './page/login';
import Blog from './page/blog';
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch
} from "react-router-dom";
import NotFound from './page/Notfound';
import { Spinner } from 'react-bootstrap';
import About from './page/about';
import Contact from './page/contact';
// import { AOS } from 'aos';

// mongggo db
import mongoose from 'mongoose';
import DefaultRoute from './DefaultRoute';
import Dashboard from './page/admin/dashboard';
import Perjadin from './page/admin/perjadin';
import Spt from './page/admin/spt';
import Sppd from './page/admin/sppd';
import Laporan from './page/admin/laporan';
import Kwitansi from './page/admin/kwitansi';
// import Dbcon from './utilities/db';
// import Porto from './model/porto';

function App() {
  // Dbcon();

  const [ready, setReady] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 200);
  })
  return (
    <React.Fragment>
      {!ready ? <center><Spinner style={{ marginTop: "20%" }} animation="border" /> </center> :
        <Router>
          <Switch>
            <Route path="/" exact element={<DefaultRoute />} >
              <Route exact path='/' element={<Dashboard />} />
              <Route path="/perjadin" exact element={<Perjadin
                breadcumbs={[
                  {
                    name: "Home",
                    link: "/"
                  },
                  {
                    name: "Perjalanan Dinas",
                    link: "/perjadin"
                  }
                ]}
              />} />
              <Route path="/spt" exact element={<Spt
                breadcumbs={[
                  {
                    name: "Home",
                    link: "/"
                  },
                  {
                    name: "SPT",
                    link: "/spt"
                  }
                ]} />} />
              <Route path="/sppd" exact element={<Sppd
                breadcumbs={[
                  {
                    name: "Home",
                    link: "/"
                  },
                  {
                    name: "SPPD",
                    link: "/sppd"
                  }
                ]} />} />
              <Route path="/laporan" exact element={<Laporan
                breadcumbs={[
                  {
                    name: "Home",
                    link: "/"
                  },
                  {
                    name: "Laporan",
                    link: "/laporan"
                  }
                ]} />} />
              <Route path="/kwitansi" exact element={<Kwitansi
                breadcumbs={[
                  {
                    name: "Home",
                    link: "/"
                  },
                  {
                    name: "Kwitansi",
                    link: "/kwitansi"
                  }
                ]} />} />
            </Route>

            <Route path="/login" exact element={<Login />} />
            <Route path="*" exact={true} element={<NotFound />} />
          </Switch>
        </Router>
      }
    </React.Fragment>
  );
  setReady(true);
}

export default App;

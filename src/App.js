import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import Login from "./page/auth/login";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import NotFound from "./page/Notfound";
import { Spinner } from "react-bootstrap";
// import { AOS } from 'aos';

// mongggo db
import DefaultRoute from "./DefaultRoute";
import Dashboard from "./page/admin/dashboard";
import Perjadin from "./page/admin/perjadin/perjadin";
import Spt from "./page/admin/spt/spt";
import Sppd from "./page/admin/sppd/sppd";
import Laporan from "./page/admin/laporan/laporan";
import Kwitansi from "./page/admin/kwitansi/kwitansi";
import CreatePerjadin from "./page/admin/perjadin/create";
import Pegawai from "./page/admin/pegawai/pegawai";
import CreatePegawai from "./page/admin/pegawai/create";
import DetailPegawai from "./page/admin/pegawai/detail";
import EditPegawai from "./page/admin/pegawai/edit";
import DetailPerjadin from "./page/admin/perjadin/detail";
import EditPerjadin from "./page/admin/perjadin/edit";
import CreateSpt from "./page/admin/spt/create";
// import Dbcon from './utilities/db';
// import Porto from './model/porto';

function App() {
  // Dbcon();

  const [ready, setReady] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 200);
  });
  return (
    <React.Fragment>
      {!ready ? (
        <center>
          <Spinner style={{ marginTop: "20%" }} animation="border" />{" "}
        </center>
      ) : (
        <Router>
          <Switch>
            <Route path="/" exact element={<DefaultRoute />}>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/perjadin" exact element={<Perjadin />} />
              <Route
                path="/perjadin/create"
                exact
                element={<CreatePerjadin />}
              />
              <Route
                path="/perjadin/:idPegawai"
                exact
                element={<DetailPerjadin />}
              />
              <Route
                path="/perjadin/edit/:idPegawai"
                exact
                element={<EditPerjadin />}
              />
              <Route path="/spt" exact element={<Spt />} />
              <Route path="/spt/create" exact element={<CreateSpt />} />
              <Route
                path="/spt/:idPegawai"
                exact
                element={<DetailPerjadin />}
              />
              <Route
                path="/spt/edit/:idPegawai"
                exact
                element={<EditPerjadin />}
              />
              <Route path="/sppd" exact element={<Sppd />} />
              <Route path="/sppd/create" exact element={<CreatePerjadin />} />
              <Route
                path="/sppd/:idPegawai"
                exact
                element={<DetailPerjadin />}
              />
              <Route
                path="/sppd/edit/:idPegawai"
                exact
                element={<EditPerjadin />}
              />
              <Route path="/laporan" exact element={<Laporan />} />
              <Route
                path="/laporan/create"
                exact
                element={<CreatePerjadin />}
              />
              <Route
                path="/laporan/:idPegawai"
                exact
                element={<DetailPerjadin />}
              />
              <Route
                path="/laporan/edit/:idPegawai"
                exact
                element={<EditPerjadin />}
              />
              <Route path="/kwitansi" exact element={<Kwitansi />} />
              <Route
                path="/kwitansi/create"
                exact
                element={<CreatePerjadin />}
              />
              <Route
                path="/kwitansi/:idPegawai"
                exact
                element={<DetailPerjadin />}
              />
              <Route
                path="/kwitansi/edit/:idPegawai"
                exact
                element={<EditPerjadin />}
              />
              <Route path="/pegawai" exact element={<Pegawai />} />
              <Route path="/pegawai/create" exact element={<CreatePegawai />} />
              <Route
                path="/pegawai/:idPegawai"
                exact
                element={<DetailPegawai />}
              />
              <Route
                path="/pegawai/edit/:idPegawai"
                exact
                element={<EditPegawai />}
              />
            </Route>

            <Route path="/login" exact element={<Login />} />
            <Route path="*" exact={true} element={<NotFound />} />
          </Switch>
        </Router>
      )}
    </React.Fragment>
  );
  setReady(true);
}

export default App;

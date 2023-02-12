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
import DetailPerjadin from "./page/admin/perjadin/detail";
import EditPegawai from "./page/admin/pegawai/edit";
import EditPerjadin from "./page/admin/perjadin/edit";
import CreateSpt from "./page/admin/spt/create";
import DetailSpt from "./page/admin/spt/detail";
import EditSpt from "./page/admin/spt/edit";
import CreateSppd from "./page/admin/sppd/create";
import DetailSppd from "./page/admin/sppd/detail";
import EditSppd from "./page/admin/sppd/edit";
import CreateLaporan from "./page/admin/laporan/create";
import DetailLaporan from "./page/admin/laporan/detail";
import EditLaporan from "./page/admin/laporan/edit";
import CreateKwitansi from "./page/admin/kwitansi/create";
import DetailKwitansi from "./page/admin/kwitansi/detail";
import EditKwitansi from "./page/admin/kwitansi/edit";
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
              <Route path="/perjadin/create" exact element={<CreatePerjadin />} />
              <Route path="/perjadin/:idPegawai" exact element={<DetailPerjadin />} />
              <Route path="/perjadin/edit/:idPegawai" exact element={<EditPerjadin />} />
              <Route path="/spt" exact element={<Spt />} />
              <Route path="/spt/create" exact element={<CreateSpt />} />
              <Route path="/spt/:idPegawai" exact element={<DetailSpt />} />
              <Route path="/spt/edit/:idPegawai" exact element={<EditSpt />} />
              <Route path="/sppd" exact element={<Sppd />} />
              <Route path="/sppd/create" exact element={<CreateSppd />} />
              <Route path="/sppd/:idPegawai" exact element={<DetailSppd />} />
              <Route path="/sppd/edit/:idPegawai" exact element={<EditSppd />} />
              <Route path="/laporan" exact element={<Laporan />} />
              <Route path="/laporan/create" exact element={<CreateLaporan />} />
              <Route path="/laporan/:idPegawai" exact element={<DetailLaporan />} />
              <Route path="/laporan/edit/:idPegawai" exact element={<EditLaporan />} />
              <Route path="/kwitansi" exact element={<Kwitansi />} />
              <Route path="/laporan/create" exact element={<CreateKwitansi />} />
              <Route path="/laporan/:idPegawai" exact element={<DetailKwitansi />} />
              <Route path="/laporan/edit/:idPegawai" exact element={<EditKwitansi />} />
              <Route path="/pegawai" exact element={<Pegawai />} />
              <Route path="/pegawai/create" exact element={<CreatePegawai />} />
              <Route path="/pegawai/:idPegawai" exact element={<DetailPegawai />} />
              <Route path="/pegawai/edit/:idPegawai" exact element={<EditPegawai />} />
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

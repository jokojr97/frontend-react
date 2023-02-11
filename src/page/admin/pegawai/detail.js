import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import imgProfile from "../../../image/jr.jpg";
import Axios from "axios";
import { BsArrowBarLeft, BsPencil, BsXCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const DetailPegawai = () => {
  // const [idPegawai, setIdPegawai] = useSearchParams()
  const pathname = window.location.pathname;
  const idPegawai = pathname.replace("/pegawai/", "");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ready, setReady] = useState(false);
  const urldata = `http://localhost:4000/v1/pegawai/${idPegawai}`;
  // console.log("url", urldata)

  const dataPegawai = async () => {
    setReady(false);
    Axios.get(urldata)
      .then((v) => {
        setData(v.data.data);
        // console.log("data", data)
        setReady(true);
      })
      .catch((err) => {
        err.response.data
          ? setErrorMessage(err.response.data.message)
          : setErrorMessage(err.message);
        setReady(true);
        setShow(true);
      });
  };

  const history = useNavigate();

  React.useEffect(() => {
    dataPegawai();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            {!show ? (
              ""
            ) : (
              <Alert
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                <p>{errorMessage}</p>
              </Alert>
            )}
            <h4 style={{ marginTop: "10px" }}>Detail Pegawai</h4>
            <hr />
            <Row>
              <Col md="4">
                <Image src={imgProfile} thumbnail={true} />
              </Col>
              <Col md="8">
                <Table responsive="sm" striped bordered>
                  <tr>
                    <th>Nama</th>
                    <td colSpan={2}>{data.name}</td>
                  </tr>
                  <tr>
                    <th>NIP</th>
                    <td colSpan={2}>{data.nip}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td colSpan={2}>{data.email}</td>
                  </tr>
                  <tr>
                    <th>Instansi</th>
                    <td colSpan={2}>{data.instansi}</td>
                  </tr>
                  <tr>
                    <th>Bidang</th>
                    <td colSpan={2}>{data.bidang}</td>
                  </tr>
                  <tr>
                    <th>Jabatan</th>
                    <td colSpan={2}>{data.jabatan}</td>
                  </tr>
                  <tr>
                    <th>Golongan</th>
                    <td colSpan={2}>{data.golongan}</td>
                  </tr>
                </Table>
                <Button variant="success" className="float-end">
                  <BsPencil /> Edit
                </Button>
                <Button
                  variant="secondary"
                  className="float-end"
                  style={{ marginRight: 5 }}
                  onClick={() => {
                    history("/pegawai");
                  }}
                >
                  <BsArrowBarLeft /> Kembali
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailPegawai;

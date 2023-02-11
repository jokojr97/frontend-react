import Axios from "axios";
import React, { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DetailPerjadin = () => {
  const urlapi = "http://localhost:5000/v1/perjadin";
  const pathname = window.location.pathname;
  const idPegawai = pathname.replace("/perjadin/", "");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ready, setReady] = useState(false);
  const urldata = `${urlapi}/${idPegawai}`;

  const loadData = () => {
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
    loadData();
  }, []);

  // console.log("url", urldata)

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
            <h4 style={{ marginTop: "10px" }}>Detail Perjalanan Dinas</h4>
            <hr />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailPerjadin;

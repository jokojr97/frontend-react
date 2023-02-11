import React, { useState } from "react";

import Moment from "moment-timezone";

import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import {
  BsEye,
  BsPencil,
  BsPlus,
  BsSearch,
  BsSortUp,
  BsTrash,
  BsUpload,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import Axios from "axios";
import { LoaderCenter } from "../../_partials/loader";
import moment from "moment-timezone";

const Perjadin = () => {
  const urlapi = "http://localhost:5000/v1/perjadin";
  const [show, setShow] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ready, setReady] = useState(true);
  const [data, setData] = useState([]);

  const [datacount, setDataCount] = useState(1);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const loadData = async () => {
    setReady(false);
    await Axios.get(`${urlapi}?page=${page}&perPage=${perPage}`)
      .then((v) => {
        // console.log("value", v.data.data)
        setData(v.data.data);
        setReady(true);
      })
      .catch((err) => {
        // console.log(err)
        err.response.data
          ? setErrorMessage(err.response.data.message)
          : setErrorMessage(err.message);
        setReady(true);
        setShow(true);
      });
  };

  const getDataCount = async () => {
    await Axios.get(`${urlapi}`)
      .then((v) => {
        setDataCount(v.data.data.length);
      })
      .catch((err) => {
        err.response.data
          ? setErrorMessage(err.response.data.message)
          : setErrorMessage(err.message);
        setReady(true);
        setShow(true);
      });
  };

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setPage(pageNumber);
  };

  const handleCloseModal = () => {
    setIdDelete("");
    setShowModal(false);
  };
  const handleShowModal = (id) => {
    setIdDelete(id);
    setShowModal(true);
  };

  const deleteData = (id) => {
    Axios.delete(`${urlapi}/${id}`)
      .then((v) => {
        handleCloseModal();
        loadData();
      })
      .catch((err) => {
        err.response.data
          ? setErrorMessage(err.response.data.message)
          : setErrorMessage(err.message);
        setReady(true);
        setShow(true);
      });
  };

  const handlerPerPage = (value) => {
    setPerPage(parseInt(value, 10));
    setPage(1);
  };

  const header = [
    "Perihal",
    "Lokasi",
    "Berangkat",
    "Lama Perjalanan",
    "Jenis Perjalanan",
    "Tahun",
  ];

  const history = useNavigate();
  const path = window.location.pathname;
  const pathCreate = path + "/create";
  const title = "Perjalanan Dinas";

  React.useEffect(() => {
    loadData();
    getDataCount();
  }, [page, perPage]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={{ span: 10, offset: 1 }} className="p-3">
            {!show ? (
              ""
            ) : (
              <Alert
                variant="danger"
                onClose={() => setShow(false)}
                key="alert"
                dismissible
              >
                <p>{errorMessage}</p>
              </Alert>
            )}
            <Button
              size="sm"
              className="float-end btn btn-primary"
              onClick={() => {
                history(pathCreate);
              }}
            >
              {" "}
              <BsPlus /> Tambah {title}
            </Button>
            <h4>
              <b>Halaman {title}</b>
            </h4>
            <hr className="mt-3" />
            <Row>
              <Col xs="3" md="1">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    handlerPerPage(e.target.value);
                  }}
                >
                  <option value="10">10</option>
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </Form.Select>
              </Col>
              <Col md={{ span: 5, offset: 6 }} xs="9">
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Search Data"
                    aria-label="Search Data"
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="outline-secondary" id="button-addon2">
                    <BsSearch /> Search
                  </Button>
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table responsive="sm" striped bordered hover>
                  <thead>
                    <tr>
                      {/* <th>#</th> */}
                      {header.map((v) => {
                        return (
                          <th key={v}>
                            <center>
                              {" "}
                              {v}
                              <i className="float-end text-secondary">
                                <BsSortUp />
                              </i>{" "}
                            </center>
                          </th>
                        );
                      })}
                      <th key="action">
                        <center>
                          Action
                          <i className="float-end text-secondary">
                            <BsSortUp />
                          </i>
                        </center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!ready ? (
                      <tr>
                        <td colSpan={8}>
                          <center>
                            <LoaderCenter text=" sedang memuat..." />
                          </center>
                        </td>
                      </tr>
                    ) : (
                      data.map((v, index) => {
                        const berangkat = moment(v.tanggal_berangkat);
                        const kembali = moment(v.tanggal_kembali);
                        const lama = kembali.diff(berangkat);
                        const duration = moment.duration(lama);
                        const lamaPerjalanan = duration.days();
                        const tglBerangkat = Moment(v.tanggal_berangkat);

                        const perihalKey = `perihal${index}`;
                        const lokasiKey = `lokasi${index}`;
                        const tanggal_berangkatKey = `tanggal_berangkat${index}`;
                        const lamaKey = `lama${index}`;
                        const jenis_perjadinKey = `jenis_perjadin${index}`;
                        const tahunKey = `tahun${index}`;
                        const actionKey = `action${index}`;

                        return (
                          <tr key={index}>
                            <td key={perihalKey}>{v.perihal}</td>
                            <td key={lokasiKey}>{v.lokasi}</td>
                            <td key={tanggal_berangkatKey}>
                              {tglBerangkat
                                .tz("Asia/Jakarta")
                                .format("DD MMM YYYY")}
                            </td>
                            <td key={lamaKey}>
                              <center>{lamaPerjalanan} Hari</center>
                            </td>
                            <td key={jenis_perjadinKey}>{v.jenis_perjadin}</td>
                            <td key={tahunKey}>{v.tahun}</td>
                            <td
                              key={actionKey}
                              style={{
                                width: "20%",
                                paddingLeft: 20,
                                paddingRight: 20,
                              }}
                            >
                              <Row>
                                <Col
                                  md="6"
                                  className="d-grid"
                                  style={{ padding: 0 }}
                                >
                                  <Button
                                    variant="primary"
                                    size="sm"
                                    className="m-1"
                                    onClick={() => {
                                      history(`/perjadin/${v._id}`);
                                    }}
                                    aria-label="Detail"
                                  >
                                    <BsEye /> Detail
                                  </Button>
                                </Col>
                                <Col
                                  md="6"
                                  className="d-grid m-0"
                                  style={{ padding: 0 }}
                                >
                                  <Button
                                    variant="warning"
                                    size="sm"
                                    className="m-1"
                                    aria-label="Edit"
                                    onClick={() => {
                                      history(`/perjadin/edit/${v._id}`);
                                    }}
                                  >
                                    <BsPencil /> Edit
                                  </Button>
                                </Col>
                              </Row>
                              <Row>
                                <Col
                                  md="6"
                                  className="d-grid"
                                  style={{ padding: 0 }}
                                >
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    className="m-1"
                                    aria-label="Delete"
                                    onClick={() => handleShowModal(v._id)}
                                  >
                                    <BsTrash /> Delete
                                  </Button>
                                </Col>
                                <Col
                                  md="6"
                                  className="d-grid"
                                  style={{ padding: 0 }}
                                >
                                  <Button
                                    variant="success"
                                    size="sm"
                                    className="m-1"
                                    aria-label="Upload"
                                  >
                                    <BsUpload /> Upload
                                  </Button>
                                </Col>
                              </Row>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
                <div className="float-end">
                  <Pagination
                    innerClass="pagination"
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={page}
                    itemsCountPerPage={perPage}
                    totalItemsCount={datacount}
                    pageRangeDisplayed={5}
                    onChange={(e) => {
                      handlePageChange(e);
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi delete ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda ingin Menghapus Data Pegawai ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteData(idDelete);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Perjadin;

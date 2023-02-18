import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, InputGroup, ListGroup, Modal, Row, Table } from 'react-bootstrap'
import { BsDownload, BsEye, BsPencil, BsPlus, BsSearch, BsSortDown, BsSortUp, BsTrash, BsUpload } from 'react-icons/bs'
import Axios from "axios";
import { useNavigate } from 'react-router-dom'
import { LoaderCenter } from '../../_partials/loader'
import Pagination from 'react-js-pagination'

const Pegawai = () => {
    const [data, setData] = useState([]);
    const [idDelete, setIdDelete] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [show, setShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [ready, setReady] = useState(true);
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [sortval, setSortval] = useState('desc')

    const [datacount, setDataCount] = useState(1)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const isMessage = localStorage.message != null;
    const messg = localStorage.message;
    const messgval = localStorage.messageType;

    const setAlert = () => {
        if (isMessage) {
            setMessage(messg)
            console.log("is message", message)
            setMessageType(messgval)
            setShow(true)
            localStorage.removeItem("message")
            localStorage.removeItem("messageType")
        }
    }

    const urlload = `${process.env.REACT_APP_URL_PEGAWAI}?page=${page}&perPage=${perPage}&sort=${sort}&sortval=${sortval}&search=${search}`

    const searchHandle = (val) => {
        setSearch(val.toLowerCase())
    }

    const dataPegawai = async () => {
        setReady(false)
        await Axios.get(urlload).then(v => {
            setData(v.data.data);
            // setShow(false)
            setReady(true)
            console.log(urlload)
        }).catch(err => {
            catchErr(err)
        })
    }

    const catchErr = (err) => {
        (err.response.data) ? setErrorMessage(err.response.data.message) : setErrorMessage(err.message);
        setData([])
        setDataCount(0)
        setReady(true)
        setShow(true)
    }

    const getDataCount = async () => {
        await Axios.get(`${process.env.REACT_APP_URL_PEGAWAI}`).then(v => {
            setDataCount(v.data.data.length)
        }).catch(err => {
            catchErr(err)
        })
    }

    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        setPage(pageNumber)
    }

    const handleCloseModal = () => {
        setIdDelete('')
        setShowModal(false)

    };
    const handleShowModal = (id) => {
        setIdDelete(id)
        setShowModal(true);
    }

    const deletePegawai = (id) => {
        // console.log("id", id)
        Axios.delete(`${process.env.REACT_APP_URL_PEGAWAI}/${id}`).then(v => {
            handleCloseModal()
            dataPegawai()
        }).catch(err => {
            catchErr(err)
        })
    }

    const handlerPerPage = (value) => {
        setPerPage(parseInt(value, 10));
        setPage(1)

    }

    const header = ['name', 'instansi', 'bidang', 'jabatan', 'golongan']
    const title = "Pegawai"
    const path = window.location.pathname
    const pathCreate = path + "/create"
    const history = useNavigate();

    const sortHandle = (v) => {
        if (sortval == "asc") {
            setSortval("desc")
            setSort(v)
        } else {
            setSortval("asc")
            setSort(v)
        }
    }

    React.useEffect(() => {
        dataPegawai()
        getDataCount()
        setAlert()
    }, [page, perPage, search, sort, sortval, show])


    return (
        <div>
            {console.log("pesan", message)}
            <Container fluid>
                <Row>
                    <Col md={{ span: 10, offset: 1 }} className='p-3'>
                        {(!show ? '' :
                            <Alert variant={messageType} onClose={() => setShow(false)} dismissible>
                                <p>
                                    {(message) ? message : errorMessage}
                                </p>
                            </Alert>
                        )}
                        <Button size="sm" className='float-end btn btn-primary' style={{ marginRight: "5px" }} onClick={() => { history(pathCreate) }}> <BsPlus /> Tambah {title}</Button>
                        <Button size="sm" className='float-end btn btn-success' style={{ marginRight: "5px" }} onClick={() => { history(pathCreate) }}> <BsUpload /> Import {title}</Button>
                        <Button size="sm" className='float-end btn btn-danger' style={{ marginRight: "5px" }} onClick={() => { history(pathCreate) }}> <BsDownload /> Download Template {title}</Button>
                        <h4><b>Halaman {title}</b></h4>
                        <hr className='mt-3' />
                        <Row>
                            <Col xs="3" md="1" >
                                <Form.Select aria-label="Default select example" onChange={(e) => { handlerPerPage(e.target.value) }}>
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
                                        value={search}
                                        onChange={(e) => { searchHandle(e.target.value) }}
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
                                            {header.map(v => {
                                                return <th key={v} style={{ textTransform: "capitalize" }}><center> {v}<i className='float-end text-secondary'>{(sortval == "asc") ? <BsSortUp class={(v == sort) ? "text-black" : ''} onClick={() => sortHandle(v)} /> : <BsSortDown class={(v == sort) ? "text-black" : ''} onClick={() => sortHandle(v)} />}</i> </center></th>
                                            })}
                                            <th><center>Action</center></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            (!ready) ? <tr><td colSpan={8} ><center><LoaderCenter text=" sedang memuat..." /></center></td></tr> :
                                                data.map((v, index) => {
                                                    const nameKey = `name${index}`;
                                                    const instansiKey = `instansi${index}`;
                                                    const bidangKey = `bidang${index}`;
                                                    const jabatanKey = `jabatan${index}`;
                                                    const golonganKey = `golongan${index}`;
                                                    const actionKey = `action${index}`;
                                                    return (
                                                        <tr key={index}>
                                                            <td key={nameKey}>{v.name}</td>
                                                            <td key={instansiKey}>{v.instansi}</td>
                                                            <td key={bidangKey}>{v.bidang}</td>
                                                            <td key={jabatanKey}>{v.jabatan}</td>
                                                            <td key={golonganKey}>{v.golongan}</td>
                                                            <td key={actionKey} style={{ width: "20%", paddingLeft: 20, paddingRight: 20 }}>
                                                                <Row>
                                                                    <Col md="6" className='d-grid' style={{ padding: 0 }}>
                                                                        <Button variant='primary' size='sm' className='m-1' onClick={() => { history(`/pegawai/${v._id}`) }} aria-label='Detail'><BsEye /> Detail</Button>
                                                                    </Col>
                                                                    <Col md="6" className='d-grid m-0' style={{ padding: 0 }}>
                                                                        <Button variant='warning' size='sm' className='m-1' aria-label='Edit' onClick={() => { history(`/pegawai/edit/${v._id}`) }} ><BsPencil /> Edit</Button>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="6" className='d-grid' style={{ padding: 0 }}>

                                                                        <Button variant='danger' size='sm' className='m-1' aria-label='Delete' onClick={() => handleShowModal(v._id)}><BsTrash /> Delete</Button>
                                                                    </Col>
                                                                    <Col md="6" className='d-grid' style={{ padding: 0 }}>
                                                                        <Button variant='success' size='sm' className='m-1' aria-label='Upload'><BsUpload /> Upload</Button>
                                                                    </Col>
                                                                </Row>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                        }

                                    </tbody>
                                </Table>
                                <div className='float-end' >
                                    <Pagination
                                        innerClass='pagination'
                                        itemClass='page-item'
                                        linkClass='page-link'
                                        activePage={page}
                                        itemsCountPerPage={perPage}
                                        totalItemsCount={datacount}
                                        pageRangeDisplayed={5}
                                        onChange={(e) => {
                                            handlePageChange(e)
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi delete ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah anda ingin Menghapus Data Pegawai ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={() => { deletePegawai(idDelete) }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </div >
    )
}

export default Pegawai

import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, InputGroup, ListGroup, Pagination, Row, Table } from 'react-bootstrap'
import { BsDownload, BsEye, BsPencil, BsPlus, BsSearch, BsSortUp, BsTrash, BsUpload } from 'react-icons/bs'
import Footr from '../../_partials/footer'
import NavMenu from '../../_partials/navbar'
import Axios from "axios";
import Tables from '../../_partials/tables'
import { useNavigate } from 'react-router-dom'
import { LoaderCenter } from '../../_partials/loader'

const Pegawai = () => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [ready, setReady] = useState(true);

    const dataPegawai = async () => {
        setReady(false)
        await Axios.get('http://localhost:4000/v1/pegawai?page=1&perPage=10').then(v => {
            setData(v.data.data);
            setReady(true)
        }).catch(err => {
            (err.response.data) ? setErrorMessage(err.response.data.message) : setErrorMessage(err.message);
            setReady(true)
            setShow(true)
        })
    }

    const header = ['Nama', 'Instansi', 'Bidang', 'Jabatan', 'Golongan']
    const title = "Pegawai"
    const path = window.location.pathname
    const pathCreate = path + "/create"
    const history = useNavigate();

    React.useEffect(() => {
        dataPegawai()
    }, [])


    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md={{ span: 10, offset: 1 }} className='p-3'>
                        {(!show ? '' :
                            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                <p>
                                    {errorMessage}
                                </p>
                            </Alert>
                        )}
                        <Button size="sm" className='float-end btn btn-primary' style={{ marginRight: "5px" }} onClick={() => { history(pathCreate) }}> <BsPlus /> Tambah {title}</Button>
                        <Button size="sm" className='float-end btn btn-success' style={{ marginRight: "5px" }} onClick={() => { history(pathCreate) }}> <BsUpload /> Import {title}</Button>
                        <Button size="sm" className='float-end btn btn-danger' style={{ marginRight: "5px" }} onClick={() => { history(pathCreate) }}> <BsDownload /> Download Template {title}</Button>
                        <h4><b>Halaman {title}</b></h4>
                        <hr className='mt-3' />
                        <Row>
                            <Col xs="3" md="2" >
                                <Form.Select aria-label="Default select example">
                                    <option>10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </Form.Select>
                            </Col>
                            <Col md={{ span: 5, offset: 5 }} xs="9">
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
                                            {header.map(v => {
                                                return <th><center> {v}<i className='float-end text-secondary'><BsSortUp /></i> </center></th>
                                            })}
                                            <th><center>Action<i className='float-end text-secondary'><BsSortUp /></i></center></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            (!ready) ? <tr><td colSpan={8} ><center><LoaderCenter text=" sedang memuat..." /></center></td></tr> :
                                                data.map(v => {
                                                    return (
                                                        <tr>
                                                            <td key="name">{v.name}</td>
                                                            <td key="instansi">{v.instansi}</td>
                                                            <td key="bidang">{v.bidang}</td>
                                                            <td key="jabatan">{v.jabatan}</td>
                                                            <td key="golongan">{v.golongan}</td>
                                                            <td key="action" style={{ width: "20%", paddingLeft: 20, paddingRight: 20 }}>
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

                                                                        <Button variant='danger' size='sm' className='m-1' aria-label='Delete'><BsTrash /> Delete</Button>
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
                                <Pagination className='float-end'>
                                    <Pagination.First />
                                    <Pagination.Prev />
                                    {/* <Pagination.Item>{1}</Pagination.Item> */}
                                    {/* <Pagination.Ellipsis /> */}

                                    <Pagination.Item active>{1}</Pagination.Item>
                                    <Pagination.Item>{2}</Pagination.Item>
                                    <Pagination.Item>{3}</Pagination.Item>
                                    <Pagination.Item>{4}</Pagination.Item>
                                    {/* <Pagination.Item disabled>{14}</Pagination.Item> */}

                                    <Pagination.Ellipsis />
                                    <Pagination.Item>{20}</Pagination.Item>
                                    <Pagination.Next />
                                    <Pagination.Last />
                                </Pagination>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}

export default Pegawai

import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, InputGroup, ListGroup, Row, Table } from 'react-bootstrap'
import Footr from '../_partials/footer'
import NavMenu from '../_partials/navbar'

const Perjadin = () => {
    return (
        <div>
            <NavMenu activeKey="/perjadin" />
            <Container fluid>
                <Row>
                    <Col md={{ span: 8, offset: 2 }} className='p-3'>
                        <h6><b>Halaman Perjalanan Dinas</b></h6>
                        <hr />

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
                                        placeholder="Recipient's username"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                    />
                                    <Button variant="outline-secondary" id="button-addon2">
                                        Button
                                    </Button>
                                </InputGroup>

                            </Col>
                        </Row>
                        <Row>
                            <Col>

                                <Table responsive="sm" striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Perihal</th>
                                            <th>Lokasi</th>
                                            <th>Alamat</th>
                                            <th>Tanggal Berangkat</th>
                                            <th>Tanggal Kembali</th>
                                            <th>Tahun</th>
                                            <th>Jenis Perjalanan</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footr />
        </div>
    )
}

export default Perjadin

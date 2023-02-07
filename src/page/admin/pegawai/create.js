import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { BsCheck, BsCheckCircle, BsEye, BsPencil, BsPlus, BsSearch, BsSortUp, BsTrash, BsUpload, BsX, BsXCircle } from 'react-icons/bs'

const CreatePegawai = () => {
    const [showPassword, setShowPassword] = useState('password');
    const [ready, setReady] = useState(false)
    const [data, setDate] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [password, setPassword] = useState('')
    const [nip, setNip] = useState('')
    const [instansi, setInstansi] = useState('')
    const [jabatan, setJabatan] = useState('')
    const [bidang, setBidang] = useState('')
    const [golongan, setGolongan] = useState('')


    const changeShowPassword = () => {
        (showPassword == 'password') ? setShowPassword('text') : setShowPassword('password');
    }

    const history = useNavigate()

    const submitForm = () => {
        const body = {
            // "name" : 
        }

    }

    return (
        <div>
            <Container fluid>
                <Row>

                    <Col md={{ span: 8, offset: 2 }} className='p-3'>
                        <h4>Tambah Pegawai</h4>
                        <hr />
                        <Form onSubmit={submitForm()}>
                            <Row>
                                <Col md="6">
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>Nama</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setName(e) }} placeholder="Enter name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Alamat Email</Form.Label>
                                        <Form.Control type="email" onChange={(e) => { setEmail(e) }} placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="passwod">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type={showPassword} onChange={(e) => { setName(e) }} placeholder="Enter password" />
                                        <Form.Check type='checkbox' label="Show Password" onChange={(e) => { changeShowPassword() }} checked={(showPassword == "text") ? true : false} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Ulangi Password</Form.Label>
                                        <Form.Control type={showPassword} onChange={(e) => { setName(e) }} placeholder="Repeat Password" />
                                        <Form.Check type='checkbox' label="Show Password" onChange={(e) => { changeShowPassword() }} checked={(showPassword == "text") ? true : false} />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Instansi</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setInstansi(e) }} placeholder="Enter Instansi" />
                                        {/* <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text> */}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Jabatan</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setJabatan(e) }} placeholder="Enter Jabatan" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Bidang</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setBidang(e) }} placeholder="Enter Bidang" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Golongan</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setGolongan(e) }} placeholder="Enter Golongan" />
                                    </Form.Group>
                                    <Button type='submit' variant='success' className='float-end'><BsCheckCircle /> Simpan</Button>
                                    <Button variant='danger' className='float-end' style={{ marginRight: 5 }} onClick={() => { history("/pegawai") }}><BsXCircle />  Batal</Button>
                                </Col>
                            </Row>
                        </Form>
                    </ Col>
                </Row>
            </Container>
        </div >
    )
}

export default CreatePegawai
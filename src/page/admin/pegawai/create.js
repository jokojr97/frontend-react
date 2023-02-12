import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import Axios from 'axios'

const CreatePegawai = () => {
    const [showPassword, setShowPassword] = useState('password');

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [password, setPassword] = useState('')
    const [nip, setNip] = useState('')
    const [instansi, setInstansi] = useState('')
    const [jabatan, setJabatan] = useState('')
    const [bidang, setBidang] = useState('')
    const [golongan, setGolongan] = useState('')

    const [errorname, setErrorName] = useState('')
    const [erroremail, setErrorEmail] = useState('')
    const [errorrepeatPassword, setErrorRepeatPassword] = useState('')
    const [errorpassword, setErrorPassword] = useState('')
    const [errornip, setErrorNip] = useState('')
    const [errorinstansi, setErrorInstansi] = useState('')
    const [errorjabatan, setErrorJabatan] = useState('')
    const [errorbidang, setErrorBidang] = useState('')
    const [errorgolongan, setErrorGolongan] = useState('')
    // const [errForm, setErrForm] = useState([])
    const [ready, setReady] = useState(false)
    const [show, setShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');


    const changeShowPassword = () => {
        (showPassword == 'password') ? setShowPassword('text') : setShowPassword('password');
    }

    const history = useNavigate()

    const setErrorForm = (err) => {
        err.map(v => {
            // console.log("val err", v)
            if (v.param == "name") {
                setErrorName(v.msg)
            } else if (v.param == "email") {
                setErrorEmail(v.msg)
            } else if (v.param == "password") {
                setErrorPassword(v.msg)
            } else if (v.param == "repeatPassword") {
                setErrorRepeatPassword(v.msg)
            } else if (v.param == "nip") {
                setErrorNip(v.msg)
            } else if (v.param == "instansi") {
                setErrorInstansi(v.msg)
            } else if (v.param == "bidang") {
                setErrorBidang(v.msg)
            } else if (v.param == "jabatan") {
                setErrorJabatan(v.msg)
            } else if (v.param == "golongan") {
                setErrorGolongan(v.msg)
            } else {
                setErrorMessage(v.msg)
            }
        })
    }

    const submitForm = (e) => {

        e.preventDefault();
        const body = {
            name: name,
            email: email,
            repeatPassword: repeatPassword,
            nip: nip,
            instansi: instansi,
            jabatan: jabatan,
            bidang: bidang,
            golongan: golongan,
            password: password
        }

        const urlapi = `${process.env.REACT_APP_URL_PEGAWAI}/insert`;

        Axios.post(urlapi, body).then(value => {
            // console.log(body)
            history("/pegawai")
        }).catch(err => {
            // console.log("err", err.response.data.data.data);
            // setErrForm(err);
            (err.response.data) ? setErrorMessage(err.response.data.message) : setErrorMessage(err.message);
            if (err.response.data.data.errorStatus == 400) {
                setErrorForm(err.response.data.data.data)
            }
            setReady(true)
            setShow(true)
        })

        // console.log("body", body)

    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md={{ span: 8, offset: 2 }} className='p-3'>
                        <h4>Tambah Pegawai</h4>
                        <hr />
                        {(!show ? '' :
                            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                <p>
                                    {errorMessage}
                                </p>
                            </Alert>
                        )}
                        <Form onSubmit={submitForm}>
                            <Row>
                                <Col md="7">
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>Nama</Form.Label>
                                        <Form.Control id="name" type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Enter name" />
                                        {(!errorname) ? '' :
                                            <Form.Text className="text-danger">
                                                {errorname}
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Alamat Email</Form.Label>
                                        <Form.Control id="email" type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter email" />
                                        {(!erroremail) ? '' :
                                            <Form.Text className="text-danger">
                                                {erroremail}
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>NIP</Form.Label>
                                        <Form.Control id="nip" type="text" onChange={(e) => { setNip(e.target.value) }} placeholder="Enter NIP" />
                                        {(!errornip) ? '' :
                                            <Form.Text className="text-danger">
                                                {errornip}
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group className="mb-3" controlId="passwod">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type={showPassword} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter password" />
                                                <Form.Check type='checkbox' label="Show Password" onChange={(e) => { changeShowPassword() }} checked={(showPassword == "text") ? true : false} />
                                                {(!errorpassword) ? '' :
                                                    <Form.Text className="text-danger">
                                                        {errorpassword}
                                                    </Form.Text>
                                                }
                                            </Form.Group>
                                        </Col>
                                        <Col md="6">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Ulangi Password</Form.Label>
                                                <Form.Control type={showPassword} onChange={(e) => { setRepeatPassword(e.target.value) }} placeholder="Repeat Password" />
                                                <Form.Check type='checkbox' label="Show Password" onChange={(e) => { changeShowPassword() }} checked={(showPassword == "text") ? true : false} />
                                                {(!errorrepeatPassword) ? '' :
                                                    <Form.Text className="text-danger">
                                                        {errorrepeatPassword}
                                                    </Form.Text>
                                                }
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md="5">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Instansi</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setInstansi(e.target.value) }} placeholder="Enter Instansi" />
                                        {(!errorinstansi) ? '' :
                                            <Form.Text className="text-danger">
                                                {errorinstansi}
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Jabatan</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setJabatan(e.target.value) }} placeholder="Enter Jabatan" />
                                        {(!errorjabatan) ? '' :
                                            <Form.Text className="text-danger">
                                                {errorjabatan}
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Bidang</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setBidang(e.target.value) }} placeholder="Enter Bidang" />
                                        {(!errorbidang) ? '' :
                                            <Form.Text className="text-danger">
                                                {errorbidang}
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Golongan</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setGolongan(e.target.value) }} placeholder="Enter Golongan" />
                                        {(!errorgolongan) ? '' :
                                            <Form.Text className="text-danger">
                                                {errorgolongan}
                                            </Form.Text>
                                        }
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
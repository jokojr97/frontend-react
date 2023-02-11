import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import { LoaderCenter } from '../../_partials/loader'
import Axios from 'axios'

const EditPegawai = () => {
    const pathname = useLocation().pathname
    // const pathname = window.location.pathname
    // const location = useLocation()
    const idPegawai = pathname.replace("/pegawai/edit/", '')
    const urldata = `http://localhost:4000/v1/pegawai/${idPegawai}`

    const [show, setShow] = useState(false)
    const [id, setId] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState('password');
    const [ready, setReady] = useState(false)
    const [data, setData] = useState([])
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

    // console.log("url edit", urldata)

    const dataPegawai = async () => {
        setReady(false)
        await Axios.get(urldata).then(v => {
            console.log("v", v.data.data)
            setData(v.data.data);
            setFormData(v.data.data)
            console.log("data", data)
            setReady(true)
        }).catch(err => {
            (err.response.data) ? setErrorMessage(err.response.data.message) : setErrorMessage(err.message);
            console.log("dataerr", data)
            console.log("err", err);
            setReady(true)
            setShow(true)
        })
    }

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

    const saveEdit = (urlapi, body) => {
        Axios.patch(urlapi, body).then(value => {
            // console.log(body)
            history("/pegawai")
        }).catch(err => {
            console.log("err", err.response.data.data.data);
            // setErrForm(err);
            (err.response.data) ? setErrorMessage(err.response.data.message) : setErrorMessage(err.message);
            if (err.response.data.data.errorStatus == 400) {
                setErrorForm(err.response.data.data.data)
            }
            setReady(true)
            setShow(true)
        })
    }

    const setFormData = (value) => {
        setId(value._id)
        setName(value.name)
        setEmail(value.email)
        setNip(value.nip)
        setInstansi(value.instansi)
        setBidang(value.bidang)
        setJabatan(value.jabatan)
        setGolongan(value.golongan)
    }

    React.useEffect(() => {
        dataPegawai()
    }, [])


    const changeShowPassword = () => {
        (showPassword == 'password') ? setShowPassword('text') : setShowPassword('password');
    }

    const history = useNavigate()

    const submitForm = (e) => {
        e.preventDefault();
        if (password == '') {
            const body = {
                _id: id,
                name: name,
                email: email,
                nip: nip,
                instansi: instansi,
                jabatan: jabatan,
                bidang: bidang,
                golongan: golongan
            }
            console.log("body", body)
            const urlapi = 'http://localhost:4000/v1/pegawai/update/nonpass'
            console.log("url", urlapi)
            saveEdit(urlapi, body)
        } else {
            const body = {
                _id: id,
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
            const urlapi = 'http://localhost:4000/v1/pegawai/update'
            console.log("url", urlapi)

            saveEdit(urlapi, body)
            // console.log("body", body)
        }

    }


    return (

        <div>
            {/* {console.log("nama", name)} */}

            {(!ready) ? <div style={{ marginTop: "10%" }}><center><LoaderCenter text=" sedang memuat..." /></center></div> :
                <Container fluid>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }} className='p-3'>
                            <h4>Edit Pegawai</h4>
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
                                    <Col md="6">
                                        <Form.Group className="mb-3" controlId="name">
                                            <Form.Label>Nama</Form.Label>
                                            <Form.Control type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Enter name" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>Alamat Email</Form.Label>
                                            <Form.Control type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter email" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>NIP</Form.Label>
                                            <Form.Control id="nip" type="text" value={nip} onChange={(e) => { setNip(e.target.value) }} placeholder="Enter email" />
                                        </Form.Group>
                                        <Row>
                                            <Col md="6">
                                                <Form.Group className="mb-3" controlId="passwod">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type={showPassword} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter password" />
                                                    <Form.Check type='checkbox' label="Show Password" onChange={(e) => { changeShowPassword() }} checked={(showPassword == "text") ? true : false} />
                                                </Form.Group>
                                            </Col>
                                            <Col md="6">

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Ulangi Password</Form.Label>
                                                    <Form.Control type={showPassword} onChange={(e) => { setRepeatPassword(e.target.value) }} placeholder="Repeat Password" />
                                                    <Form.Check type='checkbox' label="Show Password" onChange={(e) => { changeShowPassword() }} checked={(showPassword == "text") ? true : false} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="6">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Instansi</Form.Label>
                                            <Form.Control type="text" value={instansi} onChange={(e) => { setInstansi(e.target.value) }} placeholder="Enter Instansi" />
                                            {/* <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text> */}
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Jabatan</Form.Label>
                                            <Form.Control type="text" value={jabatan} onChange={(e) => { setJabatan(e.target.value) }} placeholder="Enter Jabatan" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Bidang</Form.Label>
                                            <Form.Control type="text" value={bidang} onChange={(e) => { setBidang(e.target.value) }} placeholder="Enter Bidang" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Golongan</Form.Label>
                                            <Form.Control type="text" value={golongan} onChange={(e) => { setGolongan(e.target.value) }} placeholder="Enter Golongan" />
                                        </Form.Group>
                                        <Button type='submit' variant='success' className='float-end'><BsCheckCircle /> Simpan</Button>
                                        <Button variant='danger' className='float-end' style={{ marginRight: 5 }} onClick={() => { history("/pegawai") }}><BsXCircle />  Batal</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </ Col>
                    </Row>
                </Container>
            }
        </div >
    )
}

export default EditPegawai
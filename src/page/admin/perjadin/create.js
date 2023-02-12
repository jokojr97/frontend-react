import Axios from 'axios'
import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Footr from '../../_partials/footer'
import NavMenu from '../../_partials/navbar'

const CreatePerjadin = () => {
    const urlapi = `${process.env.REACT_APP_URL_PERJADIN}/insert`

    const d = new Date();
    let year = d.getFullYear();
    const [perihal, setPerihal] = useState('')
    const [lokasi, setLokasi] = useState('')
    const [alamat, setAlamat] = useState('')
    const [tanggalBerangkat, settanggalBerangkat] = useState('')
    const [tanggalKembali, setTanggalKembali] = useState('')
    const [tahun, setTahun] = useState(year)
    const [jenisPerjalanan, setJenisPerjalanan] = useState('Dalam Kota')

    const [errorPerihal, setErrorPerihal] = useState('')
    const [errorLokasi, setErrorLokasi] = useState('')
    const [errorAlamat, setErrorAlamat] = useState('')
    const [errorTanggalBerangkat, setErrorTanggalBerangkat] = useState('')
    const [errorTanggalKembali, setErrorTanggalKembali] = useState('')
    const [errorTahun, setErrorTahun] = useState('')
    const [errorJenisPerjalanan, setErrorJenisPerjalanan] = useState('')

    // const [errForm, setErrForm] = useState([])
    const [ready, setReady] = useState(false)
    const [show, setShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const history = useNavigate()

    const setErrorForm = (err) => {
        err.map(v => {
            // console.log("val err", v)
            if (v.param == "perihal") {
                setErrorPerihal(v.msg)
            } else if (v.param == "lokasi") {
                setErrorLokasi(v.msg)
            } else if (v.param == "alamat") {
                setErrorAlamat(v.msg)
            } else if (v.param == "tanggalBerangkat") {
                setErrorTanggalBerangkat(v.msg)
            } else if (v.param == "tanggalKembali") {
                setErrorTanggalKembali(v.msg)
            } else if (v.param == "tahun") {
                setErrorTahun(v.msg)
            } else if (v.param == "jenisPerjalanan") {
                setErrorJenisPerjalanan(v.msg)
            } else {
                setErrorMessage(v.msg)
            }
        })
    }


    const submitForm = (e) => {
        e.preventDefault();
        const body = {
            perihal: perihal,
            lokasi: lokasi,
            alamat: alamat,
            tanggal_berangkat: tanggalBerangkat,
            tanggal_kembali: tanggalKembali,
            tahun: tahun,
            jenis_perjadin: jenisPerjalanan
        }
        Axios.post(urlapi, body).then(v => {
            history("/perjadin")
        }).catch(err => {
            (err.response.data) ? setErrorMessage(err.response.data.message) : setErrorMessage(err.message);
            if (err.response.data.data.errorStatus == 400) {
                setErrorForm(err.response.data.data.data)
            }
            setReady(true)
            setShow(true)
        })
        // console.log("body", body);
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md={{ span: 8, offset: 2 }} className='p-3'>
                        <h4>Tambah Perjalanan Dinas</h4>
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
                                    <Form.Group className="mb-3">
                                        <Form.Label>Perihal</Form.Label>
                                        <Form.Control id="perihal" type="text" onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" />
                                        {(!errorPerihal) ? '' :
                                            <Form.Text className="text-danger">
                                                {errorPerihal}
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Lokasi</Form.Label>
                                        <Form.Control id="lokasi" type="text" onChange={(e) => { setLokasi(e.target.value) }} placeholder="Enter Lokasi" />
                                        {(!errorLokasi) ? '' :
                                            <Form.Text className="text-danger">
                                                {errorLokasi}
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Alamat</Form.Label>
                                        <Form.Control id="alamat" type="text" onChange={(e) => { setAlamat(e.target.value) }} placeholder="Enter Alamat" />
                                        {(!errorAlamat) ? '' :
                                            <Form.Text className="text-danger">
                                                {errorAlamat}
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Jenis Perjalanan</Form.Label>
                                        <Form.Select aria-label="Jenis Perjalanan" onChange={(e) => { setJenisPerjalanan(e.target.value); }} >
                                            <option value="Dalam Kota">Dalam Kota</option>
                                            <option value="Luar Kota">Luar Kota</option>
                                        </Form.Select>
                                        {(!errorJenisPerjalanan) ? '' :
                                            <Form.Text className="text-danger">
                                                {errorJenisPerjalanan}
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tanggal Berangkat</Form.Label>
                                        <Form.Control type="date" id="tanggalBerangkat" onChange={(e) => { settanggalBerangkat(e.target.value) }} placeholder="Enter Tanggal Berangakt" />
                                        {(!errorTanggalBerangkat) ? '' :
                                            <Form.Text className="text-danger">
                                                {errorTanggalBerangkat}
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tanggal Kembali</Form.Label>
                                        <Form.Control type="date" id="tanggalKembali" onChange={(e) => { setTanggalKembali(e.target.value) }} placeholder="Enter Tanggal Kembali" />
                                        {(!errorTanggalKembali) ? '' :
                                            <Form.Text className="text-danger">
                                                {errorTanggalKembali}
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tahun</Form.Label>
                                        <Form.Control type="number" value={tahun} onChange={(e) => { setTahun(e.target.value) }} placeholder="Enter Tahun" />
                                        {(!errorTahun) ? '' :
                                            <Form.Text className="text-danger">
                                                {errorTahun}
                                            </Form.Text>
                                        }
                                    </Form.Group>
                                    <Button type='submit' variant='success' className='float-end'><BsCheckCircle /> Simpan</Button>
                                    <Button variant='danger' className='float-end' style={{ marginRight: 5 }} onClick={() => { history("/perjadin") }}><BsXCircle />  Batal</Button>
                                </Col>
                            </Row>
                        </Form>
                        {/* <p> Halaman Create Perjadin</p> */}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreatePerjadin
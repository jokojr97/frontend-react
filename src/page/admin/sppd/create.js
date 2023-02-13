import Axios from "axios";
import moment from "moment-timezone";
import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const CreateSppd = () => {
  const pathname = useLocation().pathname
  // const pathname = window.location.pathname
  // const location = useLocation()
  const idPerjadin = pathname.replace("/sppd/create/", '')
  const urlPerjadin = `${process.env.REACT_APP_URL_PERJADIN}/${idPerjadin}`
  const urlCreate = `${process.env.REACT_APP_URL_PERJADIN}/create`
  const urlPegawai = `${process.env.REACT_APP_URL_PEGAWAI}`

  const [dataPerjalanan, setDataPerlalanan] = useState('')

  const [show, setShow] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [ready, setReady] = useState(true)

  const [nomorSppd, setNomorSppd] = useState('')
  const [textPemberiPerintah, setTextPemberiPerintah] = useState('')
  const [idPemberiPerintah, setIdPemberiPerintah] = useState('')
  const [pemberiPerintah, setPemberiPerintah] = useState([])
  const [penerimaPerintah, setPenerimaPerintah] = useState([])
  const [textPenerimaPerintah, setTextPenerimaPerintah] = useState('')
  const [idPenerimaPerintah, setIdPenerimaPerintah] = useState('')
  const [perihal, setPerihal] = useState('')
  const [angkutan, setAngkutan] = useState('')
  const [tempatBernagkat, setTempatBerangkat] = useState('')
  const [tempatTujuan, setTempatTujuan] = useState('')
  const [lamaPerjalanan, setLamaPerjalanan] = useState('')
  const [tanggalBerangkat, setTanggalBerangkat] = useState('')
  const [tanggalKembali, setTanggalKembali] = useState('')
  const [instansi, setInstansi] = useState('')
  const [keteranganLain, setKeteranganLain] = useState('')
  const [dikeluarkanDi, setDikeluarkanDi] = useState('')
  const [kodeRekening, setKodeRekening] = useState('')
  const [tanggalSppd, setTanggalSppd] = useState('')
  const [tahun, setTahun] = useState('');
  const [dataPegawai, setDataPegawai] = useState([])
  const [sugesstion, setSugesstion] = useState([])

  const [errorNomorSppd, setErrorNomorSppd] = useState('')
  const [errorPemberiPerintah, setErrorPemberiPerintah] = useState()
  const [errorPenerimaPerintah, setErrorPenerimaPerintah] = useState([])
  const [errorPerihal, setErrorPerihal] = useState('')
  const [errorAnngkutan, setErrorAngkutan] = useState('')
  const [errorTempatBernagkat, setErrorTempatBerangkat] = useState('')
  const [errorTempatTujuan, setErrorTempatTujuan] = useState('')
  const [errorLamaPerjalanan, setErrorLamaPerjalanan] = useState('')
  const [errorTanggalBerangkat, setErrorTanggalBerangkat] = useState('')
  const [errorTanggalKembali, setErrorTanggalKembali] = useState('')
  const [errorInstansi, setErrorInstansi] = useState('')
  const [errorKeteranganLain, setErrorKeteranganLain] = useState('')
  const [errorDikeluarkanDi, setErrorDikeluarkanDi] = useState('')
  const [errorKodeRekening, setErrorKodeRekening] = useState('')
  const [errorTanggalSppd, setErrorTanggalSppd] = useState('')
  const [errorTahun, setErrorTahun] = useState('');

  const history = useNavigate()

  const setErrorNotif = (err) => {
    err.map(v => {
      if (v.param == "nomor_sppd") {
        setErrorNomorSppd(v.msg)
      } else if (v.param == "pegawai_yang_diperintahkan") {
        setErrorPenerimaPerintah(v.msg)
      } else if (v.param == "pejabat_yang_memberi_perintah") {
        setErrorPemberiPerintah(v.msg)
      } else if (v.param == "perihal") {
        setErrorPerihal(v.msg)
      } else if (v.param == "angkutan") {
        setErrorAngkutan(v.msg)
      } else if (v.param == "tempat_berangkat") {
        setErrorTempatBerangkat(v.msg)
      } else if (v.param == "tempat_tujuan") {
        setErrorTempatTujuan(v.msg)
      } else if (v.param == "lama_perjalanan") {
        setErrorLamaPerjalanan(v.msg)
      } else if (v.param == "tanggal_berangkat") {
        setErrorTanggalBerangkat(v.msg)
      } else if (v.param == "tanggal_kembali") {
        setErrorTanggalKembali(v.msg)
      } else if (v.param == "instansi") {
        setErrorInstansi(v.msg)
      } else if (v.param == "keterangan_lain") {
        setErrorKeteranganLain(v.msg)
      } else if (v.param == "dikeluarkan_di") {
        setErrorDikeluarkanDi(v.msg)
      } else if (v.param == "tanggal_sppd") {
        setErrorTanggalSppd(v.msg)
      } else if (v.param == "kode_rekening") {
        setErrorKodeRekening(v.msg)
      } else if (v.param == "tahun") {
        setErrorTahun(v.msg)
      } else {
        setErrorMessage(v.msg)
      }
    })
  }

  const setData = (val) => {
    setDataPerlalanan(val)
    setPerihal(val.perihal)
    setTanggalBerangkat(val.tanggal_berangkat)
    setTanggalKembali(val.tanggal_kembali)
  }

  const loadData = () => {
    setReady(false)
    Axios.get(urlPerjadin).then(value => {
      setData(value.data.data)
      const berangkat = moment(value.tanggal_berangkat);
      const kembali = moment(value.tanggal_kembali);
      const lama = kembali.diff(berangkat);
      const duration = moment.duration(lama);
      const lamaPerjalanan = duration.days() + 1;
      setLamaPerjalanan(lamaPerjalanan)
      setReady(true)
    }).catch(err => catchErr(err))
  }

  const loadPegawai = () => {
    Axios.get(urlPegawai).then(v => {
      setDataPegawai(v.data.data)
    }
    ).catch(err => catchErr(err))
  }

  const catchErr = (err) => {
    err.response.data ? setErrorMessage(err.response.data.message) : setErrorMessage(err.message);
    if (err.response.data.data.errorStatus == 400) {
      setErrorNotif(err.response.data.data.data)
    }
    setReady(true);
    setShow(true);
  }

  const getPegawaiById = (id) => {
    const urlPegawai = `${process.env.REACT_APP_URL_PEGAWAI}/${id}`
    Axios.get(urlPegawai).then(v => {
      return v.data.data
    }).catch(err => catchErr(err))
  }

  const submitForm = (e) => {
    e.preventDefault();
    setPemberiPerintah(getPegawaiById(idPemberiPerintah))
    setPenerimaPerintah(getPegawaiById(idPenerimaPerintah))

    const body = {
      nomor_sppd: nomorSppd,
      pejabat_yang_memberi_perintah: {
        name: pemberiPerintah.name,
        jabatan: pemberiPerintah.jabatan,
        pangkat: pemberiPerintah.pangkat,
        nip: pemberiPerintah.nip,
        golongan: pemberiPerintah.golongan,
      },
      pegawai_yang_diperintahkan: [{
        name: penerimaPerintah.name,
        jabatan: penerimaPerintah.jabatan,
        pangkat: penerimaPerintah.pangkat,
        nip: penerimaPerintah.nip,
        golongan: penerimaPerintah.golongan,
      }],
      id_perjadin: dataPerjalanan._id,
      perihal: perihal,
      angkutan: angkutan,
      tempat_berangkat: tempatBernagkat,
      tempat_tujuan: tempatTujuan,
      lama_perjalanan: lamaPerjalanan,
      tanggal_berangkat: tanggalBerangkat,
      tanggal_kembali: tanggalKembali,
      instansi: instansi,
      keterangan_lain: keteranganLain,
      dikeluarkan_di: dikeluarkanDi,
      tanggal_sppd: tanggalSppd,
      kode_rekening: kodeRekening,
      tahun: tahun,
    }

    console.log("body: ", body)
    // Axios.post(urlCreate, body).then(v => {
    //   history("/sppd");
    // }).catch(err => catchErr(err))
  }

  const sugesstHandler = (data) => {
    setTextPemberiPerintah(data.name);
    setIdPemberiPerintah(data._id)
    setPemberiPerintah(data)
    console.log("sugesst", data)
    setSugesstion('')
  }

  const pejabatOnChangeHandler = (text) => {
    // console.log("dataPerjalanan", dataPegawai)
    setTextPemberiPerintah(text)
    let matches = []
    if (text.length > 0) {
      matches = dataPegawai.filter(pegawai => {
        const regex = new RegExp(`${textPemberiPerintah}`, "gi")
        return pegawai.name.match(regex)
      })
    }
    // console.log("matches", matches)
    setSugesstion(matches)
  }

  React.useEffect(() => {
    loadData()
    loadPegawai()
  }, [])


  return <div>
    <Container fluid>
      <Row>
        <Col md={{ span: 10, offset: 1 }} className="p-3">
          {!show ? ("") : (
            <Alert variant="danger" onClose={() => setShow(false)} key="alert" dismissible >
              <p>{errorMessage}</p>
            </Alert>
          )}
          <h4>Halaman Tambah SPPD</h4>
          <hr />
          <Form onSubmit={submitForm}>
            <Row>
              <Col md="4">
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" disabled />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Pejabat yang memberi perintah</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="pemberiPerintah" type="text" value={textPemberiPerintah} onChange={(e) => { pejabatOnChangeHandler(e.target.value) }} placeholder="Enter Perihal" />
                  {sugesstion && sugesstion.map((sugest, i) => {
                    return <div key={i} style={{ backgroundColor: "white", cursor: "pointer" }} onClick={(e => sugesstHandler(sugest))}>{sugest.name} - {sugest.bidang}</div>
                  })}
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
              </Col>
              <Col md="4">

                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Enter Perihal" />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <div className="mt-3">
                  <Button type='submit' variant='success' className='float-end'><BsCheckCircle /> Simpan</Button>
                  <Button variant='danger' className='float-end' style={{ marginRight: 5 }} onClick={() => { history("/perjadin") }}><BsXCircle />  Batal</Button>
                </div>
              </Col>

            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  </div >;
};

export default CreateSppd;

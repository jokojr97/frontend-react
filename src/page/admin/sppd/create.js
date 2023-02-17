import Axios from "axios";
import moment from "moment-timezone";
import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import '../admin.scss'

const CreateSppd = () => {
  const pathname = useLocation().pathname
  const idPerjadin = pathname.replace("/sppd/create/", '')
  const urlPerjadin = `${process.env.REACT_APP_URL_PERJADIN}/${idPerjadin}`
  const urlCreate = `${process.env.REACT_APP_URL_SPPD}/insert`
  const urlPegawai = `${process.env.REACT_APP_URL_PEGAWAI}`
  const urlpdf = `${process.env.REACT_APP_URL_SPPD}/pdf/create`

  const [dataPerjalanan, setDataPerlalanan] = useState('')

  const [show, setShow] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [ready, setReady] = useState(true)

  const [nomorSppd, setNomorSppd] = useState('')
  const [textPemberiPerintah, setTextPemberiPerintah] = useState('')
  const [pemberiPerintah, setPemberiPerintah] = useState([])
  const [penerimaPerintah, setPenerimaPerintah] = useState([])
  const [textPenerimaPerintah, setTextPenerimaPerintah] = useState('')
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
  const [sugesstionPejabat, setSugesstionPejabat] = useState([])
  const [sugesstionPegawai, setSugesstionPegawai] = useState([])

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
    setTahun(val.tahun)
    const tglBerangkat = moment(val.tanggal_berangkat);
    const tglKembali = moment(val.tanggal_kembali);
    setTanggalBerangkat(tglBerangkat.tz("Asia/Jakarta").format("DD MMM YYYY"))
    setTanggalKembali(tglKembali.tz("Asia/Jakarta").format("DD MMM YYYY"))
    setTempatTujuan(val.lokasi)
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

  const submitForm = (e) => {
    e.preventDefault();
    const body = {
      nomor_sppd: nomorSppd,
      pejabat_yang_memberi_perintah: {
        name: pemberiPerintah.name,
        jabatan: pemberiPerintah.jabatan,
        pangkat: "pemberiPerintah.pangkat",
        nip: pemberiPerintah.nip,
        golongan: pemberiPerintah.golongan,
      },
      pegawai_yang_diperintahkan: penerimaPerintah,
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

    console.log("body", body)

    Axios.post(urlpdf, body).then(
      Axios.post(urlCreate, body).then(v => {
        // history("/sppd");
      }).catch(err => catchErr(err))
    ).catch(err => catchErr(err))
    // console.log("body: ", body)
  }

  const sugesstPejabatHandler = (data) => {
    setTextPemberiPerintah(`${data.name} - ${data.jabatan}`);
    setPemberiPerintah(data);
    // console.log("sugesst", pemberiPerintah)
    setSugesstionPejabat('')
  }

  const sugesstPegawaiHandler = (data) => {
    setTextPenerimaPerintah(`${data.name} - ${data.jabatan}`)
    if (!penerimaPerintah) {
      setPenerimaPerintah({
        name: data.name,
        jabatan: data.jabatan,
        pangkat: "data.pangkat",
        nip: data.nip,
        golongan: data.golongan,
      })
    } else {
      penerimaPerintah.push(
        {
          name: data.name,
          jabatan: data.jabatan,
          pangkat: "data.pangkat",
          nip: data.nip,
          golongan: data.golongan,
        }
      )
      setPenerimaPerintah(penerimaPerintah);
    }
    // console.log("pgawai", penerimaPerintah)
    setSugesstionPegawai('')
  }

  const pegawaiOnChangeHandler = (text) => {
    setTextPenerimaPerintah(text)
    let matches = []
    if (text.length > 0) {
      matches = dataPegawai.filter(pegawai => {
        const regex = new RegExp(`${textPenerimaPerintah}`, "gi")
        return pegawai.name.match(regex)
      })
    }
    // setPenerimaPerintah('')
    setSugesstionPegawai(matches)
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
    setSugesstionPejabat(matches)
  }

  React.useEffect(() => {
    // cekSPPD()
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
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={perihal} onChange={(e) => { setPerihal(e.target.value) }} placeholder="Masukkan Perihal" disabled />
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Row>
                  <Col style={{ paddingRight: "5px" }} xs="4">
                    <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                      <Form.Label className="mb-1">Tgl Berangkat</Form.Label>
                      <Form.Control style={{ fontSize: "13px" }} id="tanggalBerangkat" type="text" value={tanggalBerangkat} onChange={(e) => { setTanggalBerangkat(e.target.value) }} disabled />
                      {(!errorTanggalKembali) ? '' :
                        <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                          {errorTanggalKembali}
                        </Form.Text>
                      }
                    </Form.Group>
                  </Col>
                  <Col style={{ paddingLeft: "5px", paddingRight: "5px" }} xs="4">
                    <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                      <Form.Label className="mb-1">Tgl Kembali</Form.Label>
                      <Form.Control style={{ fontSize: "13px" }} id="tanggalKembali" type="text" value={tanggalKembali} onChange={(e) => { setTanggalKembali(e.target.value) }} disabled />
                      {(!errorTanggalKembali) ? '' :
                        <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                          {errorTanggalKembali}
                        </Form.Text>
                      }
                    </Form.Group>
                  </Col>
                  <Col style={{ paddingLeft: "5px" }} xs="4">
                    <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                      <Form.Label className="mb-1">Lama Perjlanan</Form.Label>
                      <Form.Control style={{ fontSize: "13px" }} id="tanggalKembali" type="text" value={`${lamaPerjalanan} Hari`} onChange={(e) => { setTanggalKembali(e.target.value) }} disabled />
                      {(!errorTanggalKembali) ? '' :
                        <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                          {errorTanggalKembali}
                        </Form.Text>
                      }
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Tempat Tujuan</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="tujuan" type="text" value={tempatTujuan} onChange={(e) => { setTempatTujuan(e.target.value) }} placeholder="Masukkan Tjuan" disabled />
                  {(!errorTempatTujuan) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorTempatTujuan}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Tempat Tujuan</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="tempatTujuan" type="text" value={tempatTujuan} onChange={(e) => { setTempatTujuan(e.target.value) }} placeholder="Masukkan Tempat Tujuan" disabled />
                  {(!errorTempatBernagkat) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorTempatBernagkat}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Tahun</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="tahun" type="text" value={tahun} onChange={(e) => { setTempatTujuan(e.target.value) }} placeholder="Masukkan Tempat Tujuan" disabled />
                  {(!errorTempatTujuan) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorTempatTujuan}
                    </Form.Text>
                  }
                </Form.Group>
              </Col>
              <Col md="4">

                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Nomor SPPD</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="noSppd" type="text" value={nomorSppd} onChange={(e) => { setNomorSppd(e.target.value) }} placeholder="Masukkan Nomor SPPD" />
                  {(!errorNomorSppd) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorNomorSppd}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Pejabat yang memberi perintah</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} autoComplete="off" id="pemberiPerintah" type="text" value={textPemberiPerintah} onChange={(e) => { pejabatOnChangeHandler(e.target.value) }} placeholder="Masukkan Perihal" />
                  {sugesstionPejabat && sugesstionPejabat.map((sugest, i) => {
                    return <div key={i} className="sugesst-form" onClick={(e => sugesstPejabatHandler(sugest))}>{sugest.name} - {sugest.jabatan}</div>
                  })}
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Pegawai yang merima Perintah</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="pegawi" type="text" autoComplete="off" value={textPenerimaPerintah} onChange={(e) => { pegawaiOnChangeHandler(e.target.value) }} placeholder="Masukkan Perihal" />
                  {sugesstionPegawai && sugesstionPegawai.map((sugest, i) => {
                    return <div key={i} className="sugesst-form" onClick={(e => sugesstPegawaiHandler(sugest))}>{sugest.name} - {sugest.jabatan}</div>
                  })}
                  {(!errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Angkutan</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="angkutan" type="text" value={angkutan} onChange={(e) => { setAngkutan(e.target.value) }} placeholder="Masukkan Angkutan" />
                  {(!errorAnngkutan) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorAnngkutan}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Tempat Berangkat</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="tempatBerangkat" type="text" value={tempatBernagkat} onChange={(e) => { setTempatBerangkat(e.target.value) }} placeholder="Masukkan Tempat Berangkat" />
                  {(!errorTempatBernagkat) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorTempatBernagkat}
                    </Form.Text>
                  }
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Instansi</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="instansi" type="text" value={instansi} onChange={(e) => { setInstansi(e.target.value) }} placeholder="Masukkan Instansi" />
                  {(!errorInstansi) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorInstansi}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Dikeluarkan di</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="dikeluarkanDi" type="text" value={dikeluarkanDi} onChange={(e) => { setDikeluarkanDi(e.target.value) }} placeholder="Masukkan Lokasi Dikeluarkan Surat" />
                  {(!errorDikeluarkanDi) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorDikeluarkanDi}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Tanggal Sppd</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="tanggalSppd" type="date" value={tanggalSppd} onChange={(e) => { setTanggalSppd(e.target.value) }} placeholder="Masukkan Tanggal SPPD" />
                  {(!errorTanggalSppd) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorTanggalSppd}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Kode Rekening</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="kodeRekening" type="text" value={kodeRekening} onChange={(e) => { setKodeRekening(e.target.value) }} placeholder="Masukkan Kode Rekening" />
                  {(!errorKodeRekening) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorKodeRekening}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Keterangan Lain</Form.Label>
                  <Form.Control as="textarea" style={{ fontSize: "13px" }} id="keteranganLain" type="text" value={keteranganLain} onChange={(e) => { setKeteranganLain(e.target.value) }} placeholder="Masukkan Keterangan" />
                  {(!errorKeteranganLain) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {errorKeteranganLain}
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
      </Row >
    </Container >
  </div >;
};

export default CreateSppd;

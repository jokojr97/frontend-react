import React from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import '../admin.scss'

const CreateSppd = props => {

  return <div>
    <Container fluid>
      <Row>
        <Col md={{ span: 10, offset: 1 }} className="p-3">
          {!props.show ? ("") : (
            <Alert variant="danger" onClose={() => props.setShow(false)} key="alert" dismissible >
              <p>{props.errorMessage}</p>
            </Alert>
          )}
          <h4>Halaman Tambah SPPD</h4>
          <hr />
          <Form onSubmit={props.submitForm}>
            <Row>
              <Col md="4">
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Perihal</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={props.perihal} onChange={(e) => { props.setPerihal(e.target.value) }} placeholder="Masukkan Perihal" disabled />
                  {(!props.errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {props.errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Row>
                  <Col style={{ paddingRight: "5px" }} xs="4">
                    <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                      <Form.Label className="mb-1">Tanggal Berangkat</Form.Label>
                      <Form.Control style={{ fontSize: "13px" }} id="tanggalBerangkat" type="text" value={props.tanggalBerangkat} onChange={(e) => { props.setTanggalBerangkat(e.target.value) }} disabled />
                      {(!props.errorTanggalKembali) ? '' :
                        <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                          {props.errorTanggalKembali}
                        </Form.Text>
                      }
                    </Form.Group>
                  </Col>
                  <Col style={{ paddingLeft: "5px", paddingRight: "5px" }} xs="4">
                    <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                      <Form.Label className="mb-1">Tanggal Kembali</Form.Label>
                      <Form.Control style={{ fontSize: "13px" }} id="tanggalKembali" type="text" value={props.tanggalKembali} onChange={(e) => { props.setTanggalKembali(e.target.value) }} disabled />
                      {(!props.errorTanggalKembali) ? '' :
                        <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                          {props.errorTanggalKembali}
                        </Form.Text>
                      }
                    </Form.Group>
                  </Col>
                  <Col style={{ paddingLeft: "5px" }} xs="4">
                    <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                      <Form.Label className="mb-1">Lama Perjlanan</Form.Label>
                      <Form.Control style={{ fontSize: "13px" }} id="tanggalKembali" type="text" value={`${props.lamaPerjalanan} Hari`} onChange={(e) => { props.setTanggalKembali(e.target.value) }} disabled />
                      {(!props.errorTanggalKembali) ? '' :
                        <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                          {props.errorTanggalKembali}
                        </Form.Text>
                      }
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Tempat Tujuan</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="tujuan" type="text" value={props.tempatTujuan} onChange={(e) => { props.setTempatTujuan(e.target.value) }} placeholder="Masukkan Tjuan" disabled />
                  {(!props.errorTempatTujuan) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {props.errorTempatTujuan}
                    </Form.Text>
                  }
                </Form.Group>
                {/* <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Tempat Tujuan</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="tempatTujuan" type="text" value={props.tempatTujuan} onChange={(e) => { props.setTempatTujuan(e.target.value) }} placeholder="Masukkan Tempat Tujuan" disabled />
                  {(!props.errorTempatBernagkat) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {props.errorTempatBernagkat}
                    </Form.Text>
                  }
                </Form.Group> */}
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Tahun</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="tahun" type="text" value={props.tahun} onChange={(e) => { props.setTempatTujuan(e.target.value) }} placeholder="Masukkan Tempat Tujuan" disabled />
                  {(!props.errorTempatTujuan) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {props.errorTempatTujuan}
                    </Form.Text>
                  }
                </Form.Group>
              </Col>
              <Col md="4">

                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Nomor SPPD</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="noSppd" type="text" value={props.nomorSppd} onChange={(e) => { props.setNomorSppd(e.target.value) }} placeholder="Masukkan Nomor SPPD" />
                  {(!props.errorNomorSppd) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {props.errorNomorSppd}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Pejabat yang memberi perintah</Form.Label>

                  <Form.Select style={{ fontSize: "13px" }} aria-label="PemberiPerintah" onChange={(e) => { props.pemberiPerintahHandler(e.target.value); }} >
                    <option value="kadis">KABAG - TRIGUNO S. PRIO, S.STP, MM</option>
                    <option value="assisten">ASSISTEN 3 - NINIK SUSMIATI, SKM, MKeS</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Pegawai yang merima Perintah</Form.Label>
                  <Form.Control style={{ fontSize: "13px", textTransform: "capitalize" }} id="pegawi" type="text" autoComplete="off" value={props.textPenerimaPerintah} onChange={(e) => { props.pegawaiOnChangeHandler(e.target.value) }} placeholder="Ketikkan Nama Pegawai" />
                  {props.sugesstionPegawai && props.sugesstionPegawai.map((sugest, i) => {
                    return <div key={i} className="sugesst-form" style={{ textTransform: "capitalize" }} onClick={(e => props.sugesstPegawaiHandler(sugest))}>{sugest.name} - {sugest.jabatan}</div>
                  })}
                  {(!props.errorPerihal) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {props.errorPerihal}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Angkutan</Form.Label>

                  <Form.Select style={{ fontSize: "13px" }} aria-label="PemberiPerintah" onChange={(e) => { props.setAngkutan(e.target.value) }} >
                    <option>Transportasi Darat</option>
                    <option>Transportasi Udara</option>
                    <option>Transportasi Laut</option>
                    <option>Transportasi Darat dan Udara</option>
                    <option>Transportasi Darat dan Laut</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Tempat Berangkat</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="tempatBerangkat" type="text" value={props.tempatBernagkat} onChange={(e) => { props.setTempatBerangkat(e.target.value) }} placeholder="Masukkan Tempat Berangkat" />
                  {(!props.errorTempatBernagkat) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {props.errorTempatBernagkat}
                    </Form.Text>
                  }
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Instansi</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="instansi" type="text" value={props.instansi} onChange={(e) => { props.setInstansi(e.target.value) }} placeholder="Masukkan Instansi" />
                  {(!props.errorInstansi) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {props.errorInstansi}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Dikeluarkan di</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="dikeluarkanDi" type="text" value={props.dikeluarkanDi} onChange={(e) => { props.setDikeluarkanDi(e.target.value) }} placeholder="Masukkan Lokasi Dikeluarkan Surat" />
                  {(!props.errorDikeluarkanDi) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {props.errorDikeluarkanDi}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Tanggal Sppd</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="tanggalSppd" type="date" value={props.tanggalSppd} onChange={(e) => { props.setTanggalSppd(e.target.value) }} placeholder="Masukkan Tanggal SPPD" />
                  {(!props.errorTanggalSppd) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {props.errorTanggalSppd}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Kode Rekening</Form.Label>
                  <Form.Control style={{ fontSize: "13px" }} id="kodeRekening" type="text" value={props.kodeRekening} onChange={(e) => { props.setKodeRekening(e.target.value) }} placeholder="Masukkan Kode Rekening" />
                  {(!props.errorKodeRekening) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {props.errorKodeRekening}
                    </Form.Text>
                  }
                </Form.Group>
                <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                  <Form.Label className="mb-1">Keterangan Lain</Form.Label>
                  <Form.Control as="textarea" style={{ fontSize: "13px" }} id="keteranganLain" type="text" value={props.keteranganLain} onChange={(e) => { props.setKeteranganLain(e.target.value) }} placeholder="Masukkan Keterangan" />
                  {(!props.errorKeteranganLain) ? '' :
                    <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                      {props.errorKeteranganLain}
                    </Form.Text>
                  }
                </Form.Group>
                <div className="mt-3">
                  <Button type='submit' variant='success' className='float-end'><BsCheckCircle /> Simpan</Button>
                  <Button variant='danger' className='float-end' style={{ marginRight: 5 }} onClick={() => { props.history("/perjadin") }}><BsXCircle />  Batal</Button>
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

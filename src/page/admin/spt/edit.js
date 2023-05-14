import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Alert, Badge, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';

const EditSpt = props => {

  return (
    <div>

      <Container fluid>
        <Row>
          <Col className="p-3">
            {!props.show ? ("") : (
              <Alert variant="danger" onClose={() => props.setShow(false)} key="alert" dismissible >
                <p>{props.errorMessage}</p>
              </Alert>
            )}
            <h4>Halaman Edit SPT</h4>
            <hr />

            <Form onSubmit={props.submitForm}>
              <Row>
                <Col md="12">

                  <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                    <Form.Label className="mb-1">Nomor SPT</Form.Label>
                    <Form.Control style={{ fontSize: "13px" }} id="perihal" type="text" value={props.nomorSpt} onChange={(e) => { props.setNomorSpt(e.target.value) }} placeholder="Masukkan Nomor SPT" />
                    {/* {console.log("spt", props.nomorSpt)} */}
                    {(!props.errorPerihal) ? '' :
                      <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                        {props.errorPerihal}
                      </Form.Text>
                    }
                  </Form.Group>

                  <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                    <Form.Label className="mb-1">Dasar Hukum</Form.Label>
                    <Editor
                      onInit={(evnt, editor) => props.editorRef.current = editor}
                      init={{
                        menubar: false,
                        height: 200,
                      }}
                      initialValue={props.dasarSpt}

                    />
                  </Form.Group>

                  <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                    <Form.Label className="mb-1">Pejabat yang memberi perintah</Form.Label>

                    <Form.Select style={{ fontSize: "13px" }} aria-label="PemberiPerintah" onChange={(e) => { props.pemberiPerintahHandler(e.target.value); }} >
                      {(props.pemberiPerintah.jabatan == "Asisten Administrasi Umum") ? <option value="assisten">NINIK SUSMIATI, SKM, MKeS</option> : <option value="kadis">TRIGUNO S. PRIO, S.STP, MM</option>}
                      <option value="kadis">TRIGUNO S. PRIO, S.STP, MM</option>
                      <option value="assisten">NINIK SUSMIATI, SKM, MKeS</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                    <Form.Label className="mb-1">Pegawai yang merima Perintah</Form.Label>
                    <Form.Control style={{ fontSize: "13px", marginBottom: "5px" }} id="pegawi" type="text" autoComplete="off" value={props.textPenerimaPerintah} onChange={(e) => { props.pegawaiOnChangeHandler(e.target.value) }} placeholder="Masukkan Nama Pegawai" />
                    {props.sugesstionPegawai && props.sugesstionPegawai.map((sugest, i) => {
                      return <div key={i} className="sugesst-form" onClick={(e => props.sugesstPegawaiHandler(sugest))}>{sugest.name} - {sugest.jabatan}</div>
                    })}
                    {/* {console.log("pp", props.penerimaPerintah)} */}
                    {props.penerimaPerintah && props.penerimaPerintah.map((val, index) => {
                      return <i style={{ margin: "2px", fontSize: "16px" }}><Badge bg="success" onClick={() => props.removeTags(index)} style={{ cursor: "pointer" }}>{val.name} &nbsp;<BsXCircle onClick={() => props.removeTags(index)} /></Badge></i>
                    })}
                  </Form.Group>

                  <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                    {/* {console.log("date: ", props.tanggalSpt)} */}
                    <Form.Label className="mb-1">Tanggal SPT</Form.Label>
                    <Form.Control style={{ fontSize: "13px" }} id="tanggalSpt" type="date" value={props.tanggalSpt} onChange={(e) => { props.setTanggalSpt(e.target.value) }} placeholder="Masukkan Tanggal SPPD" />
                    {(!props.errortanggalSpt) ? '' :
                      <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                        {props.errortanggalSpt}
                      </Form.Text>
                    }
                  </Form.Group>

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
                    <Col style={{ paddingRight: "5px" }} xs="6">
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
                    <Col style={{ paddingLeft: "5px", paddingRight: "5px" }} xs="6">
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
                  </Row>
                  <Form.Group className="mb-2" style={{ fontSize: "13px" }}>
                    <Form.Label className="mb-1">Lokasi Kegiatan</Form.Label>
                    <Form.Control style={{ fontSize: "13px" }} id="tujuan" type="text" value={props.lokasi} onChange={(e) => { props.setLokasi(e.target.value) }} placeholder="Masukkan Tjuan" disabled />
                    {(!props.errorLokasi) ? '' :
                      <Form.Text className="text-danger" style={{ fontSize: "12px" }}>
                        {props.errorLokasi}
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
                  <div className="mt-3">
                    <Button type='submit' variant='success' className='float-end'><BsCheckCircle /> Simpan</Button>
                    <Button variant='danger' className='float-end' style={{ marginRight: 5 }} onClick={() => { props.history("/spt") }}><BsXCircle />  Batal</Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EditSpt
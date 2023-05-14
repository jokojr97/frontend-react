import Axios from "axios";
import moment from "moment-timezone";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditSpt from '../../page/admin/spt/edit'

const ControllerEditSpt = () => {

    const d = new Date();
    let year = d.getFullYear();
    const urlPegawai = `${process.env.REACT_APP_URL_PEGAWAI}`;
    const urlUpdate = `${process.env.REACT_APP_URL_SPT}/update`;
    const urledit = `${process.env.REACT_APP_URL_PERJADIN}/update`
    const urlpdf = `${process.env.REACT_APP_URL_SPT}/pdf/create`;
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [ready, setReady] = useState(true);
    // const [data, setData] = useState([])

    const [perihal, setPerihal] = useState('')
    const [lokasi, setLokasi] = useState('')
    const [alamat, setAlamat] = useState('')
    const [dasarSpt, SetDasarSPT] = useState('')
    const [nomorSpt, setNomorSpt] = useState('')
    const [tahun, setTahun] = useState('')
    const [berangkatPerjadin, setBerangkat] = useState('')

    const today = new Date();
    let month = today.getMonth() + 1;
    let dates = today.getDate();
    (month < 10) ? month = "0" + (today.getMonth() + 1) : month = (today.getMonth() + 1);
    (dates < 10) ? dates = "0" + today.getDate() : dates = today.getDate();
    const datenow = today.getFullYear() + '-' + month + '-' + dates
    // setTanggalSpt(datenow)

    const [tanggalSpt, setTanggalSpt] = useState(datenow)
    const [kembaliPerjadin, setKembali] = useState('')
    const [lamaPerjalanan, setLamaPerjalanan] = useState('')
    const [jenisPerjalanan, setJenisPerjalanan] = useState('')

    const [dataPegawai, setDataPegawai] = useState([]);

    const [textPemberiPerintah, setTextPemberiPerintah] = useState("");
    const [pemberiPerintah, setPemberiPerintah] = useState("");
    const [penerimaPerintah, setPenerimaPerintah] = useState([]);
    const [textPenerimaPerintah, setTextPenerimaPerintah] = useState("");
    const [sugesstionPejabat, setSugesstionPejabat] = useState([]);
    const [sugesstionPegawai, setSugesstionPegawai] = useState([]);

    const [tanggalBerangkat, setTanggalBerangkat] = useState("");
    const [tanggalKembali, setTanggalKembali] = useState("");

    const editorRef = useRef();
    const EditorHandler = (editor) => {
        // console.log(editorRef.current)
        editorRef.current = editor
        // console.log("editor: ", editor)
    }
    const history = useNavigate()
    const pathname = useLocation().pathname;
    const idSPT = pathname.replace("/spt/edit/", "");
    const urlSPT = `${process.env.REACT_APP_URL_SPT}/${idSPT}`;

    const setDataSPT = (data) => {
        setNomorSpt(data.nomor_spt)
        SetDasarSPT(data.dasar_spt)
        setPerihal(data.perihal)
        setLokasi(data.lokasi_kegiatan)
        setTahun(data.tahun)

        const tglBerangkat = moment(data.tanggal_mulai);
        const tglKembali = moment(data.tanggal_selesai);
        const tglspt = moment(data.tanggal_spt);
        setTanggalBerangkat(tglBerangkat.tz("Asia/Jakarta").format("YYYY-MM-DD"))
        setTanggalKembali(tglKembali.tz("Asia/Jakarta").format("YYYY-MM-DD"))
        setTanggalSpt(tglspt.tz("Asia/Jakarta").format("YYYY-MM-DD"))
        setPenerimaPerintah(data.pegawai_yang_diperintahkan)
        // console.log("data.pegawai_yang_diperintahkan", data.pegawai_yang_diperintahkan)
        if (data.pejabat_yang_memerintahkan.an.length == 3) {
            const ttd = {
                an: [{
                    name: "a.n. SEKRETARIS DAERAH"
                }, {
                    name: "Asisten Administrasi Umum"
                }, {
                    name: "U.b"
                }],
                name: "TRIGUNO S. PRIO, S.STP, MM",
                jabatan: "Kepala Bagian Protokol dan Komunikasi Pimpinan",
                pangkat: "Pembina",
                nip: "19810815 199912 1 002",
                golongan: "",
            }
            setPemberiPerintah(ttd)
        } else {
            const pp = {
                an: [{
                    name: "a.n. SEKRETARIS DAERAH"
                }],
                name: "NINIK SUSMIATI, SKM, MKes",
                jabatan: "Asisten Administrasi Umum",
                pangkat: "Pembina Utama Muda",
                nip: "19680325 199302 2 001",
                golongan: "",
            }
            setPemberiPerintah(pp)

        }
    }

    const removeTags = (indextoRemove) => {
        setPenerimaPerintah(penerimaPerintah.filter((_, index) => index !== indextoRemove))
        // console.log(penerimaPerintah)
    }

    const pemberiPerintahHandler = (val) => {
        if (val == "kadis") {
            const pp = {
                an: [{
                    name: "a.n. SEKRETARIS DAERAH"
                }, {
                    name: "Asisten Administrasi Umum"
                }, {
                    name: "U.b"
                }],
                name: "TRIGUNO S. PRIO, S.STP, MM",
                jabatan: "Kepala Bagian Protokol dan Komunikasi Pimpinan",
                pangkat: "Pembina",
                nip: "19810815 199912 1 002",
                golongan: "",
            }
            setPemberiPerintah(pp)
            // console.log(pemberiPerintah)

        } else if (val == "assisten") {
            const pp = {
                an: [{
                    name: "a.n. SEKRETARIS DAERAH"
                }],
                name: "NINIK SUSMIATI, SKM, MKes",
                jabatan: "Asisten Administrasi Umum",
                pangkat: "Pembina Utama Muda",
                nip: "19680325 199302 2 001",
                golongan: "",
            }
            setPemberiPerintah(pp)
            // console.log(pemberiPerintah)
        }
    }

    const loadPegawai = () => {
        Axios.get(urlPegawai)
            .then((v) => {
                setDataPegawai(v.data.data);
            })
            .catch((err) => catchErr(err));
    };

    const loadData = async () => {
        await Axios.get(urlSPT).then((v) => {
            setDataSPT(v.data.data)
            // console.log("data", v.data.data)
        }).catch((err) => catchErr(err))
    }

    const sugesstPejabatHandler = (data) => {
        setTextPemberiPerintah(`${data.name} - ${data.jabatan}`);
        setPemberiPerintah(data);
        // console.log("sugesst", pemberiPerintah)
        setSugesstionPejabat("");
    };

    const sugesstPegawaiHandler = (data) => {
        setTextPenerimaPerintah(`${data.name} - ${data.jabatan}`);
        if (!penerimaPerintah) {
            setPenerimaPerintah({
                name: data.name,
                jabatan: data.jabatan,
                pangkat: data.pangkat,
                nip: data.nip,
                golongan: data.golongan,
            });
            setTextPenerimaPerintah("");

        } else {
            penerimaPerintah.push({
                name: data.name,
                jabatan: data.jabatan,
                pangkat: data.pangkat,
                nip: data.nip,
                golongan: data.golongan,
            });
            setPenerimaPerintah(penerimaPerintah);
            setTextPenerimaPerintah("");
        }
        // console.log("pgawai", penerimaPerintah)
        setSugesstionPegawai("");
    };

    const pegawaiOnChangeHandler = (text) => {
        setTextPenerimaPerintah(text);
        let matches = [];
        if (text.length > 0) {
            matches = dataPegawai.filter((pegawai) => {
                const regex = new RegExp(`${textPenerimaPerintah}`, "gi");
                return pegawai.name.match(regex);
            });
        }
        // setPenerimaPerintah('')
        setSugesstionPegawai(matches);
    };

    const pejabatOnChangeHandler = (text) => {
        // console.log("dataPerjalanan", dataPegawai)
        setTextPemberiPerintah(text);
        let matches = [];
        if (text.length > 0) {
            matches = dataPegawai.filter((pegawai) => {
                const regex = new RegExp(`${textPemberiPerintah}`, "gi");
                return pegawai.name.match(regex);
            });
        }
        setSugesstionPejabat(matches);
    };


    const catchErr = (err) => {
        err.response.data
            ? setErrorMessage(err.response.data.message)
            : setErrorMessage(err.message);
        // if (err.response.data.data.errorStatus == 400) {
        //   setErrorNotif(err.response.data.data.data);
        // }
        setReady(true);
        setShow(true);
    };


    const loadDataKecamatan = () => {
        Axios.get('https://kanglerian.github.io/api-wilayah-indonesia/api/districts/3522.json').then((val) => {
            setKecamatan(val)
        }).catch(err => { catchErr(err) })
    }

    const submitForm = (e) => {

        e.preventDefault();
        const tinym = editorRef.current.getContent();
        const dasarSpt = tinym
        // console.log("tinymce: ", tinym)
        const body = {
            _id: idSPT,
            nomor_spt: nomorSpt,
            dasar_spt: dasarSpt,
            perihal: perihal,
            tanggal_mulai: tanggalBerangkat,
            tanggal_spt: tanggalSpt,
            tanggal_selesai: tanggalKembali,
            lokasi_kegiatan: lokasi,
            pejabat_yang_memerintahkan: pemberiPerintah,
            pegawai_yang_diperintahkan: penerimaPerintah,
            tahun: tahun
        }
        console.log(body)
        Axios.post(urlpdf, body)
            .then(
                Axios.patch(urlUpdate, body)
                    .then(v => {
                        history('/spt');
                    })
                    .catch((err) => catchErr(err))
            )
            .catch((err) => catchErr(err));
    }

    React.useEffect(() => {
        // cekspt()
        loadData();
        loadDataKecamatan();
        // loadDataPerjadin()
        loadPegawai();
    }, []);

    return (
        <div>

            <EditSpt
                show={show}
                errorMessage={errorMessage}
                ready={ready}
                perihal={perihal}
                lokasi={lokasi}
                nomorSpt={nomorSpt}
                alamat={alamat}
                berangkatPerjadin={berangkatPerjadin}
                kembaliPerjadin={kembaliPerjadin}
                tahun={tahun}
                EditorHandler={EditorHandler}
                lamaPerjalanan={lamaPerjalanan}
                jenisPerjalanan={jenisPerjalanan}
                tanggalSpt={tanggalSpt}
                editorRef={editorRef}
                dasarSpt={dasarSpt}
                history={history}

                textPemberiPerintah={textPemberiPerintah}
                setTextPemberiPerintah={setTextPemberiPerintah}
                tanggalBerangkat={tanggalBerangkat}
                tanggalKembali={tanggalKembali}
                pemberiPerintah={pemberiPerintah}
                setPemberiPerintah={setPemberiPerintah}
                penerimaPerintah={penerimaPerintah}
                setPenerimaPerintah={setPenerimaPerintah}
                textPenerimaPerintah={textPenerimaPerintah}
                setTextPenerimaPerintah={setTextPenerimaPerintah}
                dataPegawai={dataPegawai}
                setDataPegawai={setDataPegawai}
                setTanggalSpt={setTanggalSpt}
                setNomorSpt={setNomorSpt}
                sugesstionPejabat={sugesstionPejabat}
                setSugesstionPejabat={setSugesstionPejabat}
                sugesstionPegawai={sugesstionPegawai}
                setSugesstionPegawai={setSugesstionPegawai}
                sugesstPegawaiHandler={sugesstPegawaiHandler}
                sugesstPejabatHandler={sugesstPejabatHandler}
                pejabatOnChangeHandler={pejabatOnChangeHandler}
                pegawaiOnChangeHandler={pegawaiOnChangeHandler}
                submitForm={submitForm}
                pemberiPerintahHandler={pemberiPerintahHandler}
                removeTags={removeTags}
            />
        </div>
    )
}

export default ControllerEditSpt
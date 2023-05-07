import Axios from "axios";
import moment from "moment-timezone";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CreateSpt from '../../page/admin/spt/create'


const ControllerCreateSpt = () => {

    const d = new Date();
    let year = d.getFullYear();
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [ready, setReady] = useState(true);

    const [perihal, setPerihal] = useState('')
    const [lokasi, setLokasi] = useState('')
    const [alamat, setAlamat] = useState('')
    const [tahun, setTahun] = useState('')
    const [berangkatPerjadin, setBerangkat] = useState('')
    const [kembaliPerjadin, setKembali] = useState('')
    const [lamaPerjalanan, setLamaPerjalanan] = useState('')
    const [jenisPerjalanan, setJenisPerjalanan] = useState('')


    const editorRef = useRef();
    const EditorHandler = (editor) => {
        console.log(editorRef.current)
        editorRef.current = editor
        console.log("editor: ", editor)
    }
    const history = useNavigate()
    const [kecamatan, setKecamatan] = useState([])
    const pathname = useLocation().pathname;
    const idPerjadin = pathname.replace("/spt/create/", "");
    const urlPerjadin = `${process.env.REACT_APP_URL_PERJADIN}/${idPerjadin}`;

    const loadDataKecamatan = () => {
        Axios.get('https://kanglerian.github.io/api-wilayah-indonesia/api/districts/3522.json').then((val) => {
            setKecamatan(val)
        }).catch(err => { catchErr(err) })
    }

    const setFormData = (values) => {
        setPerihal(values.perihal)
        setLokasi(values.lokasi)
        setAlamat(values.alamat)
        setTahun(values.tahun)
        const tglBerangkat = moment(values.tanggal_berangkat);
        const tglKembali = moment(values.tanggal_kembali);
        setBerangkat(tglBerangkat.tz("Asia/Jakarta").format("DD MMM YYYY"));
        setKembali(tglKembali.tz("Asia/Jakarta").format("DD MMM YYYY"));
        setJenisPerjalanan(values.jenis_perjadin)
    }

    const loadDataPerjadin = () => {
        Axios.get(urlPerjadin).then((value) => {
            setFormData(value.data.data)
            const berangkat = moment(value.tanggal_berangkat);
            const kembali = moment(value.tanggal_kembali);
            const lama = kembali.diff(berangkat);
            const duration = moment.duration(lama);
            const lamaPerjalanan = duration.days() + 1;
            setLamaPerjalanan(lamaPerjalanan)
            setReady(true);

        }).catch(err => catchErr(err))
    }

    React.useEffect(() => {
        // cekSPPD()
        loadDataKecamatan();
        loadDataPerjadin()
    }, []);

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


    return (
        <div>
            <CreateSpt
                show={show}
                errorMessage={errorMessage}
                ready={ready}
                perihal={perihal}
                lokasi={lokasi}
                alamat={alamat}
                berangkatPerjadin={berangkatPerjadin}
                kembaliPerjadin={kembaliPerjadin}
                tahun={tahun}
                EditorHandler={EditorHandler}
                lamaPerjalanan={lamaPerjalanan}
                jenisPerjalanan={jenisPerjalanan}
            />
        </div>
    )
}

export default ControllerCreateSpt
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Footr from '../../_partials/footer'
import NavMenu from '../../_partials/navbar'
import Axios from "axios";
import Tables from '../../_partials/tables'

const Perjadin = () => {
    const [data, setData] = useState([]);
    const getDataPerjadin = async () => {
        await Axios.get('http://localhost:5000/v1/perjadin?page=1&perPage=10').then(v => {
            console.log("value", v.data.data)
            setData(v.data.data);
        }).catch(e => { console.log(e) })
    }

    const header = ['Perihal', 'Lokasi', 'Alamat', 'Berangkat', 'Kembali', 'Jenis Perjalanan', 'Tahun']

    React.useEffect(() => {
        getDataPerjadin()
    }, [])


    return (
        <div>
            <NavMenu activeKey="/perjadin" />
            <Container fluid>
                <Tables data={data} header={header} title="Perjalanan Dinas" />
            </Container >
            <Footr />
        </div >
    )
}

export default Perjadin

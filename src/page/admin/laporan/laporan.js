import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Footr from '../../_partials/footer'
import NavMenu from '../../_partials/navbar'

const Laporan = () => {
    return (
        <div>
            <NavMenu activeKey="/laporan" />
            <Container className='p-3'>
                <Row>
                    <Col>
                        <p>halaman Laporan</p>
                    </Col>
                </Row>
            </Container>
            <Footr />
        </div>
    )
}

export default Laporan

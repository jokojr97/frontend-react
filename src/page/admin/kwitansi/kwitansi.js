import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Footr from '../../_partials/footer'
import NavMenu from '../../_partials/navbar'

const Kwitansi = () => {
    return (
        <div>
            <NavMenu activeKey="/kwitansi" />
            <Container className='p-3'>
                <Row>
                    <Col>
                        <p>halaman Kwitansi</p>
                    </Col>
                </Row>
            </Container>
            <Footr />
        </div>
    )
}

export default Kwitansi

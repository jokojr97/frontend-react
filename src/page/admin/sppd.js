import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Footr from '../_partials/footer'
import NavMenu from '../_partials/navbar'

const Sppd = () => {
    return (
        <div>
            <NavMenu activeKey="/sppd" />
            <Container className='p-3'>
                <Row>
                    <Col>
                        <p>halaman Sppd</p>
                    </Col>
                </Row>
            </Container>
            <Footr />
        </div>
    )
}

export default Sppd

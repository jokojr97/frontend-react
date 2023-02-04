import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Footr from '../_partials/footer'
import NavMenu from '../_partials/navbar'

const Perjadin = () => {
    return (
        <div>
            <NavMenu activeKey="/perjadin" />
            <Container className='p-3'>
                <Row>
                    <Col>
                        <p>halaman Perjadin</p>
                    </Col>
                </Row>
            </Container>
            <Footr />
        </div>
    )
}

export default Perjadin

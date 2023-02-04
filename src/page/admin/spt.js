import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Footr from '../_partials/footer'
import NavMenu from '../_partials/navbar'

const Spt = () => {
    return (
        <div>
            <NavMenu activeKey="/spt" />
            <Container className='p-3'>
                <Row>
                    <Col>
                        <p>halaman Spt</p>
                    </Col>
                </Row>
            </Container>
            <Footr />
        </div>
    )
}

export default Spt

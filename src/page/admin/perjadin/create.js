import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Footr from '../../_partials/footer'
import NavMenu from '../../_partials/navbar'

const CreatePerjadin = () => {
    return (
        <div>
            <NavMenu activeKey="/perjadin" />
            <Container>
                <Row>
                    <Col>
                        <p> Halaman Create Perjadin</p>
                    </Col>
                </Row>
            </Container>
            <Footr />
        </div>
    )
}

export default CreatePerjadin
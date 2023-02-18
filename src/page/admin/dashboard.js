import React, { useEffect, useState } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import Footr from '../_partials/footer'
import NavMenu from '../_partials/navbar'

const Dashboard = () => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const isMessage = localStorage.message != null;
    const messagevariant = localStorage.messageType != null;

    const setAlert = () => {
        if (isMessage) {
            setMessage(isMessage)
            setMessageType(messagevariant)
            setShow(true)
            localStorage.removeItem("message")
            localStorage.removeItem("messageType")
        }
    }

    useEffect(() => {
        setAlert()
        // setTimeout(() => {
        //     setShow(false)
        // }, 2000)
    })

    return (
        <div>
            <Container className='p-3'>
                <Row>
                    <Col>
                        {(!show ? '' :
                            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                                <p><b>Anda Berhasil Login!</b></p>
                            </Alert>
                        )}
                        <p>halaman Dashboard</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Dashboard

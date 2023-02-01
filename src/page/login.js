import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import { Alert, Col, Container, Row } from 'react-bootstrap';


const Login = props => {
    const [show, setShow] = useState(false);
    const [showPass, setShowPassword] = useState('password');
    const changeShowPassword = () => {
        (showPass == 'password') ? setShowPassword('text') : setShowPassword('password');
    }
    return <div> {
        <Container>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>

                    <MDBContainer className='my-5'>
                        <MDBCard>
                            <MDBRow className='g-0 d-flex align-items-center p-3'>

                                <MDBCol md='4'>
                                    <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
                                </MDBCol>

                                <MDBCol md='8'>
                                    <MDBCardBody style={{ padding: "40px" }}>

                                        {(!show ? '' :
                                            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                                <p>
                                                    Error Description
                                                </p>
                                            </Alert>
                                        )}
                                        <h6 className='mb-3'>Login Form</h6>
                                        <MDBInput wrapperClass='mb-4' placeholder='Email address' id='form1' type='email' />
                                        <MDBInput wrapperClass='mb-4' placeholder='Password' id='form2' type={showPass} />

                                        <div className="d-flex justify-content-between">
                                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Show Password' onChange={() => {
                                                changeShowPassword();
                                            }} />
                                            <a href="!#">Forgot password?</a>
                                        </div>
                                        <MDBBtn className="mb-4 w-100 mt-3">Sign in</MDBBtn>

                                    </MDBCardBody>

                                </MDBCol>

                            </MDBRow>

                        </MDBCard>
                    </MDBContainer>
                </Col>
            </Row>
        </Container>
    }</div>
}

export default Login

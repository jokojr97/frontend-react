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

import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';


const Login = props => {
    const [show, setShow] = useState(false);
    const [showPass, setShowPassword] = useState('password');
    const navigate = useNavigate()

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setError] = React.useState('');

    const changeShowPassword = () => {
        (showPass == 'password') ? setShowPassword('text') : setShowPassword('password');
    }

    const testLogin = (e) => {
        e.preventDefault();
        console.log("login cuy!")
        console.log("email: ", email)
        console.log("password: ", password)
        const body = {
            "email": email,
            "password": password
        };
        Axios.post('http://localhost:4000/v1/auth/login', body)
            .then(result => {
                const responseAPI = result.data;
                console.log("data: ", result.data);
                console.log("status: ", result.status);
                const isLogin = localStorage.setItem("isLogin",);
                console.log("is login: ", localStorage.isLogin);

            })
            .catch(err => {
                // setError(err.response.data.message);

                console.log("err: ", err);
                (err.response.data) ? setError(err.response.data.message) : setError(err.message);

                console.log("err: ", errorMessage);
                setShow(true);
            })

        console.log("login");
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
                                        <Form onSubmit={testLogin}>
                                            {(!show ? '' :
                                                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                                    <p>
                                                        {errorMessage}
                                                    </p>
                                                </Alert>
                                            )}
                                            <h6 className='mb-3'>Login Form</h6>
                                            <MDBInput wrapperClass='mb-4' placeholder='Email address' id='form1' type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                            <MDBInput wrapperClass='mb-4' placeholder='Password' id='form2' type={showPass} value={password} onChange={(e) => { setPassword(e.target.value) }} />

                                            <div className="d-flex justify-content-between">
                                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Show Password' onChange={() => {
                                                    changeShowPassword();
                                                }} />
                                                <a href="!#">Forgot password?</a>
                                            </div>
                                            <Button type='submit' className="mb-4 w-100 mt-3" >Sign in</Button>
                                        </Form>
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

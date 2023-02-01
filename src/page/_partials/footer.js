import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footr = () => {
    return (
        <Container fluid className="bg-dark text-white ">
            <Row>
                <Col>
                    <center className="mt-3 mb-3"><p>Copyright 2022 by Joko Riyadi</p></center>
                </Col>
            </Row>
        </Container>
    );
}

export default Footr
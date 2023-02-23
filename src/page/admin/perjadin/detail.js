import Axios from "axios";
import React, { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DetailPerjadin = props => {

  return (
    <div>
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            {!props.show ? (
              ""
            ) : (
              <Alert
                variant="danger"
                onClose={() => props.setShow(false)}
                dismissible
              >
                <p>{props.errorMessage}</p>
              </Alert>
            )}
            <h4 style={{ marginTop: "10px" }}>Detail Perjalanan Dinas</h4>
            <hr />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailPerjadin;

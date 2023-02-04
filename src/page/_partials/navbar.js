import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const NavMenu = props => {

    const logout = () => {
        var confirmLogout = window.confirm("Apakah anda yakin akan logout?")
        console.log("confirm: ", confirmLogout);
        confirmLogout && localStorage.clear();
        <Navigate to="/login" />
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="sticky-top">
            <Container>
                <Navbar.Brand href="/"><b>E-PERJADIN</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav defaultActiveKey={props.activeKey}>
                        <Nav.Link href="/">Dashboard</Nav.Link>
                        <Nav.Link href="/perjadin">Perjalanan Dinas</Nav.Link>
                        <Nav.Link href="/spt">SPT</Nav.Link>
                        <Nav.Link href="/sppd">SPPD</Nav.Link>
                        <Nav.Link href="/laporan">Laporan</Nav.Link>
                        <Nav.Link href="/kwitansi">Kwitansi</Nav.Link>
                        <Nav.Link onClick={logout}><Button variant="outline-light" size="sm">Logout!</Button> </Nav.Link>
                        {/* <NavDropdown title="About Me" id="collasible-nav-dropdown" variant="dark">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavMenu
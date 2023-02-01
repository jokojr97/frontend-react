import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavMenu = props => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/"><b>JOKORIYADI</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav defaultActiveKey={props.activeKey}>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/portofolio">Portofolio</Nav.Link>
                        <Nav.Link href="/blog">Blog</Nav.Link>
                        <Nav.Link href="/about">About Me</Nav.Link>
                        <Nav.Link href="/contact"><Button variant="outline-light" size="sm">Contact Me!</Button> </Nav.Link>
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
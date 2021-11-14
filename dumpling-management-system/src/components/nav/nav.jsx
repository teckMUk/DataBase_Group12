import React from 'react';
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import "./nav.css";

export default function Nav2()
{
    return (
        <div className= 'box'>
           <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Dumpling</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Profile</Nav.Link>
                        <NavDropdown title="Settings" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/create_account"> Create Account </NavDropdown.Item>
                        <NavDropdown.Item href="/create_account">Reset Password</NavDropdown.Item>
                        <NavDropdown.Item href="#action5">
                            View Sales
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <NavDropdown title="Logout" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Logout</NavDropdown.Item>
                      
                        </NavDropdown>
                    
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}
import React from 'react';
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import "./nav.css";
import {useLocation} from "react-router-dom";


export default function Nav2()
{
    const search = useLocation().search;
    const role = new URLSearchParams(search).get('role');

    const isAdmin = (role) =>{
            console.log('rol is ', role);
            if(role.toLowerCase() === 'admin')
            {
                console.log('tru');
                return true;
            }
            else{
                console.log('false');
                return false;
            }
            
    }
    const Logout2 = () =>
    {
        if(localStorage.getItem("dumplingUserId"))
        {
            localStorage.removeItem("dumplingUserId");
        }
    }
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
                        navbarScroll >
                            
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Profile</Nav.Link>
                        <NavDropdown title="Settings" id="navbarScrollingDropdown">
                        {isAdmin(role) &&
                        <div> 
                            <NavDropdown.Item href="/create_account"> Create Account </NavDropdown.Item>
                            <NavDropdown.Item href="/email"> Update Account </NavDropdown.Item>
                            <NavDropdown.Item href="/create_account"> Delete Account </NavDropdown.Item>
                        </div>
                        }
                        <NavDropdown.Item href="/resetpw">Reset Password</NavDropdown.Item>
                        <NavDropdown.Item href="#action5">
                            View Sales
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <NavDropdown title="Logout" id="navbarScrollingDropdown"> 
                        <NavDropdown.Item href="/" onClick = {Logout2}>Logout</NavDropdown.Item>
                      
                        </NavDropdown>
                    
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}
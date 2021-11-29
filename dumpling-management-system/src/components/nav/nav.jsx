import React from 'react';
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import "./nav.css";
import {useLocation} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { getEmployeeDetails } from '../../Services_API/api';

export default function Nav2()
{
    const search = useLocation().search;
    const role = new URLSearchParams(search).get('role');
    let navigate = useNavigate();
    const isAdmin = (role) =>{
            if(role === null)
            {
                let x = localStorage.getItem('empRole');
                if(x == null)
                {
                    navigate('/');
                }
                else{
                    role = x;
                }
               
            }

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

    const isManager= (role) =>{
        if(role === null)
        {
            let x = localStorage.getItem('empRole');
            if(x == null)
            {
                navigate('/');
            }
            else{
                role = x;
            }
           
        }

        if(role.toLowerCase() === 'manager')
        {
            console.log('tru');
            return true;
        }
        else{
            console.log('false');
            return false;
        }
    }

    const isCashier= (role) =>{
        if(role === null)
        {
            let x = localStorage.getItem('empRole');
            if(x == null)
            {
                navigate('/');
            }
            else{
                role = x;
            }
           
        }

        if(role.toLowerCase() === 'cashier')
        {
            //tells if chef
            console.log('tru');
            return true;
        }
        else{
            //is cashier
            console.log('false');
            return false;
        }
}

const isChef= (role) =>{
    if(role === null)
    {
        let x = localStorage.getItem('empRole');
        if(x == null)
        {
            navigate('/');
        }
        else{
            role = x;
        }
       
    }

    if(role.toLowerCase() === 'chef')
    {
        //tells if chef
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
    const getDetails = (e) =>
    {
        e.preventDefault();
        getEmployeeDetails().then((response)=>
        {
            console.log(response);
           if(response.data.isSuccesful) 
           {
                navigate('/updateDelEmp',{state:{employeeDetails:response.data.employeeDetails}});
           }
           else
           {
               alert(response.data.message);
           }
        });
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
                       
                        { 
                        isAdmin(role) &&
                        <div> 
                            <NavDropdown.Item href="/create_account"> Create Account </NavDropdown.Item>
                            <NavDropdown.Item  onClick={getDetails}> View Employee Details </NavDropdown.Item>
                            <NavDropdown.Item href='/addToMenu'>Add to Menu</NavDropdown.Item> 
                            <NavDropdown.Item href='/placeOrder'>Place Order</NavDropdown.Item> 
                            <NavDropdown.Item href='/updateSalaryOfEmployees'>Update Salary</NavDropdown.Item>
                            <NavDropdown.Item href='/giveBonuses'>Give Bonus</NavDropdown.Item>
                        </div>
                        }

                        {//is chef
                            isChef(role)&& <div>
                                <NavDropdown.Item href='/addToMenu'>Add to Menu</NavDropdown.Item> 
                            </div>
                        }

                        {// is cashier
                            isCashier(role)&& <div> 
                                <NavDropdown.Item href='/placeOrder'>Place Order</NavDropdown.Item> 
                            </div>
                        }

                        {
                            isManager(role) && <div> 
                                <NavDropdown.Item href='/updateSalaryOfEmployees'>Update Salary</NavDropdown.Item>
                                <NavDropdown.Item href='/giveBonuses'>Give Bonus</NavDropdown.Item>
                            </div>
                        }

                        <NavDropdown.Item href="/resetpw">Reset Password</NavDropdown.Item>
                       
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
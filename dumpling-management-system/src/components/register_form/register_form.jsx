import "./register_form.css";
import React from "react";
import {Container, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
//import  {Link} from 'react-router-dom';
import {createAccount} from  '../../Services_API/api.js';
import {useNavigate} from 'react-router-dom';

const initialState = {
    name: "",
    accountType: "",
    email: "",
    status: "",
    address: "",
    pw: "",
    cpw: "",
    bd: "",
    num : "",
    bankAccount: "",
    salary : "",
    employeeName: "",
    security1: "",
    security2: "",
    ans1: "",
    ans2: ""
  };

const errorCheck = {
    moreThanMin : false,
    hasUpper: false,
    hasNum: false,
    lessThanMax: false,
    confirmPw : false,
    
};

export default function RegisterForm()
{
    const [newEmploye, setNewEmploye] = useState(initialState);
    const [newEmployeErr, setNewEmployeErr] = useState(errorCheck);

    useEffect(() => {}, [newEmploye]);

    let navigate = useNavigate();
    const handle = e => {
        const {name, value} = e.target;
        setNewEmploye({...newEmploye, [name]: value});
        
        if(name === "pw")
        {
            let moreThanMin = false;
            let hasUpper= false;
            let hasNum = false;
            let lessThanMax = false;
    
            if(value.length > 5)
            {
              moreThanMin = true
            }

            if(value.length < 20)
            {
                lessThanMax = true
            }

            if(/[A-Z]/.test(value) === true)
            {
                hasUpper = true
            }

            if(/[0-9]/.test(value) === true)
            {
               hasNum = true
            }

            setNewEmployeErr({...newEmployeErr, moreThanMin: moreThanMin, hasUpper: hasUpper, hasNum: hasNum, lessThanMax:lessThanMax,});
            console.log(newEmployeErr);
        }

        if (name === "cpw") {

            if(newEmploye.pw === value){

            setNewEmployeErr({...newEmployeErr, confirmPw: true });
            }
          }

    }

    const submitHandle = e => {
        e.preventDefault();
        console.log(newEmploye);
      
    }

    const onCreate = (e) =>{
        e.preventDefault();
        let obj = {}
        obj[newEmploye.security1] = newEmploye.ans1;
        obj[newEmploye.security2] = newEmploye.ans2;
       
        console.log('obj is ',obj);
        createAccount(newEmploye.name, newEmploye.accountType, newEmploye.cpw, newEmploye.email, obj, 
            newEmploye.employeeName, newEmploye.bd, 
            newEmploye.num, newEmploye.address, newEmploye.status, newEmploye.salary,newEmploye.bankAccount).then((response)=>{

                if(response.data.isSuccessful)
                {
                    alert(response.data.message);
                    navigate('/dashboard');
                }
                else{
                    alert(response.data.message);
                    navigate('/dashboard');
                }

        }); 

    }


    return(
               <Container id="main-container" className="d-grid h-100">
                   <Form className= 'text-center' onSubmit= {submitHandle}>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" name = 'name'
                             value = {newEmploye.name} onChange = {handle}/>
                        </Form.Group>

                        <div onChange={handle}>  
                               <p>Select Account Type</p>
                            <p><input type="radio" value="chef" name="accountType" /> Chef</p>
                            <p><input type="radio" value="manager" name="accountType" /> Manager</p>
                            <p><input type="radio" value="cashier" name="accountType" /> Cashier</p>

                        </div>

                        <Form.Group className="mb-3" controlId="formBasicPos">
                            <Form.Label>Employee Position</Form.Label>
                            <Form.Control type="text" placeholder="Employee position" name = 'status' 
                            value = {newEmploye.status} onChange = {handle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmpName">
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control type="text" placeholder="Employee name" name = 'employeeName' 
                            value = {newEmploye.employeeName} onChange = {handle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicNum">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" placeholder="number" name = 'num' 
                            value = {newEmploye.num} onChange = {handle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicNumSal">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type="text" placeholder="number" name = 'salary' 
                            value = {newEmploye.salary} onChange = {handle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicNumAccount">
                            <Form.Label>Bank account Number</Form.Label>
                            <Form.Control type="text" placeholder="number" name = 'bankAccount' 
                            value = {newEmploye.bankAccount} onChange = {handle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" name = 'email'  
                            value = {newEmploye.email} onChange = {handle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="Date" placeholder="mm-dd-yy" name = 'bd'  
                            value = {newEmploye.bd} onChange = {handle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter address" name = 'address'  
                            value = {newEmploye.address} onChange = {handle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicQuestion1">
                            <Form.Label>Enter Question one: </Form.Label>
                            <Form.Control type="text" placeholder="Enter question" name = 'security1'
                             value = {newEmploye.security1} onChange = {handle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicAns1">
                            <Form.Label>Enter Ansewr one: </Form.Label>
                            <Form.Control type="text" placeholder="Enter ans" name = 'ans1'
                             value = {newEmploye.ans1} onChange = {handle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicQuestion2">
                            <Form.Label>Enter Question two: </Form.Label>
                            <Form.Control type="text" placeholder="Enter question" name = 'security2'
                             value = {newEmploye.security2} onChange = {handle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicAns2">
                            <Form.Label>Enter Ansewr two: </Form.Label>
                            <Form.Control type="text" placeholder="Enter ans" name = 'ans2'
                             value = {newEmploye.ans2} onChange = {handle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Set Default Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name = 'pw'  
                            value = {newEmploye.pw} onChange = {handle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPasswordc">
                            <Form.Label>Enter Password Again</Form.Label>
                            <Form.Control type="password" placeholder="Password" name = 'cpw'  
                            value = {newEmploye.cpw} onChange = {handle}/>
                        </Form.Group>
                        <Form.Text>
                            {!newEmployeErr.confirmPw ? (<div className = "text-danger" > passwords don't match!</div>) : (<div></div>)}

                        </Form.Text>

                            <ul className="mb-4">
                            <li className= {newEmployeErr.moreThanMin?  "text-success": "text-danger"}>Min 5 characters</li>
                            <li className= {newEmployeErr.lessThanMax?  "text-success": "text-danger"}>Max 10 characters</li>
                            <li className= {newEmployeErr.hasNum?  "text-success": "text-danger"}>At least one number</li>
                            <li className= {newEmployeErr.hasUpper ?  "text-success": "text-danger"}>At least one upper case number</li>
                           
                         </ul>

                        <Button variant="primary" type="submit" disabled = {Object.values(newEmployeErr).includes(false)} 
                        onClick= {onCreate}>
                            Create Account
                        </Button>


                   </Form>
                      

               </Container>

            
    )
}
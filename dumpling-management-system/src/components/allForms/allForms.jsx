import React from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from "react";

const initialState = {
    pw: "",
    cpw: "",
    security: ["", ""],
  };

const errorCheck = {
    moreThanMin : false,
    hasUpper: false,
    hasNum: false,
    lessThanMax: false,
    confirmPw : false,
};

export default function Forms()
{
    const [newEmploye, setNewEmploye] = useState(initialState);
    const [newEmployeErr, setNewEmployeErr] = useState(errorCheck);

    useEffect(() => {}, [newEmploye]);

    
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

    const ForgetPass = () =>{

        //let arr =["How old are you?", "when were you born"];
       return(

            <Container>
                <Form onSubmit= {submitHandle}>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>How old are you? </Form.Label>
                    <Form.Control type="text" placeholder="Enter Answer" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>sec question? </Form.Label>
                    <Form.Control type="text" placeholder="Enter Answer" />
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

            <Button variant="primary" type="submit" href="/">
                Submit
            </Button>

            </Form>
                        

             </Container>
    
       );
    }
    return (
      
            <>  
            <ForgetPass/>
            </>
      
    )
}
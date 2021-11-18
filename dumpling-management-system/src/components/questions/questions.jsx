import React from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {validateSecurity} from '../../Services_API/api';



const initialState = {
   
    security1: "",
    security2: "",
  };
  
  export default function Questions() {
    let navigate = useNavigate();

    const [newEmploye, setNewEmploye] = useState(initialState);
    let securityQuestion = JSON.parse(localStorage.getItem("Securityquestion"));
    if( securityQuestion === null)
    {
        console.log('redirecting to login page');
        navigate('/')
    }

    let email = localStorage.getItem("emailForgetPw");
  
     useEffect(() => {}, [newEmploye]);

     const handle = e => {
        const {name, value} = e.target;
        setNewEmploye({...newEmploye, [name]: value});
        console.log(newEmploye);
     }

    const onVal = e => {
        e.preventDefault();
        
        validateSecurity(email, newEmploye.security1, newEmploye.security2).then((response) => {
            console.log(response.data);
            if(response.data.isSuccessful)
            {
                
                navigate("/allForms");
               
            }
            else{
                alert(response.data.message);
                localStorage.removeItem("Securityquestion");
                navigate("/");
            }


        });

      
    }


    //let arr =["How old are you?", "when were you born"];
   return(

        <Container>
          
            <Form>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>{securityQuestion[0]}</Form.Label>
                    <Form.Control type="text" placeholder="Enter Answer" name = 'security1' 
                    value = {newEmploye.security1} onChange = {handle}  
                    /> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>{securityQuestion[1]}</Form.Label>
                    <Form.Control type="text" placeholder="Enter Answer" name = 'security2'  
                    value = {newEmploye.security2} onChange = {handle}/>
                </Form.Group>
            
            </Form>
            <Button variant="primary" type="submit" disabled = {false} onClick= {onVal}>
                Submit
            </Button>

        </Container>
            
    )
    }
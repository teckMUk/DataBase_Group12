import React from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';



const initialState = {
   
    security1: "",
    security2: "",
  };

  export default function Questions() {
    let navigate = useNavigate();
    const [newEmploye, setNewEmploye] = useState(initialState);
  
     useEffect(() => {}, [newEmploye]);

     const handle = e => {
        const {name, value} = e.target;
        setNewEmploye({...newEmploye, [name]: value});
        console.log(newEmploye);
     }

    const submitHandle = e => {
        e.preventDefault();
       navigate("/allforms");
      
    }


    //let arr =["How old are you?", "when were you born"];
   return(

        <Container>
          
            <Form onSubmit= {submitHandle}>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>How old are you? </Form.Label>
                    <Form.Control type="text" placeholder="Enter Answer" name = 'security1' 
                    value = {newEmploye.security1} onChange = {handle}  
                    /> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>sec question? </Form.Label>
                    <Form.Control type="text" placeholder="Enter Answer" name = 'security2'  
                    value = {newEmploye.security2} onChange = {handle}/>
                </Form.Group>
            
            </Form>
            <Button variant="primary" type="submit" disabled = {false} >
                Submit
            </Button>

        </Container>
            
    )
    }
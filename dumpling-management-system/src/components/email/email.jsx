import React from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from "react";

const initialState = {
   
    email: "",
  };


export default function Forms()
{
    const [newEmploye, setNewEmploye] = useState(initialState);

    useEffect(() => {}, [newEmploye]);
    const handle = e => {
        const {name, value} = e.target;
        setNewEmploye({...newEmploye, [name]: value});
    }

    const submitHandle = e => {
        e.preventDefault();
        console.log(newEmploye);
      
    }

    return (
      
        <Container>
        <Form onSubmit= {submitHandle}>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" name = 'email'
                        value = {newEmploye.email} onChange = {handle}/>
            </Form.Group>

            <Button variant="primary" type="submit" href = "/allForms"> 
                Submit
            </Button>
        </Form>
        </Container>

    )
}
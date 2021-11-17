import React from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import {accountExistence} from '../../Services_API/api';
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
    const onValidateEmail = (e) =>
    {
        e.preventDefault();
        accountExistence(newEmploye.email).then((Response)=>
        {
            console.log(Response.data.isSuccessful);
            if(Response.data.isSuccessful)
            {
                console.log(Response.data);
            }
            else
            {
                console.log(Response.data.message);
            }
        });
        
    }

    return (
      
        <Container>
        <Form onSubmit= {submitHandle}>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" name = 'email'
                        value = {newEmploye.email} onChange = {handle}/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={onValidateEmail}> 
                Submit
            </Button>
        </Form>
        </Container>

    )
}
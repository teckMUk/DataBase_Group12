import React from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import {securityQuestions} from '../../Services_API/api';
import {useNavigate} from 'react-router-dom';
//import {useLocation} from "react-router-dom";

const initialState = {
   
    email: "",
  };


export default function Forms()
{
   
    let navigate = useNavigate();
    const [newEmploye, setNewEmploye] = useState(initialState);


    useEffect(() => {}, [newEmploye]);
    const handle = e => {
        const {name, value} = e.target;
        setNewEmploye({...newEmploye, [name]: value});
    }

    const submitHandle = e => {
        e.preventDefault();
      
    }

    const onValidateEmail = (e) =>
    {
        
        e.preventDefault();
        securityQuestions(newEmploye.email).then((Response)=>
        {
            console.log(Response.data.isSuccessful);
            if(Response.data.isSuccessful)
            {
                console.log(Response.data.questions);
                localStorage.setItem("Securityquestion",JSON.stringify(Response.data.questions));
                localStorage.setItem("emailForgetPw",newEmploye.email);
                navigate("/questions")
            }
            else
            {
                alert(Response.data.message);
                console.log(Response.data.message);
            }
        });
    }
    ////checking  the page of email address
    // const location = useLocation();
    // const {page} = location.state;

    // const checkPage = (page)=>
    // {
    //     if(page === "forgetPw")
    //     {
    //         onValidateEmail();
    //     }
    // }
   
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
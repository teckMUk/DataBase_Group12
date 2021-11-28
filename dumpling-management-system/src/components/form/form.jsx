import './form.css';
import {Container, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import { LogIn } from '../../Services_API/api';
import {useNavigate} from 'react-router-dom';
const initialState = {
   
    email: "",
    pw: "",
    
  };

export default function FormLogin()
{
    let navigate = useNavigate();
    const [newEmploye, setNewEmploye] = useState(initialState);
    useEffect(() => {}, [newEmploye]);

    const handle = e => {
        e.preventDefault();
        const {name, value} = e.target;
        setNewEmploye({...newEmploye, [name]: value});
      
     
       
    }
    
    const onLogin = (e) =>{
        e.preventDefault();
        LogIn(newEmploye.email,newEmploye.pw ).then( (response) =>
        {
            
            console.log(response.data.isSuccessful);
            if(response.data.isSuccessful)
            {
                console.log(response.data.message);                
                localStorage.setItem('dumplingUserId',response.data.Id);
                localStorage.setItem('empRole',response.data.role);
                alert(response.data.message);
                console.log(localStorage.getItem('dumplingUserId'));
                navigate("/dashboard");
            }
            else
            {
                alert(response.data.message);
                console.log(response.data.message);
            }
        });

        

    }
    
    
    // diable submit button if the pw and email dont match from api call
    
    return (
       
        <Container >
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" name = 'email'
                value = {newEmploye.email} onChange = {handle}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name = 'pw' 
                    value = {newEmploye.pw} onChange = {handle}/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick = {onLogin} disabled = {false}>
                            Login
             </Button>


        </Form> 
    </Container>
      
    )
}
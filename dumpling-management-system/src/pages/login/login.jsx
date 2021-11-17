import React from 'react';
import "./login.css";
import Form from '../../components/form/form';
import Header from '../../components/header/header';
import {Link} from "react-router-dom";
// import Form2 from "../../components/allForms/allForms";
// import {Button} from "react-bootstrap";
// <div > <Link to = '/allForms'> Forgot Password? </Link> </div>

export default function Login()
{
    return (
        <>
            <Header/>
            <Form/>
            <div > <Link to = '/email'> Forgot Password? </Link> </div>
        </>
    )
}
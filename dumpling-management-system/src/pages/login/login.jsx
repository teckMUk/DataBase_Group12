import React from 'react';
import "./login.css";
import Form from '../../components/form/form';
import Header from '../../components/header/header';
import {Link} from "react-router-dom";


export default function Login()
{
    return (
        <>
            <Header/>
            <Form/>
            <div > <Link to = {{pathname: '/email', state: {page: "forgetPw"}}}> Forgot Password? </Link> </div>
        </>
    )
}
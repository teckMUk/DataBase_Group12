import "./addCoupon.css";

import React from "react";

import {Container, Form, Button} from 'react-bootstrap';

import { useState, useEffect } from "react";

import {addCoupon} from  '../../Services_API/api.js';

import {useNavigate} from 'react-router-dom';

const initialState = {

    couponId: "",
    couponName: "",
    discount:"",
    issueDate: "",
    expiryDate: "",
    
  };

 

  export default function AddCouponTwo()

{

    const [newCoupon, setNewCoupon] = useState(initialState);
    useEffect(() => {}, [newCoupon]);
    let navigate = useNavigate();
    const handle = e =>{

        const {name, value} = e.target;

        setNewCoupon({...newCoupon, [name]: value});

 

    }

 

    const submitHandle = e => {

        e.preventDefault();

        console.log(newCoupon);

     

    }

 

    const onCreate = (e) =>{

        e.preventDefault();

       

        addCoupon(newCoupon.couponId,newCoupon.couponName, newCoupon.discount, newCoupon.issueDate, newCoupon.expiryDate).then((response)=>{

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

                            <Form.Label>Coupon Id</Form.Label>

                            <Form.Control type="text" placeholder="Enter Coupon ID" name = 'couponId'

                             value = {newCoupon.couponId} onChange = {handle}/>

                        </Form.Group>

 

                        <Form.Group className="mb-3" controlId="formBasicName">

                            <Form.Label>Coupon Name</Form.Label>

                            <Form.Control type="text" placeholder="Enter Coupon Name" name = 'couponName'

                             value = {newCoupon.couponName} onChange = {handle}/>

                        </Form.Group>

 

                        <Form.Group className="mb-3" controlId="formBasicName">

                            <Form.Label>Discount</Form.Label>

                            <Form.Control type="text" placeholder="Enter Discount" name = 'discount'

                             value = {newCoupon.discount} onChange = {handle}/>

                        </Form.Group>

 

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Issue Date</Form.Label>

                            <Form.Control type="Date" placeholder="mm-dd-yy" name = 'issueDate'

                             value = {newCoupon.issueDate} onChange = {handle}/>

                        </Form.Group>

 
                        <Form.Group className="mb-3" controlId="formBasicName">

                            <Form.Label>Expiry Date</Form.Label>

                            <Form.Control type="Date" placeholder="mm-dd-yy" name = 'expiryDate'

                             value = {newCoupon.expiryDate} onChange = {handle}/>

                        </Form.Group>
 

                        <Button variant="primary" type="submit"

                        onClick= {onCreate}>

                            Add Coupon

                        </Button>

                   </Form>

                     
               </Container>

       

 

    )

   

 

}

 

 
import "./add_to_menu_form.css";

import React from "react";

import {Container, Form, Button} from 'react-bootstrap';

import { useState, useEffect } from "react";

import {addMenuItem} from  '../../Services_API/api.js';

import {useNavigate} from 'react-router-dom';

 

const initialState = {

    dishName: "",

    dishType: "",

    dishPrice:"",

    preparationTime: "",

    calories: "",

    dishOfday: "0",

    allergens: "",

    image: "",

   

  };

 

  export default function AddMenu()

{

    const [newDish, setNewDish] = useState(initialState);

   

    useEffect(() => {}, [newDish]);

 

    let navigate = useNavigate();

 

    const handle = e =>{

        const {name, value} = e.target;

        setNewDish({...newDish, [name]: value});

 

    }

 

    const submitHandle = e => {

        e.preventDefault();

        console.log(newDish);

     

    }

 

    const onCreate = (e) =>{

        e.preventDefault();

       

       

        addMenuItem(newDish.dishName, newDish.dishType,newDish.dishPrice,newDish.preparationTime, newDish.calories,

            newDish.dishOfday, newDish.allergens,

            newDish.image).then((response)=>{

 

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

                            <Form.Label>Dish Name</Form.Label>

                            <Form.Control type="text" placeholder="Enter Dish Name" name = 'dishName'

                             value = {newDish.dishName} onChange = {handle}/>

                        </Form.Group>

 

                        <Form.Group className="mb-3" controlId="formBasicName">

                            <Form.Label>Dish Type</Form.Label>

                            <Form.Control type="text" placeholder="Enter Dish Type" name = 'dishType'

                             value = {newDish.dishType} onChange = {handle}/>

                        </Form.Group>

 

                        <Form.Group className="mb-3" controlId="formBasicName">

                            <Form.Label>Dish Price</Form.Label>

                            <Form.Control type="text" placeholder="Enter Dish Price" name = 'dishPrice'

                             value = {newDish.dishPrice} onChange = {handle}/>

                        </Form.Group>

 

                        <Form.Group className="mb-3" controlId="formBasicName">

                            <Form.Label>Preparation Time</Form.Label>

                            <Form.Control type="text" placeholder="Enter Preparation Time" name = 'preparationTime'

                             value = {newDish.preparationTime} onChange = {handle}/>

                        </Form.Group>

 

                        <Form.Group className="mb-3" controlId="formBasicName">

                            <Form.Label>Calories</Form.Label>

                            <Form.Control type="text" placeholder="Enter Calories" name = 'calories'

                             value = {newDish.calories} onChange = {handle}/>

                        </Form.Group>

 

                        <Form.Group className="mb-3" controlId="formBasicName">

                            <Form.Label>Allergens</Form.Label>

                            <Form.Control type="text" placeholder="Enter Allergens" name = 'allergens'

                             value = {newDish.allergens} onChange = {handle}/>

                        </Form.Group>

 

                        <Form.Group className="mb-3" controlId="formBasicName">

                            <Form.Label>Image</Form.Label>

                            <Form.Control type="text" placeholder="Enter Image URL" name = 'image'

                             value = {newDish.image} onChange = {handle}/>

                        </Form.Group>

 

                        <Button variant="primary" type="submit"

                        onClick= {onCreate}>

                            Add Dish

                        </Button>

                       

                   </Form>

                     

 

               </Container>

       

 

    )

   

 

}

 

 
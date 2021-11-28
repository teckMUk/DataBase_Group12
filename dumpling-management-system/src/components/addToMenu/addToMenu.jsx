import React from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import {addMenuItem} from  '../../Services_API/api.js';
import {useNavigate} from 'react-router-dom';

const AddToMenu = () =>{
    const [dishAddition, setdishAddition] = useState({
        dishName = "",
        dishType = "",
        preparationTime = "",
        calories = "",
        dishOfday = "",
        allergens = "",
        image = "",


    }

    );

    const handleInput = (e) =>{
        const name = e.target.name
        const value = e.target.value
        

    }

    return(
        <>
        <div>
            <label htmlFor="DishName"> Dish Name </label>
            <input type = "text" autoComplete = "off" name = "DishName" id = "DishName" onChange = {handleInput} value = {dishAddition.dishName} > </input>

            
        </div>



        </>
    )

}



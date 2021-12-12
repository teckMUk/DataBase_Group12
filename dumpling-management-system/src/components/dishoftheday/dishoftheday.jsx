import React from 'react';
<<<<<<< HEAD

import { useState, useEffect } from "react";

import {Table,Button} from 'react-bootstrap';

import {fetchDishIds,dishOfTheDay} from '../../Services_API/api';



export default function DishOfday (){

    const [dishoftheday,setdishoftheday] = useState();

    useEffect(()=>{

        fetchDishIds().then((response)=>{

            console.log(response);

            setdishoftheday(response.data.result);

        })

    },[]);

    const setDish =(dishId)=>{



        dishOfTheDay(dishId).then((response)=>{

            if(response.data.isSuccessful)

            {

                alert(response.data.message);

                window.location.reload();



            }

            else

            {

                alert(response.data.message);

                window.location.reload();



            }

        });



    }

    return(

        <div id="tableDiv">

        <Table striped bordered hover variant="dark">

        <thead>

            <tr>

            <th>Dish Id</th>

            <th>Dish Name</th>

            <th></th>

            </tr>

        </thead>

        {dishoftheday ? dishoftheday.map((dish,i)=>

        {

            return(

                <tbody key={i}>

                <tr>

                <td style={{color:dish.isActive?"green":"white"}}>{dish.dishId}</td>

                <td style={{color:dish.isActive?"green":"white"}}>{dish.dishName}</td>

                <td><Button style={{color:"black","background":"white"}} onClick={()=>setDish(dish.dishId)}>Set As dish Of the day</Button></td>

                </tr>

            </tbody>

            )



        }):null

        }

        </Table>

    </div>

    )

=======
import { useState, useEffect } from "react";
import {Table,Button} from 'react-bootstrap';
import {fetchDishIds,dishOfTheDay} from '../../Services_API/api';

export default function DishOfday (){
    const [dishoftheday,setdishoftheday] = useState();
    useEffect(()=>{
        fetchDishIds().then((response)=>{
            console.log(response);
            setdishoftheday(response.data.result);
        })
    },[]);
    const setDish =(dishId)=>{

        dishOfTheDay(dishId).then((response)=>{
            if(response.data.isSuccessful)
            {
                alert(response.data.message);
                window.location.reload();
                
            }
            else
            {
                alert(response.data.message);
                window.location.reload();

            }
        });

    }
    return(
        <div id="tableDiv">
        <Table striped bordered hover variant="dark">
        <thead>
            <tr>
            <th>Dish Id</th>
            <th>Dish Name</th>
            <th></th>
            </tr>
        </thead>
        {dishoftheday ? dishoftheday.map((dish,i)=>
        {
            return(
                <tbody key={i}>
                <tr>
                <td style={{color:dish.isActive?"green":"white"}}>{dish.dishId}</td>
                <td style={{color:dish.isActive?"green":"white"}}>{dish.dishName}</td>
                <td><Button style={{color:"black","background":"white"}} onClick={()=>setDish(dish.dishId)}>Set As dish Of the day</Button></td>
                </tr>
            </tbody>
            )
            
        }):null
        }
        </Table>
    </div>
    )
>>>>>>> dbe5d44b8a6c40cc9f80466d04d6c5347284c6de
}
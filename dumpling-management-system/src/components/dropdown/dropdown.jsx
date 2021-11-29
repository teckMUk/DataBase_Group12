import React from "react";

import {Container, Form, Button} from 'react-bootstrap';

 

import { useState, useEffect } from "react";

 

import {fetchDishIds} from  '../../Services_API/api.js';

 

import {useNavigate} from 'react-router-dom';

 

function Dropdown() {

    const [users,setUsers] = useState();

    fetchDishIds().then((response)=>{

        if(response.data.isSuccessful)

        {

            setUsers(response.data.result);

        }

    });

    return(

        <div>

        <select>

         {users ? users.map((user,i)=>{

             return(

                     <option key={user.dishId} value={user.dishId}></option>

                 )

         }):null

         }

        </select>

        </div>

    );

 

}

 

export default Dropdown;
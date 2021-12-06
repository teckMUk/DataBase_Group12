
import React from "react";

import {Container, Form, Button} from 'react-bootstrap';

import { useState, useEffect } from "react";

import {fetchDishIds} from  '../../Services_API/api.js';

import {useNavigate} from 'react-router-dom';


function Dropdown() {
    const [users, setUsers] = useState([]);
    useEffect(function(){
        fetchDishIds()
        .then((response) => setUsers(response.data))
        

    }
    );



    return(
        /*
        <select>
            
            {
                users.map((user) => (
                    <option key={user.dishId} value = {user.dishId}> {user.dishName} </option>

                )
                )
            }
            

        </select>

        
*/
<select on>
<option value = '0'>xx</option>
<option value = '1'>yx</option>
</select>

    );

}

export default Dropdown;

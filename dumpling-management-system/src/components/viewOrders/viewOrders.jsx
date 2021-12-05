import React from 'react';
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import {viewPlacedOrders} from '../../Services_API/api';

export default function ViewOrders () {
        
    const [placedOrders,setPlacedOrders] = useState();
    
    useEffect(() =>{
        viewPlacedOrders().then((response)=>{
            console.log(response);
            setPlacedOrders(response.data.result);
        });
    }, []);

    return(
        <div id="tableDiv">
        <Table striped bordered hover variant="dark">
        <thead>
            <tr>
            <th>Order ID</th>
            <th>dish Name</th>
            </tr>
        </thead>
        {placedOrders ? placedOrders.map((placedOrder,i)=>
        {
            return(
                <tbody>
                    <tr key={i}>
                    <td>{placedOrder.orderNo}</td>
                    <td>{placedOrder.dishName}</td>
                    </tr>
                </tbody>
            )
        }):null
        }
        </Table>
    </div>
    )
}
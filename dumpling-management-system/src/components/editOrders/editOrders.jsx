import React from 'react';
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import {viewPlacedOrders} from '../../Services_API/api';
import {createSearchParams, useNavigate} from 'react-router-dom';


export default function EditOrder () {
     let navigate = useNavigate();   
    const [placedOrders,setPlacedOrders] = useState();
    const CompleteOrder = (orderStatus) =>
    {
        if(orderStatus==='completed' || orderStatus==='preparing') 
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    useEffect(() =>{
        viewPlacedOrders().then((response)=>{
            console.log(response.data);
            //console.log("esh");
            setPlacedOrders(response.data.result);
        });
    }, []);
    const onUpdateOrder = (orderId) =>
    {
        const prams = {"orderId":orderId};
        navigate({pathname:'/placeOrder',
        search: `?${createSearchParams(prams)}`});
    }
    return(
        <div id="tableDiv">
        <Table striped bordered hover variant="dark">
        <thead>
            <tr>
            <th>Order ID</th>
            <th>dish Name</th>
            <th>Order Status</th>
            <th></th>
            </tr>
        </thead>
        {placedOrders ? placedOrders.map((placedOrder,i)=>
        (
                <tbody key={i}>
                    <tr key={i}>
                    <td>{placedOrder.orderNo}</td>
                    <td>{placedOrder.dishName}</td>
                    <td>{placedOrder.orderStatus}</td>
                    <td><button disabled={CompleteOrder(placedOrder.orderStatus)} onClick={()=>onUpdateOrder(placedOrder.orderNo)}>Change</button></td>
                    </tr>
                </tbody>
        )):null}
        </Table>
    </div>
    )
}
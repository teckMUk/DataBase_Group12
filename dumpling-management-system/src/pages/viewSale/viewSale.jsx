import React from 'react';
import SaleTable from '../../components/saleTable/saleTable';
import Nav2 from '../../components/nav/nav';
//import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
const initialState = {
    SaleType: ""
}



export default function Sale()
{
    // const {state} = useLocation();
    // const {employeeDetails} = state;
    // console.log('obj is ', employeeDetails);
    const [newEmploye, setNewEmploye] = useState(initialState);
    let check = 0;
    const handle = (e)=>
    {   
        const {name, value} = e.target;
        setNewEmploye({...newEmploye, [name]: value});
        if(value === "yearly")
        {
            check = 1;
        }
        else if(value === "monthly")
        {
            check = 1;
        }
        console.log('here ',newEmploye.SaleType);
    }   

    useEffect(() => {}, [newEmploye]);

    return (
        <>
            <div>
                <div>
                    <Nav2/>
                </div>
            
                <div onChange={handle}>  
                    <p>Select The Sale Type</p>
                    <p><input type="radio" value="yearly" name="SaleType" />Yearly Sales</p>
                    <p><input type="radio" value="monthly" name="SaleType" />Monthly Sales</p>
                   
                </div>
        

                <div>
                    <SaleTable/>
                </div>
            </div>
        </>
    )
}
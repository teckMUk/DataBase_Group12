import React from 'react';
import SaleTable from '../../components/saleTable/saleTable';
import Nav2 from '../../components/nav/nav';
import { useState, useEffect } from "react";

export default function Sale()
{
    
    const [newEmploye, setNewEmploye] = useState('');
    useEffect(() => {}, [newEmploye]);
    let check = 0;

    const handle = (e)=>
    {   
        console.log('xyz', e.target);
        const value = e.target.value;
        console.log("val is ",value);
       
        setNewEmploye(...newEmploye, value);
        console.log('here1 ',newEmploye);
     
        if(newEmploye=== "yearly")
        {
            console.log('check 0 ', check);
            check = 0;
        }
        else if(newEmploye === "monthly")
        {
            console.log('check 1 ', check);
            check = 1;
        }
        
    }   

 

    return (
        <>
            <div>
                <div>
                    <Nav2/>
                </div>
            
                <div onChange={handle}>  
                    <h1>Select The Sale Type</h1>
                    <p><input type="radio" value="yearly" />Yearly Sales</p>
                    <p><input type="radio" value="monthly" />Monthly Sales</p>
                   
                </div>
        

                <div>
                    <SaleTable/>
                </div>
            </div>
        </>
    )
}
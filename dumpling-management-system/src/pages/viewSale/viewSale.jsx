import React from 'react';
import SaleTable from '../../components/saleTable/saleTable';
import Nav2 from '../../components/nav/nav';
import { useState, useEffect } from "react";

const initialState = {
    saleType: ""
};
export default function Sale()
{
    
    const [newEmploye, setNewEmploye] = useState(initialState);
    useEffect(() => {}, [newEmploye]);
    let check = 0;

    const handle = (e)=>
    {   
        console.log('xyz', e.target);
        const value1 = e.target.value;
        console.log("val is",value1);
        
        const {name, value} = e.target;
        console.log(name);
        console.log('name is:',name);
        console.log('val is:',value);
        
        setNewEmploye({...newEmploye, [name]: value});
        
        if(newEmploye.saleType=== "yearly")
        {
            console.log('check 0 ', check);
            check = 0;
        }
        else if(newEmploye.saleType === "monthly")
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
                    <p><input type="radio" name = "saleType" value="yearly" />Yearly Sales</p>
                    <p><input type="radio" name = "saleType" value="monthly" />Monthly Sales</p>
                   {console.log("hello")}
                </div>
        

                <div>
                    <SaleTable/>
                </div>
            </div>
        </>
    )
}
import React from 'react';
import SaleTable from '../../components/saleTable/saleTable';
import Nav2 from '../../components/nav/nav';
import { useState, useEffect } from "react";
import { Dropdown} from 'react-bootstrap';

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
        const {name, value} = e.target;
        // console.log(name);
        // console.log('name is:',name);
        // console.log('val is:',value);
        
        setNewEmploye({...newEmploye, [name]: value});
    }   
    const checkHandle = () => {
        if(newEmploye.saleType=== "yearly")
        {
            check = 1;
            console.log('check 1', check);
        }
        else if(newEmploye.saleType === "monthly")
        {
            check = 2;
            console.log('check 2', check);
        }  
        return check;
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
                </div>

                <div>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#/action-1" active>
                        Action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>

                {(checkHandle()=== 2) && <div>
                    <SaleTable/></div>}
                
            </div>
        </>
    )
}
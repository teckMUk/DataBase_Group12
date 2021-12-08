import React from 'react';
import SaleTable from '../../components/saleTable/saleTable';
import Nav2 from '../../components/nav/nav';
//import { useLocation } from 'react-router-dom';


export default function Sale()
{
    // const {state} = useLocation();
    // const {employeeDetails} = state;
    // console.log('obj is ', employeeDetails);
    return (
        <>
            <div>
                <div>
                    <Nav2/>
                </div>
            
                <div onChange={}>  
                    <p>Select The Sale Type</p>
                    <p><input type="radio" value="yearly" name="accountType" />Yearly Sales</p>
                    <p><input type="radio" value="monthly" name="accountType" />Monthly Sales</p>
                   
                </div>
        

                <div>
                    <SaleTable/>
                </div>
            </div>
        </>
    )
}
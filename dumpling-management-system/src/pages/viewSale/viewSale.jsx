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

                <div>
                    <SaleTable/>
                </div>
            </div>
        </>
    )
}
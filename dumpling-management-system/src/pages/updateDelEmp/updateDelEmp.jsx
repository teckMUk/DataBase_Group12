import React from 'react';
import Table from '../../components/table/table';
import Nav2 from '../../components/nav/nav';
import { useLocation } from 'react-router-dom';


export default function Update(prop)
{
    const {state} = useLocation();
    const {employeeDetails} = state
    console.log(employeeDetails);
    return (
        <>
            <div>
                <div>
                    <Nav2/>
                </div>
                
                <div>
                    <Table/>
                </div>
            </div>
        </>
    )
}
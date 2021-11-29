import React from 'react';
import Table from '../../components/table/table';
import Nav2 from '../../components/nav/nav';
import { useLocation } from 'react-router-dom';


export default function Update()
{
    const {state} = useLocation();
    const {employeeDetails} = state;
    console.log('obj is ', employeeDetails);
    return (
        <>
            <div>
                <div>
                    <Nav2/>
                </div>

                <div>
                    <Table employeeDetails = {employeeDetails}/>
                </div>
            </div>
        </>
    )
}
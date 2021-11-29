import React from 'react';
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import {fetchAllEmployee} from '../../Services_API/api';
import {Container, Form, Button} from 'react-bootstrap';
const initialstate =
{
    employeeId:"",
    employeeName:"",
    salary:"",
    position:""
}
export default function BasicTable () {

    const [employees,setEmployees] = useState();
    const [updatedSalary,setSalary] = useState(initialstate);
    
    useEffect(()=>{},[updatedSalary]);
    const handle = (e) =>
    {

        const {name, value} = e.target;
        setSalary({...updatedSalary, [name]: value});

    }

    fetchAllEmployee().then((response)=>{
        console.log(response);
        if(response.data.isSuccessful)
        {
            setEmployees(response.data.result);
        }
    })
    return(
        <div id="tableDiv">
        <Table striped bordered hover variant="dark">
        <thead>
            <tr>
            <th>#</th>
            <th>Employee Name</th>
            <th>Salary</th>
            <th>Postion</th>
            <th>Update Salary</th>
            <th></th>
            </tr>
        </thead>
        {employees ? employees.map((employee,i)=>
        {
            return(
                <tbody>
                    <tr key={i}>
                    <td>{employee.employeeId}</td>
                    <td>{employee.employeeName}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.position}</td>
                    <td>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Control type="text" placeholder="Updated Salary" name = "salary" value = {updatedSalary.salary} onChange = {handle}/>
                        </Form.Group>
                    </Form>
                    </td>
                    <td>
                    <button>Update</button></td>
                    </tr>
                </tbody>
            )
        }):null
        }
        </Table>
    </div>
    )
}
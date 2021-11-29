import React from 'react';
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import {fetchAllEmployee,updateEmployeeSalary} from '../../Services_API/api';
import {Container, Form, Button} from 'react-bootstrap';

export default function BasicTable () {
    let id;
    const [salary,setSalary] = useState();
    const [employees,setEmployees] = useState();
    
    useEffect(() =>{
        fetchAllEmployee().then((response)=>{
            console.log(response);
            setEmployees(response.data.result);
        });
    }, []);

    const submitHandle = e => {
        // e.preventDefault();
        let checkid = 2;
        updateEmployeeSalary(id,salary,checkid).then((response)=>{
            
            console.log(response);
        })
      
    }
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
                    {id=employee.employeeId}
                    <Form>
                        <Form.Group  key = {i} className="mb-3" controlId="formBasicName">
                        <Form.Control type="text" placeholder="Updated Salary" name = {employee.emoloyeeName} value = {salary} onChange={(e)=>setSalary(e.target.value)}/>
                        </Form.Group>
                    </Form>
                    </td>
                    <td>
                    
                    <button onClick={() => {submitHandle()}}>Update</button></td>
                    </tr>
                </tbody>
            )
        }):null
        }
        </Table>
    </div>
    )
}
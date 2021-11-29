import React from 'react';
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import {fetchAllEmployee,updateEmployeeSalary} from '../../Services_API/api';
import {Container, Form, Button} from 'react-bootstrap';
import { useModal } from 'react-hooks-use-modal';
import {useNavigate} from 'react-router-dom';

export default function BasicTable () {
    let id;
    let navigate = useNavigate();
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
            if(response.data.isSuccessful)
            {
                alert(response.data.message);
                navigate("/getAllEmployees");
                
            }
            else{
                alert(response.data.message);
                navigate("/getAllEmployees");
            }
        })
      
    }
    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
      });
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
            </tr>
        </thead>
        {employees ? employees.map((employee,i)=>
        {
            id = employee.employeeId;
            return(
                <tbody>
                    <tr key={i}>
                    <td>{employee.employeeId}</td>
                    <td>{employee.employeeName}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.position}</td>
                    <td><button onClick={open}>Click to Update</button></td>
                    <td>
                    <Modal>
                    <p> Are you sure you want to update the salary of {employee.employeeName}</p>
                    <Form>
                        <Form.Group  key = {i} className="mb-3" controlId="formBasicName">
                        <Form.Control type="text" placeholder="Updated Salary" name = {employee.emoloyeeName} value = {salary} onChange={(e)=>setSalary(e.target.value)}/>
                        </Form.Group>
                    </Form>
                    <button onClick={submitHandle}>Update</button>
                    <button onClick={close}>close</button>
                    </Modal>
                    </td>
                    </tr>
                </tbody>
            )
        }):null
        }
        </Table>
    </div>
    )
}
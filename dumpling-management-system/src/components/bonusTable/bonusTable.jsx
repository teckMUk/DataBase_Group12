import React from 'react';
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import {fetchAllEmployee,giveBonuses} from '../../Services_API/api';
import {Container, Form, Button} from 'react-bootstrap';
import { useModal } from 'react-hooks-use-modal';
import {useNavigate,Link} from 'react-router-dom';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 

export default function BonusTable () {
    let id;
    let navigate = useNavigate();
    const [salary,setSalary] = useState();
    const [employees,setEmployees] = useState();
    const [reason,setReason]=useState();
    
    useEffect(() =>{
        fetchAllEmployee().then((response)=>{
            console.log(response);
            setEmployees(response.data.result);
        });
    }, []);

    const submitHandle = e => {
        // e.preventDefault();
        let checkid = localStorage.getItem('dumplingUserId');
        if(!checkid)
        {
            navigate('/login');
            window.location.reload();
            
        }
        else
        {
            let date = new Date();
                date = formatDate(date);
                console.log(date);
                giveBonuses(checkid,id,reason,date).then((response)=>{
                    
                    console.log(response);
                    if(response.data.isSuccessful)
                    {
                        alert(response.data.message);
                        navigate("/giveBonuses");
                        
                    }
                    else{
                        alert(response.data.message);
                        navigate("/giveBonuses");
                    }
                })
            
            }
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
            <th>Give Bonus</th>
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
                    <td><button onClick={open}>Click to Give Bonus</button></td>
                    <td>
                    <Modal>
                    <p> Are you sure you want to give bonus to {employee.employeeName}</p>
                    <Form>
                        <Form.Group  key = {i} className="mb-3" controlId="formBasicName">
                        <Form.Control type="text" placeholder="Give bonus" name = {employee.emoloyeeName} value = {salary} onChange={(e)=>setSalary(e.target.value)}/>
                        </Form.Group>
                        <Form.Group  key = {i} className="mb-3" controlId="formBasicName">
                        <Form.Control type="text" placeholder="reason" name = {employee.emoloyeeName} value = {reason} onChange={(e)=>setReason(e.target.value)}/>
                        </Form.Group>
                    </Form>
                    <button onClick={submitHandle}>Update</button>
                    <Link to="/giveBonuses">
                    <button onClick={close} >close</button>
                    </Link>
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
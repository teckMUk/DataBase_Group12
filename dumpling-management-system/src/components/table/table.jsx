import "./table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table , Button,Container, Form} from "react-bootstrap";
import {deleteAccount,updateAccount} from '../../Services_API/api'
import {useNavigate} from 'react-router-dom';
import { useModal } from 'react-hooks-use-modal';
import { useState, useEffect } from "react";
const initialState = {
    accountType: "",
    position: "",
}
export default function Table2(prop)
{
    const [newEmploye, setNewEmploye] = useState(initialState);
    useEffect(() => {}, [newEmploye]);
    const [Modal,open,close] = useModal('root',{
        preventScroll:true,
        closeOnOverlayClick: false
    });
    const handle = (e) =>
    {
        const {name, value} = e.target;
        setNewEmploye({...newEmploye, [name]: value});
    }
    let emp = prop.employeeDetails;
    let navigate = useNavigate(); 
    const onDelete = (email) =>
    {
        deleteAccount(email).then((response)=>
        {
            if(response.data.isSuccessful)
            {
                alert(response.data.message);
                navigate('/dashboard');
            }
            else
            {
                alert(response.data.message);
                
            }
        });
    }
    const onUpdate = (email,postion,accountType) =>
    {
        console.log(email);
        console.log(postion);
        console.log(accountType);
        let role = "";
        let x = localStorage.getItem('empRole');
        if(x == null)
        {
            navigate('/');
        }
        else{
            role = x;
        }
        updateAccount(accountType,postion,email,role).then((response)=>
        {
            if(response.isSuccessful)
            {
                alert(response.data.message);
                navigate('/dashboard');
            }
            else
            {
                alert(response.data.message);
                navigate('/dashboard');
            }
        });
    }
    console.log('in table', prop.employeeDetails);
    return (
        <>
            <div>
            <Table responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Employee name</th>
                    <th>Email address</th>
                    <th>position</th>
                    <th>account Type</th>
                    </tr>
                </thead>

                {emp.map((e , i)=> (
                    <tbody key = {i}>
                        
                        <tr>
                            <td>{i}</td>
                            <td>{e.employeeName}</td>
                            <td>{e.emailAddress} </td>
                            <td>{e.position} </td>
                            <td>{e.accountType} </td>
                            <td> <Button onClick={open}>Update</Button></td>
                            <Modal>
                                <p>Are you sure you want to delte user with email {e.emailAddress}</p>
                                <Container id="main-container" className="d-grid h-100">
                                <Form className= 'text-center'>
                                  
                                   <div onChange={handle}>  
                                        <p>Select Account Type</p>
                                        <p><input type="radio" value="chef" name="accountType" /> Chef</p>
                                        <p><input type="radio" value="manager" name="accountType" /> Manager</p>
                                        <p><input type="radio" value="cashier" name="accountType" /> Cashier</p>
                                    </div>

                                   <Form.Group className="mb-3" controlId="formBasicPostion">
                                        <Form.Label>New postion</Form.Label>
                                        <Form.Control type="text" placeholder="Enter account type" name = 'position'
                                        value = {newEmploye.position} onChange = {handle}/>
                                   </Form.Group>
                                </Form>
                                </Container>
                                <div>
                                <Button onClick={close}> close </Button>
                                <Button onClick={()=>{onUpdate(e.emailAddress,newEmploye.position,newEmploye.accountType)}}
                                disabled = {Object.values(newEmploye).includes("")}>Update</Button>
                                </div>
                            </Modal>
                             <td> <Button onClick={() =>onDelete(e.emailAddress)} > Delete</Button></td>
                        </tr>
                       
                        </tbody>
                ))}
                
                </Table>
            </div>
        </>
    )
}
import "./table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table , Button,Container, Form} from "react-bootstrap";
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
   
    const handle = (e) =>
    {
        const {name, value} = e.target;
        setNewEmploye({...newEmploye, [name]: value});
    }
    let emp = prop.employeeDetails;
    //let navigate = useNavigate(); 
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
                          
                             <td> <Button > Delete</Button></td>
                        </tr>
                       
                        </tbody>
                ))}
                
                </Table>
            </div>
        </>
    )
}
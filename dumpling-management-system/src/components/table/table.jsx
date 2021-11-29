import "./table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table , Button} from "react-bootstrap";


export default function Table2(prop)
{
    let emp = prop.employeeDetails
    
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
                    {/* {Array.from({ length: 4}).map((_, index) => (
                        <th key={index}>Table heading</th>
                    ))} */}
                    </tr>
                </thead>

                
                {emp.map((e , i)=> (
                    <tbody key = {i}>
                        
                        <tr>
                            <td>{e.employeeName}</td>
                            <td>{e.emailAddress} </td>
                            <td>{e.position} </td>
                            <td>{e.accountType} </td>
                            {/* {Array.from({ length: 4}).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))} */}
                             <td> <Button>Delete</Button></td>
                             <td> <Button>Update</Button></td>
                        </tr>
                       
                        </tbody>
                ))}
                
                </Table>
            </div>
        </>
    )
}
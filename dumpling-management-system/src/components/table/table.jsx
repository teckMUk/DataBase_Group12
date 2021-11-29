import "./table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from "react-bootstrap";


export default function Table2()
{
    let emp = ['Hwll', 'cook', 'what', 'bbj'];
    return (
        <>
            <div>
            <Table responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    {Array.from({ length: 4}).map((_, index) => (
                        <th key={index}>Table heading</th>
                    ))}
                    </tr>
                </thead>

                
                {emp.map(e => (
                    <tbody>
                        
                        <tr>
                            <td>{e}</td>
                            
                            {Array.from({ length: 4}).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                        </tbody>
                ))}
                
                </Table>
            </div>
        </>
    )
}
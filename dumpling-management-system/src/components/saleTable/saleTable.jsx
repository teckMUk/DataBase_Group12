
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table} from "react-bootstrap";
//import { useState, useEffect } from "react";



export default function TableSale(prop)
{
   
    let emp = [{"orderNo" : 1, "dishNames": ['h', 'k'], "totalBill": 200}, {"orderNo" : 2, "dishNames": ['h', 'k'], "totalBill": 230}]
    
    return (
        <>
            <div>
            <Table responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Order Number</th>
                    <th>Dish Names</th>
                    <th>Total Bill</th>
                    </tr>
                </thead>

                {emp.map((e , i)=> (
                    <tbody key = {i}>
                        
                        <tr>
                            <td>{i}</td>
                            <td>{e.orderNo}</td>
                            <td>{e.dishNames} </td>
                            <td>{e.totalBill} </td>
                           
                        </tr>
                       
                    </tbody>
                ))}
                
                </Table>
            </div>
        </>
    )
}

import 'bootstrap/dist/css/bootstrap.min.css';
import { Table} from "react-bootstrap";
//import { useState, useEffect } from "react";



export default function TableSale(prop)
{
    //let emp = [{"orderNo" : 1, "dishNames": ['h', 'k'], "totalBill": 200}, {"orderNo" : 2, "dishNames": ['h', 'k'], "totalBill": 230}]
    let emp = prop.saleData;
    console.log('emp', emp);
    let sum = 0;
    const findSum = (total) =>
    {
        sum = sum + Number(total);
    }

    const retTable = () =>
    {
        return <div>
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
                            {findSum(e.totalBill)}
                        </tr>
                       
                    </tbody>
                ))}

                <tbody>
                        <tr>
                            <td>      </td>
                            <td>      </td>
                            <td>      </td>
                            <td>{sum}</td>
                        </tr>
                    </tbody>
          
                </Table>
            </div>
    }
    
    // const chooseDisplay = () =>
    // {
    //     console.log('message is ', prop.message);
    //     if(prop.message === 'No sale')
    //     {
    //         return <div><h4>No Sale in this time period</h4></div>
    //     }

    //     else
    //     {
    //         return retTable();
    //     }
        
    // }
    
    return (
            <div>
             {retTable()}
            </div>
    )
}
import "./removeMenu.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table , Button,} from "react-bootstrap";
import {fetchDishIds,removeMenuItem} from '../../Services_API/api'
import {useState, useEffect } from "react";

export default function Table3()
{
    const [employees,setEmployees] = useState();
    useEffect(() => {
        fetchDishIds().then((response)=>
        {
            if(response.data.isSuccessful)
            {
                console.log(response.data.message);
                setEmployees(response.data.result);
            }
            else
            {
                alert(response.data.message);

            }
        });
    }, []);
    
    const onRemove = (id) =>
    {
        removeMenuItem(id).then((response)=>
        {
            if(response.data.isSuccessful)
            {
                alert(response.data.message);
                window.location.reload();
            }
            else
            {
                alert(response.data.message);
                window.location.reload();
            }
        });
    }
    return (
        <>
            <div>
            <Table responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Dish name</th>
                    <th>Alergents</th>
                    <th>Price</th>
                    </tr>
                </thead>

                {employees ? employees.map((e , i)=> (
                    <tbody key = {i}>
                        
                        <tr>
                            <td>{i}</td>
                            <td>{e.dishName}</td>
                            <td>{e.allergens} </td>
                            <td>{e.dishPrice} </td>
                            <td> <Button onClick={() =>onRemove(e.dishId)}>Remove</Button></td>
                        </tr>
                       
                        </tbody>
                )):null}
                </Table>
            </div>
        </>
    )
}
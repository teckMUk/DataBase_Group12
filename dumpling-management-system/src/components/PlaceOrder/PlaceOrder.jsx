import "./PlaceOrder.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table , Button,} from "react-bootstrap";
import {fetchDishIds,placeOrder} from '../../Services_API/api'
import {useState, useEffect } from "react";
export default function Tabel4()
{
    let dishId = [];
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
    const onPlaceOrder = () =>
    {
        let obj={
            "dishIds":dishId
        }
        placeOrder("takenIn","placed",0,obj);
    }
    const onRemove = (id) =>
    {
        if(dishId.length!==0)
        {
            let index = dishId.indexOf(id)
            if(dishId.indexOf(id)!==-1)
            {
                dishId.splice(index,1);

            }
        }
        console.log(dishId);
    }
    const onAdddish = (id) =>
    {
        dishId.push(id);
        console.log(dishId);
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
                            <td> <Button onClick={() =>onAdddish(e.dishId)}>Add item</Button></td>
                            <td> <Button onClick={() =>onRemove(e.dishId)}>remove item</Button></td>
                        </tr>
                       
                        </tbody>
                )):null}
                </Table>
                <Button onClick={onPlaceOrder}> Place Order</Button>
            </div>
        </>
    )
}
import "./PlaceOrder.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table , Button,} from "react-bootstrap";
import {fetchDishIds,placeOrder} from '../../Services_API/api'
import {useState, useEffect } from "react";
import { useNavigate } from "react-router";
export default function Tabel4()
{
    let dishId = [];
    let orderStatus = ""
    let bill = 0;
    let navigate = useNavigate();
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
    const  handleChange = (e)=>
    {
        const {name,value} = e.target;
        console.log(name,value);
        orderStatus = value;
    }
    const onPlaceOrder = () =>
    {
        if(dishId.length===0)
        {
            alert("No dish selected");
        }
        else
        {
            let obj={
                "dishIds":dishId
            }
            placeOrder(orderStatus,"placed",bill,obj).then((response)=>
            {
                if(response.data.isSuccessful)
                {
                    console.log(response.data.message);
                    alert(response.data.message);
                    navigate("/dashboard");
                }
                else
                {
                    alert(response.data.message);
                    navigate("/dashboard");  
                }
            });
        }
    }
    const onRemove = (id,price) =>
    {
        if(dishId.length!==0)
        {
            
            let index = dishId.indexOf(id)
            if(dishId.indexOf(id)!==-1)
            {
                bill = bill-price;
                dishId.splice(index,1);

            }
            console.log("THis is the bill after removing the dish",bill);
        }
        console.log(dishId);
    }
    const onAdddish = (id,price) =>
    {

        bill = bill+price;
        dishId.push(id);
        console.log("THis is the bil",bill);
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
                            <td> <Button onClick={() =>onAdddish(e.dishId,e.dishPrice)}>Add item</Button></td>
                            <td> <Button onClick={() =>onRemove(e.dishId,e.dishPrice)}>remove item</Button></td>
                        </tr>
                       
                        </tbody>
                )):null}
                </Table>
                <div onChange={handleChange}>
                    <input type="radio" value="DineIn" name="typeOfOrder" /> Dine In<p></p>    
                    <input type="radio" value="TakeAway" name="typeOfOrder" /> Takeway
                </div>
                
                <Button onClick={onPlaceOrder}> Place Order</Button>
            </div>
        </>
    )
}
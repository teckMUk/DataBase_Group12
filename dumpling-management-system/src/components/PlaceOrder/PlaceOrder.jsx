import "./PlaceOrder.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table , Button,} from "react-bootstrap";
import {fetchDishIds,placeOrder, getOrder, editOrder,deleteOrder} from '../../Services_API/api'
import {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import {useLocation} from "react-router-dom";
export default function Tabel4()
{
    const search = useLocation().search;
    const orderId = new URLSearchParams(search).get('orderId');
    let dishId = [];
    let orderStatus = ""
    let control_bool = false;
    let bill = 0;
    let navigate = useNavigate();
    const [employees,setEmployees] = useState();

    const setter = () =>
    {
          
            if(!!orderId)
        {
            
            console.log("run");
            control_bool = true;
            getOrder(orderId).then((response)=>
            {
                if(response.data.isSuccessful)
                {
                    //console.log((response.data.result));
                    let old_bill = (response.data.result)[1];
                    //console.log(old_bill);
                    bill = old_bill;
                    let len_res = (response.data.result)[0].length;
                    let arr = (response.data.result)[0];
                    //console.log(len_res);

                    let x = 0;
                    for(x = 0; x<len_res; x++)
                    {
                        let dish_quantity = arr[x]["quantity"];
                        let dish_id_pushed = arr[x]["dishNumber"];
                        //console.log(dish_id_pushed)
                        //console.log(dish_quantity);
                        let c = 0;
                        for(c = 0; c<dish_quantity; c++)
                        {
                            dishId.push(dish_id_pushed);
                        }


                    }



                }
                else
                {
                    alert(response.data.message);

                }   


            }
            );


        }


        
    }
    
    useEffect(() => {
        fetchDishIds().then((response)=>
        {
            if(response.data.isSuccessful)
            {
                //console.log(response.data.message);
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
    const renderAuthButton = () => 
    {
        if (control_bool) 
        {
            console.log("here");
            return <Button onClick={onEditOrder}> Update Order</Button>
        } 
        else 
        {
            console.log("here2")
            return <Button onClick={onPlaceOrder}> Place Order</Button>
        }
      }

    const onEditOrder = () =>
    {
        if(dishId.length===0)
        {
            alert("Whoops! You have emptied the order");
        }

        else
        {
            let obj={
                "dishIds":dishId
            }
            editOrder(orderStatus,"placed",orderId,bill,obj).then((response)=>
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

    const renderAuthButtonTwo = () => 
    {
        if (control_bool) 
        {
            console.log("here");
            return <Button onClick={handleDelete}>Delete Order</Button>
        } 
        else 
        {
            console.log("here2")
            return <Button onClick={handleCancel}>Cancel Order</Button>
        }
      }
      const handleDelete = () =>
      {
        deleteOrder(orderId).then((response)=>
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

      const handleCancel = () =>
      {
        navigate("/dashboard");


      }




    return (
        <>
            <div>
            <Table responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Dish name</th>
                    <th>Allergens</th>
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
                {setter()}
                {renderAuthButton()}
                {renderAuthButtonTwo()}
                
            </div>
        </>
    )
}
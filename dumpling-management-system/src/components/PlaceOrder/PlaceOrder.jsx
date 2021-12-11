import "./PlaceOrder.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table , Button} from "react-bootstrap";
import {fetchDishIds,placeOrder, getOrder, editOrder,deleteOrder,viewOrderSummary} from '../../Services_API/api'
import {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import {useLocation} from "react-router-dom";
import { useModal } from "react-hooks-use-modal";
export default function Tabel4()
{
    const search = useLocation().search;
    const orderId = new URLSearchParams(search).get('orderId');
    let dishId = [];
    let orderStatus = ""
    let control_bool = false;
    let bill = 0;
    let navigate = useNavigate();
    const [placedorder,setplacedorder] = useState(false);
    const [employees,setEmployees] = useState();
    const [orderSummary,setOrderSummary] = useState({
        'totalBill':0,
        'dishNames':[]
    });
    const [orderId1,setorderId1] = useState("");
    const [dishNames1,setdishNames] = useState([]);

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
    const [Modal,open,close] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
      });
    const  handleChange = (e)=>
    {
        const {name,value} = e.target;
        console.log(name,value);
        orderStatus = value;
    }
    const viewOrderSummaryformodal = (orderId1) =>{

        viewOrderSummary(orderId1).then((response)=>{
            if(response.data.isSuccessful)
            {
                console.log(response.data.dishNames);
                console.log(response.data.totalBill);
                let ans = {
                    'totalBill':response.data.totalBill,
                    'dishNames':response.data.dishNames
                }
                setOrderSummary(ans);
                setdishNames(response.data.dishNames);
                setplacedorder(true);
                open();

            }
        });

    }
    const checkPayment = (payment)=>
    {
        // console.log(payment);
        if(Number(payment) === orderSummary.totalBill)
        {
            alert("Successfully paid");
            close();
            window.location.reload();
        }
        else
        {
            alert("Insufficent amount. Enter again");
        }
    }
    const makeOrderSumm = (placeOrder) =>{
        
        if(placeOrder)
        {
            return(
                <div>
                    <Table responsive>
                    <thead>
                        <tr>
                        <th>Order Id</th>
                        <th>Dish names</th>
                        <th>Total bill</th>
                        <th>Press the button to Pay or Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><p>{orderId1}</p></td>
                        <td>{dishNames1.map(function(element,index){
                            return <li key={index}>{element}</li>
                        })}</td>
                        <td><p>{orderSummary.totalBill}</p></td>
                        <td>
                         <Button onClick={()=>{checkPayment(orderSummary.totalBill)}}>Pay</Button><p></p>
                         <Button onClick={()=>{handleCancel()}}>Cancel Order</Button>
                        </td>
                    </tr>
                    </tbody>
                    </Table>
                </div>
                )
        }
        
        
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
            console.log("here2");
            console.log("THis is the order summary",orderSummary);
            return (
            <div>
            <Button onClick={()=>{onPlaceOrder()}}>Place Order</Button><p></p>
            <Modal>
            <h5>Order Summary</h5>
                {makeOrderSumm(placedorder)}
            </Modal>
            </div>
            )

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
                    // console.log(response.data.orderId);
                    setorderId1(response.data.orderId);
                    viewOrderSummaryformodal(response.data.orderId);
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
                bill = bill-Number(price);
                dishId.splice(index,1);

            }
            console.log("THis is the bill after removing the dish",bill);
        }
        console.log(dishId);
    }
    const onAdddish = (id,price) =>
    {

        bill = bill+Number(price);
        dishId.push(id);
        console.log("This is the bill",bill);
        console.log(dishId);
    }

    const renderAuthButtonTwo = () => 
    {
        if (control_bool) 
        {
            console.log("here");
            return <Button onClick={handleDelete}>Delete Order</Button>
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
        alert("Order Successfully Cancelled");
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
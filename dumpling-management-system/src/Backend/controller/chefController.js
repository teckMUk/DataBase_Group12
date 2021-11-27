import dotenv from "dotenv";
import mysql from 'mysql';
import express from 'express';
import bodyParser from "body-parser";
import sha1 from 'sha1';
dotenv.config({path:"./src/Backend/.env"});
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


export const addMenuItem = (req,res)=>

{
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database
        }

    );
    let message ="";
    let isSuccessful = false;
    let dishName = req.body.dishName;
    let dishType = req.body.dishType;
    let preparationTime = req.body.preparationTime;
    let calories = req.body.calories;
    let dishOfday = req.body.dishOfday;
    let allergens = req.body.allergens;
    let image = req.body.image;
    let addDishQuery =
    `INSERT INTO dumpling.menu (dishName,dishType,preparationTime,calories,dishOfday,allergens,image,createdAt)
    VALUES(${dishName},${dishType},${preparationTime},${calories},${dishOfday},${allergens},${image},NOW());`;
    connectionString.connect((error)=>{
        if(error)
        {
            console.log(err);

        }
        else
        {
            connectionString.query(addDishQuery,(err,result)=>
            {
                if(err)
                {
                    console.log("Error found");
                    console.log(err);
                    message = "Failed to insert Into menu";
                    res.send(
                        {
                            "isSuccessful":isSuccessful,
                            "message":message
                        }

                    );

                    connectionString.end();

                }

                else

                {

                    console.log("Dish added to the menu successfully");

                    isSuccessful=true;

                    message="Dish has been added";

                    res.send(

                        {
                            "isSuccessful":isSuccessful,

                            "message":message
                        }

                    );

                    connectionString.end();
                }

            });

        }

    });
}
export const removeMenuItem = (req,res)=>
{
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database

        }
    );
    let message = "";
    let isSuccessful = false;
    let dishId = req.body.dishId;
    let deleteDish = `DELETE FROM dumpling.menu WHERE menu.dishId=${dishId}`;
    connectionString.query(deleteDish,(err,result)=>
    {
        if(err)
        {
            message = "Dish not deleted";
            res.send(
                {
                    'isSuccessful':isSuccessful,
                    'message':message
                }
            );
            connectionString.end();
        }
        else
        {
            message = "Dish deleted Successfully";
            isSuccessful = true;
            res.send(
                {
                    'isSuccessful':isSuccessful,
                    'message':message
                }
            );
            connectionString.end();
            
        }
    });

}

export const fetchDishIds = (req,res)=>
{
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database

        }
    );
    let isSuccessful = false;
    let message = "";
    let fetchIds = `SELECT dishId, dishName from dumpling.menu`;
    connectionString.query(fetchIds,(err,result)=>
    {
        if(err)
        {
            message = "There are no dishes in the menu";
            res.send(
                {
                    'isSuccessful':isSuccessful,
                    'message':message 
                }
            );
            connectionString.end();
        }
        else
        {
            message = "Found all the dishes";
            isSuccessful = true;
            console.log(result);
            let dishIds = [];
            let dishNames = [];
            for(var i =0;i<result.length;i++)
            {
                dishIds.push(result[i].dishId);
                dishNames.push(result[i].dishName);

            }
            res.send(
                {
                    'isSuccessful':isSuccessful,
                    'message':message,
                    'dishIDs':dishIds,
                    'dishNames':dishNames
                }
            );
            connectionString.end();
        }
    });
}








export const addOrderItem = (req,res)=>{
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database

        }
    );

    let message ="";
    let isSuccessful = false;
    let couponId = req.body.couponId;
    let typeOfOrder = req.body.typeOfOrder;
    let OrderStatus = req.body.OrderStatus;
    let totalBill = req.body.totalBill;
    let listOrders = req.body.listOrders;//list orders is an array of order IDs that the user wishes to place an order of 
    
    //insert into orders table first
    

    let addOrderQuery = 
    `INSERT INTO dumpling.order (couponId,typeOfOrder,OrderStatus,totalBill,createdAt)
    VALUES(${couponId},${typeOfOrder},${OrderStatus},${totalBill},NOW());`;
    
    connectionString.connect((error)=>{
    if(error)
    {
        console.log(err);

    }
    else
    {
        connectionString.query(addOrderQuery,(err,result)=>{
            if(err)
            {
                    console.log("Error found");
                    // console.log(err);
                    message = "Failed to place order";
                    res.send(
                    {
                        "isSuccessful":isSuccessful,
                        "message":message
                    }
                );
                connectionString.end();

            }

            else
            {
                console.log("Order placed successfully");
                isSuccessful=true;
                message="Order Placed";
                res.send(
                    {
                            "isSuccessful":isSuccessful,
                            "message":message
                    }
                );
                connectionString.end();

        
            }

        });


    }
});


    //after this point u have added into the orders table
    let message ="";
    let isSuccessful = false;

    let findMax = 
    `SELECT MAX(orderId) FROM dumpling.order`;

    isSuccessful = false;
    let maxOrderId = -1;

    connectionString.connect((error)=>{
        if(error)
        {
            console.log(err);
    
        }
        else
        {
            connectionString.query(findMax,(err,result)=>{
                if(err)
                {
                    console.log("Error found");
                    // console.log(err);
                    message = "Failed to fetch order ID";
                    res.send(
                        {
                            "isSuccessful":isSuccessful,
                            "message":message
                        }
                    );
                    connectionString.end();

                }

                else
                {
                    console.log("Order ID fetched successfully");
                    isSuccessful=true;
                    message="Order ID fetched";
                    maxOrderId = result;
                    res.send(
                        {
                                
                                "isSuccessful":isSuccessful,
                                "message":message,
                                //"recendDishId":result
                        }
                    );
                    connectionString.end();

        
                }






            });


        }
    });




    //maxOrderId contains the id of the recently inserted order
    //listOrders is the array of dish IDs
    let numberOrders = listOrders.length;
    for (let i = 0; i < numberOrders; i++)
    {
        let addDishQuery = 
        `INSERT INTO dumpling.dishssignment (orderNo, dishNo)
        VALUES(${maxOrderId},${listOrders[i]});`;
        connectionString.connect((error)=>{
            if(error)
            {
                console.log(err);
        
            }
            else
            {
                connectionString.query(addDishQuery,(err,result)=>{

                    if(err)
                    {
                        console.log("Error found");
                        console.log(err);
                        message = "Failed to place order item";
                        res.send(
                            {
                                "isSuccessful":isSuccessful,
                                "message":message
                            }
    
                        );
    
                        connectionString.end();
    
                    }
                    else
                    {
                        console.log("Order item placed");
    
                        isSuccessful=true;
    
                        message="Order has been placed";
    
                        res.send(
    
                            {
                                "isSuccessful":isSuccessful,
    
                                "message":message
                            }
    
                        );
    
                        connectionString.end();



                    }




                });

            }


        });





    }


    




    







    
    










            }

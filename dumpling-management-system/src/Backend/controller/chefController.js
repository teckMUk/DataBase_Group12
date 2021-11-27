import dotenv from "dotenv";
import mysql from 'mysql';
import express from 'express';
import bodyParser from "body-parser";
import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
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

function fetchMaxId(connectionString) {


    let findMax = 
    `SELECT MAX(orderId) FROM dumpling.order`;
    connectionString.query(findMax,(err2,result)=>
        {
            if(err2)
            {
                console.log("Failed to fetch order ID");
                console.log(err2);
                return -1;
            }
            else
            {
                console.log("Order ID fetched");
                //console.log(result);
                return result;
            }
         });


  }

  function insertDishAssignment(connectionString,q) {

    connectionString.query(q,(err2,result)=>
        {
            if(err2)
            {
                
                console.log(err2);
                return -1;
            }
            else
            {
                
                return 1;
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
    let typeOfOrder = req.body.typeOfOrder;
    let OrderStatus = req.body.orderStatus;
    let totalBill = req.body.totalBill;
    let listOrders = req.body.listOrders;//list orders is an array of order IDs that the user wishes to place an order of
    let dishIds = Object.values(JSON.parse(listOrders));
    //console.log(dishIds[0]);
    let finalDishIds = dishIds[0];
    let noOfOrders = finalDishIds.length;

    //console.log("This is the number of orders",noOfOrders);
    //list orders is an array of order IDs that the user wishes to place an order of 
    
    //insert into orders table first
    
    let checkUnique = 1;
    let orderId = 0
    let checkQuery =`SELECT * FROM dumpling.order WHERE order.orderId = ${orderId}`;
    while(checkUnique)
    {
        orderId =uuidv4();
        connectionString.connect((error)=>{
            if(error)
            {
                console.log(err);
        
            }
            else
            {
                connectionString.query(checkQuery,(err,result)=>{
                    if(result.length===0)
                    {
                        checkUnique = 0;
                    }


                });

            }

        });
        connectionString.end();



    }


    let addOrderQuery = 
    `INSERT INTO dumpling.order (orderId,couponId,typeOfOrder,OrderStatus,totalBill,createdAt)
    VALUES(${orderId},${couponId},${typeOfOrder},${OrderStatus},${totalBill},NOW());`;
    let checkAdditionOrder = 0;
    //now we should add into the orders table first
    connectionString.connect((error)=>{
        if(error)
        {
            console.log(err);
    
        }
        else
        {
            connectionString.query(addOrderQuery,(err,result) => {
                if(err)
                {
                    console.log("Failed to add order into the order tab");
                    console.log(err);

                }
                else
                {
                    checkAdditionOrder = 1;
                }
               

            });
            


        }
        connectionString.end();

});
isSuccessful = true;
let addDishAssignment = "";
if(checkAdditionOrder ===1)
{

    connectionString.connect((error)=>{
        if(error)
        {
            console.log(err);
    
        }
        else
        {
            for (let i = 0; i < noOfOrders; i++) 
            {
                addDishAssignment = 
                `INSERT INTO dumpling.dishAssignment (orderId,dishId) 
                VALUES(${orderId},${finalDishIds[i]},NOW());`;
                connectionString.query(addDishAssignment,(err,result) => {
                    if(err)
                    {
                        console.log("Failed to add dish into the dish assignment table");
                        console.log(err);
                        isSuccessful = false;
                        break;
    
                    }
                    
                   
    
                });
                
                




                
            }
            
            
        }
        connectionString.end();

    });





}

if(isSuccessful===false || checkAdditionOrder===0)
{
    res.send(

        {
            "isSuccessful":false,

            "message":"Order has been placed successfully"
        }

    );

}


}

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

    console.log("adding menu item");

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
    let orderId = req.body.orderId;
    let couponId = req.body.couponId;
    let typeOfOrder = req.body.typeOfOrder;
    let OrderStatus = req.body.OrderStatus;
    let totalBill = req.body.totalBill;
    
    

    let addOrderQuery = 
    `INSERT INTO dumpling.order (orderId,couponId,typeOfOrder,OrderStatus,totalBill,createdAt)
    VALUES(${orderId},${couponId},${typeOfOrder},${OrderStatus},${totalBill},NOW());`;
    

    connectionString.query(addOrderQuery,(err,result)=>
    {
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



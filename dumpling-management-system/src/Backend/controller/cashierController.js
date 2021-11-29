import dotenv from "dotenv";
import mysql from 'mysql';
import express, { response } from 'express';
import {v4 as uuidv4} from "uuid";
dotenv.config({path:"./src/Backend/.env"});
const app = express();
app.use(express.json({extended:true}));
app.use(express.urlencoded({ extended: true }));
function findid()

{

    return new Promise((resolve,reject)=>

    {

        var connectionString1 = mysql.createConnection(

            {

                    host:process.env.host,

                    user: process.env.user,

                    password:process.env.password,

                    database:process.env.database

       

            }

            );

        let orderId = uuidv4();

        let checkQuery =`SELECT * FROM dumpling.orders WHERE orders.orderId = "${orderId}"`;

        connectionString1.query(checkQuery, (err,res)=>

        {

            if(err)

            {

                console.log("error");
                console.log(err);

                reject("querry failed");

                connectionString1.end();

            }

            else

            {

                if(res.length===0)

                {

                    resolve(orderId);

                    connectionString1.end();

                }

                else

                {

                    reject("order id in use");

                    connectionString1.end();

                }

            }

        });

    });

}

function addIntoDA(orderId,toAddintoDA)

{

    return new Promise((resolve,reject)=>

    {

        var connectionString2 = mysql.createConnection(

            {

                host:process.env.host,

                user: process.env.user,

                password:process.env.password,

                database:process.env.database

   

            }

        );

        let addIntoDishAss = `INSERT INTO dumpling.dishassignment(orderNo,dishNo)

        VALUES("${orderId}",${toAddintoDA});`;

        connectionString2.query(addIntoDishAss,(err,result)=>

        {

            if(err)

            {

                console.log("Error");

                reject("Query failed");

                connectionString2.end();

            }

            else

            {

                resolve(result);

                connectionString2.end();

            }

        });

    });

}

export const placeOrder = async (req,res)=>

{

    var connectionString = mysql.createConnection(

        {

            host:process.env.host,

            user: process.env.user,

            password:process.env.password,

            database:process.env.database

 

        }

    );

    let bit = true;

    let orderId;

    while(bit)

    {

        console.log("In while");

        await findid().then((response)=>

        {

            orderId = response;

            bit = false;

        }).catch((err)=>

        {

            console.log(err);

        });

    }

    let message = "";

    let isSuccessful=false;

    let typeOfOrder = req.body.typeOfOrder;

    let orderStatus = req.body.orderStatus;

    let totalBill = req.body.totalBill;

    let listOrders = req.body.listOrders;

    let dishIds = Object.values((JSON.parse(JSON.stringify(listOrders))));

    // console.log(dishIds);

    let finalDishIds = dishIds[0];
    let noOfOrders = finalDishIds.length;

    // console.log("This is the number of orders",noOfOrders);

    // console.log(typeOfOrder,orderStatus,totalBill,listOrders,noOfOrders,finalDishIds);

    let addOrderQuery =

    `INSERT INTO dumpling.orders(orderId,typeOfOrder,OrderStatus,totalBill,createdAt)

    VALUES("${orderId}","${typeOfOrder}","${orderStatus}",${totalBill},NOW());`;

 

    connectionString.query(addOrderQuery,(err,result)=>

    {

        if(err)

        {

            message = "Cannot add order to the order table";

            console.log(err);

            res.send({

                'isSuccessful':isSuccessful,

                'message':message

            });

            connectionString.end();

        }

        else

        {

            console.log("Now adding into dish assignment");

           

            for(var i=0;i<noOfOrders;i++)

            {

                // console.log("Here is the first dish id",finalDishIds[i]);

                addIntoDA(orderId,finalDishIds[i]).then((response)=>

                {

                   console.log("Successfully added into DA");

                //    console.log(response);

 

                }).catch((err)=>

                {

                    console.log(err);

                    message = "Error encountered while adding into dish assignment";

                    res.send({

                        'isSuccessful':isSuccessful,

                        'message':message

                    });

                   connectionString.end();

                });

            }

            message = "Succesfully added";

            isSuccessful = true;

            res.send({

                'isSuccessful':isSuccessful,

                'message':message

            });
        }

    });

}
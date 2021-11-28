import dotenv from "dotenv";
import mysql from 'mysql';
import express from 'express';
import {v4 as uuidv4} from "uuid";
dotenv.config({path:"./src/Backend/.env"});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var checkUnique = true;
export const addOrderItem = async(res,req) =>
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
    // console.log(req);
    
    //let typeOfOrder = req.body.typeOfOrder;
    //let OrderStatus = req.body.orderStatus;
    //let totalBill = req.body.totalBill;
    //let listOrders = req.body.listOrders;//list orders is an array of order IDs that the user wishes to place an order of
    //let dishIds = Object.values(JSON.parse(listOrders));
    //console.log(dishIds[0]);
    //let checkAdditionOrder = 0;
    //let finalDishIds = dishIds[0];
    //let noOfOrders = finalDishIds.length;
    //console.log("This is the number of orders",noOfOrders);
    //list orders is an array of order IDs that the user wishes to place an order of  
    //insert into orders table first
    let addDishAssignment = "";
    /*let addOrderQuery = `INSERT INTO dumpling.order (orderId,typeOfOrder,OrderStatus,totalBill,createdAt)
    VALUES("${orderId}",${typeOfOrder},${OrderStatus},${totalBill},NOW());`;*/
    let bit = true
        while(bit)
        {
            await findid().then((response)=>
            {
                console.log(response);
                bit = false;
            }).catch((err)=>
            {
                console.log(err)
            });
            console.log("loppy");
    }
    console.log(req.body);
    // console.log(checkAdditionOrder);
}
function  findid()
{
    return new Promise((resolve,reject)=>
    {
        var connectionString = mysql.createConnection(
            {
                    host:process.env.host,
                    user: process.env.user,
                    password:process.env.password,
                    database:process.env.database
        
            }
            );
            let orderId = uuidv4();
            let checkQuery =`SELECT * FROM dumpling.order WHERE order.orderId = "${orderId}"`;
            connectionString.query(checkQuery, (err,res)=>
            {
                if(err)
                {
                    console.log("error");
                    reject("querry failed");
                    connectionString.end();
                }
                else{
                    if(res.length===0)
                    {
                        resolve(orderId);
                        connectionString.end();
                    }
                    else{
                        reject("order id in used");
                        connectionString.end();
                    }
                }

            });

    });
}
import dotenv from "dotenv";
import mysql from 'mysql';
import express from 'express';
import bodyParser from "body-parser";
import {v4 as uuidv4} from "uuid";
dotenv.config({path:"./src/Backend/.env"});
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
function findDishId()

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

        let dishId1= uuidv4();

        let checkQuery =`SELECT * FROM dumpling.menu WHERE menu.dishId = "${dishId1}"`;

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

                    resolve(dishId1);

                    connectionString1.end();

                }

                else

                {

                    reject("dish id in use");

                    connectionString1.end();

                }

            }

        });

    });

}
function getChef(employeeid)
{
    return new Promise((resolve,reject)=>{
        var connectionString1 = mysql.createConnection(

            {
                    host:process.env.host,
                    user: process.env.user,
                    password:process.env.password,
                    database:process.env.database
    
            });
            let getChefquery = `SELECT employee.employeeId from dumpling.employee INNER JOIN account ON account.accountId=employee.accountId WHERE employee.employeeId=${employeeid} AND account.accountType="chef"`
            connectionString1.query(getChefquery,(err,result)=>{
                if(err)
                {
                    console.log("Error found");
                    console.log(err);
                    reject("query failed");
                    connectionString1.end();
                }
                else
                {
                    console.log("Found the chef successfully");
                    resolve(result[0].employeeId);
                    connectionString1.end();
                }
            })
    })
    
}
export const addMenuItem = async (req,res)=>
{
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database
        }

    );
    let dishId2;
    let bit = true;
    while(bit)
    {
        await findDishId().then((response)=>{
            dishId2 = response;
            bit = false;
            console.log("Exiting the while loop");
        }).catch((err)=>{
            console.log(err);
        })
    }
    let message ="";
    let isSuccessful = false;
    let dishName = req.body.dishName;
    let employeeId = req.body.employeeId;
    let dishType = req.body.dishType;
    let preparationTime = req.body.preparationTime;
    let dishPrice = req.body.dishPrice;
    let calories = req.body.calories;
    let dishOfday = req.body.dishOfday;
    let allergens = req.body.allergens;
    let image = req.body.image;
    let addDishQuery =
    `INSERT INTO dumpling.menu (dishId,dishName,dishType,dishPrice,preparationTime,calories,dishOfday,allergens,image,createdAt)
    VALUES("${dishId2}","${dishName}","${dishType}",${dishPrice},${preparationTime},${calories},${dishOfday},"${allergens}","${image}",NOW());`;
    connectionString.connect((error)=>{
        if(error)
        {

            console.log(error);

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
                    let ansquery = `SELECT employee.employeeId from dumpling.employee INNER JOIN account ON account.accountId=employee.accountId WHERE employee.employeeId=${employeeId} AND account.accountType="chef"`
                    let addintochefassignment =  `INSERT INTO dumpling.chefassignment(dishID,chefId)VALUES("${dishId2}",(${ansquery}))`;
                    var connectionString2 =  mysql.createConnection(
                        {
                            host:process.env.host,
                            user: process.env.user,
                            password:process.env.password,
                            database:process.env.database
                        }
                
                    );
                    connectionString2.query(addintochefassignment,(err,result)=>{

                        if(err){
                            // console.log(err);
                            message = "Cannot assign dish to chef as chef did not exists";
                            let updateMenu = `UPDATE dumpling.menu SET archived = 1 WHERE menu.dishId="${dishId2}"`;
                            var connectionString3 =  mysql.createConnection(
                                {
                                    host:process.env.host,
                                    user: process.env.user,
                                    password:process.env.password,
                                    database:process.env.database
                                }
                        
                            );
                            connectionString3.query(updateMenu,(err,result)=>{
                                if(err)
                                {
                                    message = "Cannot delete the item from menu";
                                    res.send({
                                        'isSuccessful':isSuccessful,
                                        'message':message
                                    })
                                    connectionString3.end();
                                    connectionString2.end();
                                }
                                else{
                                    message = "Failed to add menu item as ched id did not existed";
                                    res.send({
                                        'isSuccessful':isSuccessful,
                                        'message':message
                                    });
                                    connectionString3.end();
                                    connectionString2.end();
                                }
                            })
                            
                        }
                        else
                        {
                            message = "assigned the dish to the chef";
                            isSuccessful =true; 
                            res.send({
                                'isSuccessful':isSuccessful,
                                'message':message
                            });
                            connectionString2.end();
                        }
                    })

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
    let deleteDish = `UPDATE dumpling.menu SET menu.archived =1, menu.updateAt=NOW() WHERE menu.dishId=${dishId}`;
    connectionString.query(deleteDish,(err,result)=>
    {
        if(err)
        {
            message = "Dish not deleted";
            console.log(err);
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
    let fetchIds = `SELECT dishId, dishName, allergens, dishPrice, archived from dumpling.menu`;
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
            if(result.length === 0)
            {
                message = "Found no dishes";
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
                
                let result1 = [];
                let isArchived = [];
                for(var i=0;i<result.length;i++)
                {
                    isArchived.push(result[i].archived);
                }
                for(var i =0;i<result.length;i++)
                {
                    if(isArchived[i]===0)
                    {
                        result1.push(JSON.parse(JSON.stringify(result[i])));
                    }
                }
                res.send(
                    {
                        'isSuccessful':isSuccessful,
                        'message':message,
                        'result':result1
                    }
                );
                connectionString.end();
            }
           
        }
    });
}
export const viewPlacedOrders = (req,res)=>
{
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database

        }
    );
    let placedOrderQuery = ` SELECT dishassignment.orderNo,menu.dishName,orders.orderStatus
    from dishassignment 
    INNER JOIN dumpling.menu ON dishassignment.dishNo=menu.dishId
    INNER JOIN dumpling.orders ON dishassignment.orderNo = orders.orderId
    WHERE menu.archived = 0`;
    let message = "";
    let isSuccessful = false;
    connectionString.query(placedOrderQuery,(err,result)=>
    {
        if(err)
        {
            message = "Nothing is fetched from the db";
            console.log(err);
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
            if(result.length === 0)
            {
                message = "No menu items to display";
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
                message = "The Placed order are";
                isSuccessful = true;
                console.log(result);
                res.send(
                    {
                        "isSuccessful":isSuccessful,
                        "message":message,
                        'result':result
                    }
                );
                connectionString.end();
            }
        }
    });
}

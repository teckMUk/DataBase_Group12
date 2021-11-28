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
    let dishPrice = req.body.dishPrice;
    let preparationTime = req.body.preparationTime;
    //let dishPrice = req.body.dishPrice;
    let calories = req.body.calories;
    let dishOfday = req.body.dishOfday;
    let allergens = req.body.allergens;
    let image = req.body.image;
    let addDishQuery =
    `INSERT INTO dumpling.menu (dishName,dishType,dishPrice,preparationTime,calories,dishOfday,allergens,image,createdAt)
    VALUES("${dishName}","${dishType}",${dishPrice},${preparationTime},${calories},${dishOfday},"${allergens}","${image}",NOW());`;
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
                    console.log("Dish added to the menu successfully");
                    isSuccessful = true;
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
    let deleteDish = `UPDATE dumpling.menu SET menu.archived =1, menu.updatedAt=NOW() WHERE menu.dishId=${dishId}`;
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
                console.log(result);
                let dishIds = [];
                let dishNames = [];
                let dishAllergens = [];
                let dishPriceForManydishes = [];
                let isArchived =[];
                for(var i=0;i<result.length;i++)
                {
                    isArchived.push(result[i].archived);
                }
                for(var i =0;i<result.length;i++)
                {
                    if(isArchived[i]===0)
                    {
                        dishIds.push(result[i].dishId);
                        dishNames.push(result[i].dishName);
                        dishAllergens.push(result[i].allergens);
                        dishPriceForManydishes.push(result[i].dishPrice);
                    }
                }
                res.send(
                    {
                        'isSuccessful':isSuccessful,
                        'message':message,
                        'dishIDs':dishIds,
                        'dishNames':dishNames,
                        'allergens':dishAllergens,
                        'dishPrice':dishPriceForManydishes
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
    let orderPlaced = "placed";
    let placedOrderQuery = `SELECT * from dumpling.orders WHERE orders.orderStatus = "${orderPlaced}"`;
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
                message = "The menu items are fetched";
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

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
        }
    });
}

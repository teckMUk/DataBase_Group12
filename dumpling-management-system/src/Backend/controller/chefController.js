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
    let dishId = req.body.dishId;
    let deleteDish = `DELETE FROM dumpling.menu WHERE menu.dishId=${dishId}`;
    let isSuccessful = false;
    let message = "";
    connectionString.query(deleteDish,(err,result)=>
    {
        if(err)
        {
            message = "Dish with the Id specified doesnt exist";
            res.send({
                'isSuccessful':isSuccessful,
                'message':message
            });
            connectionString.end();
        }
        else
        {
            message = "Dish Successfully deleted";
            isSuccessful = true;
            res.send({
                'isSuccessful':isSuccessful,
                'message':message
            });
            connectionString.end();
        }
    });
}
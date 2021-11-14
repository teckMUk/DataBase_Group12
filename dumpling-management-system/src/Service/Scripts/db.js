const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded(true));

var connectionString = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password:'Emaan@123',
    }
);
connectionString.connect((error)=>
{
    if(!error)
    {
        console.log("Connection has been established");
        connectionString.query("CREATE DATABASE dumpling", (err2,result) =>
        {
            if(err2)
            {
                console.log(err2);
            }
            else{
                console.log("Database Created");
                console.log(result);
            }
        });
    }
    else
    {
        console.log("Connection failed");
        console.log(error);
    }
});
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}`));





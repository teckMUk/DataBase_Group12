import dotenv from "dotenv";
import mysql from 'mysql';
import express from 'express';
import bodyParser from 'body-parser';
import sha1 from 'sha1';
dotenv.config({path:"./src/Backend/.env"});
var app = express();
app.use(bodyParser.urlencoded({extended:true}));

var connectionString = mysql.createConnection(
    {
        host:process.env.host,
        user: process.env.user,
        password:process.env.password,
        database:process.env.database
    }
);
function seedData(q)
{
    connectionString.query(q,
    (err2,result)=>
    {
        if(err2)
        {
            console.log("Seeding Failed");
            console.log(err2);
        }
        else
        {
            console.log("Seeding done");
            //console.log(result);
        }
     });
}
let password = "dumpling@123";
let hash = sha1(password);
const addAdminaccount = `INSERT INTO dumpling.account (userName,accountType,currentPassword,emailAddress,securityQuestions,createdAt)
 VALUES("admin","admin","${hash}","dumpling@gmail.com","None",NOW());`;
const addAmdinemployee = `INSERT INTO dumpling.employee (employeeName,dateOfBirth,phoneNumber,address,position,salary,bankAccountNumber,createdAt,accountId)
VALUES("MEANE",'2001-7-01',"+92321456789","Street 10,DHA phase 5 lums","CEO",105000,011401533,NOW(),(SELECT accountId from account where account.accountType="admin"));`;
connectionString.connect( (err)=>
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        seedData(addAdminaccount);
        seedData(addAmdinemployee);
        connectionString.end();
    }
});
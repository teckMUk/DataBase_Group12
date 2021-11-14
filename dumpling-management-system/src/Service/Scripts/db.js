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
function createTable(q)
{
    connectionString.query(q,
        (err,result)=>
        {
            if(err)
            {
                console.log("Table creation failed");
                console.log(err);
            }
            else
            {
                console.log("Table created");
                //console.log(result);
            }
        })
}
const createAccount = `CREATE TABLE IF NOT EXISTS dumpling.account(
    accountId INT NOT NULL,
    username VARCHAR(45) NOT NULL,
    accountType VARCHAR(45) NOT NULL,
    currentPassword VARCHAR(50) NOT NULL,
    previousPassword VARCHAR(50) NOT NULL,
    emailAddress VARCHAR(320) NOT NULL,
    securityQuestions VARCHAR(2000) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    archived BIT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (accountId));`;
    const createEmpolyee = `CREATE TABLE IF NOT EXISTS dumpling.employee(
        employeeId INT NOT NULL,
        employeeName VARCHAR(100) NOT NULL,
        dateOfBirth DATE NOT NULL,
        phoneNumber VARCHAR(15) NOT NULL,
        address VARCHAR(100) NOT NULL,
        position VARCHAR(45) NOT NULL,
        salary INT NOT NULL,
        bankAccountNumber BIGINT(20) NOT NULL,
        createdAt DATETIME(1) NOT NULL,
        updatedAt DATETIME(1) NOT NULL,
        archived BIT(1) NOT NULL DEFAULT 0,
        accountId INT NOT NULL,
        PRIMARY KEY (employeeId),
        CONSTRAINT accountId
            FOREIGN KEY (accountId)
            REFERENCES dumpling.account (accountId)
            ON DELETE CASCADE
            ON UPDATE CASCADE);`;
connectionString.connect((error)=>
{
    if(!error)
    {
        console.log("Connection has been established");
        connectionString.query("CREATE DATABASE IF NOT EXISTS dumpling", (err2,result) =>
        {
            if(err2)
            {
                console.log(err2);
            }
            else{
                console.log("Database Created");
                createTable(createAccount);
                createTable(createEmpolyee);
                connectionString.end();
                //console.log(result);
            }
        });
    }
    else
    {
        console.log("Connection failed");
        console.log(error);
    }
});

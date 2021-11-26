import dotenv from "dotenv";
import mysql from 'mysql';
import express from 'express';
import bodyParser from 'body-parser';
dotenv.config({path:"./src/Backend/.env"});
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

var connectionString = mysql.createConnection(
    { 
        host:process.env.host,
        user: process.env.user,
        password:process.env.password
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
        });
}

const createSalesRecord = `CREATE TABLE IF NOT EXISTS dumpling.salesrecord (
    salesId INT NOT NULL,
    orderId INT NOT NULL,
    date DATE NOT NULL,
    createdAt DATETIME NOT NULL,
    updateAt DATETIME DEFAULT NULL,
    archived BIT(1) NOT NULL,
    PRIMARY KEY (salesId),
    INDEX orderId_idx (orderId ASC) VISIBLE,
    CONSTRAINT orderId
        FOREIGN KEY (orderId)
        REFERENCES dumpling.order (orderId)
        ON DELETE CASCADE
        ON UPDATE CASCADE);`;


const createOrder = `CREATE TABLE IF NOT EXISTS dumpling.order (
    orderId INT NOT NULL,
    couponId INT NULL,
    typeOfOrder VARCHAR(45) NOT NULL,
    OrderStatus VARCHAR(45) NOT NULL,
    totalBill DECIMAL NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME DEFAULT NULL,
    archived BIT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (orderId),
    INDEX couponId_idx (couponId ASC) VISIBLE,
    CONSTRAINT couponId
        FOREIGN KEY (couponId)
        REFERENCES dumpling.coupons (couponId)
        ON DELETE SET NULL
        ON UPDATE SET NULL);`;


const createAccount = `CREATE TABLE IF NOT EXISTS dumpling.account(
    accountId INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(45) NOT NULL,
    accountType VARCHAR(45) NOT NULL,
    currentPassword VARCHAR(100) NOT NULL,
    previousPassword VARCHAR(100),
    emailAddress VARCHAR(320) NOT NULL UNIQUE,
    securityQuestions VARCHAR(2000) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME DEFAULT NULL,
    archived BIT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (accountId));`;

    
const createEmpolyee = `CREATE TABLE IF NOT EXISTS dumpling.employee(
    employeeId INT NOT NULL AUTO_INCREMENT,
    employeeName VARCHAR(100) NOT NULL,
    dateOfBirth DATE NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    address VARCHAR(100) NOT NULL,
    position VARCHAR(45) NOT NULL,
    salary INT NOT NULL,
    bankAccountNumber BIGINT(20) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME DEFAULT NULL,
    archived BIT(1) NOT NULL DEFAULT 0,
    accountId INT NOT NULL,
    PRIMARY KEY (employeeId),
    CONSTRAINT accountId
        FOREIGN KEY (accountId)
        REFERENCES dumpling.account (accountId)
        ON DELETE CASCADE
        ON UPDATE CASCADE);`;
const createMenu = `CREATE TABLE IF NOT EXISTS dumpling.menu (
    dishId INT NOT NULL AUTO_INCREMENT,
    dishName VARCHAR(45) NOT NULL,
    dishType VARCHAR(45) NOT NULL,
    preparationTime INT NOT NULL,
    calories INT NOT NULL,
    dishOfday INT NOT NULL,
    allergens VARCHAR(450) NULL,
    image VARCHAR(45) NULL,
    createdAt DATETIME NOT NULL,
    updateAt DATETIME DEFAULT NULL,
    archived BIT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (dishId));`;

const createCoupoun = `CREATE TABLE IF NOT EXISTS dumpling.coupons (
    couponId INT NOT NULL,
    couponName VARCHAR(45) NOT NULL,
    discount INT NOT NULL,
    issueDate DATE NOT NULL,
    expiryDate DATE NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME DEFAULT NULL,
    archived BIT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (couponId));`;
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
            else
            {
                console.log("Database Created");
                createTable(createAccount);
                createTable(createEmpolyee);
                createTable(createMenu);
                createTable(createCoupoun);
                createTable(createOrder);
                createTable(createSalesRecord);
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

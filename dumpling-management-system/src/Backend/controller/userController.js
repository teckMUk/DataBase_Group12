import dotenv from "dotenv";
import mysql from 'mysql';
import express from 'express';
import bodyParser from "body-parser";
import sha1 from 'sha1';
dotenv.config({path:"./src/Backend/.env"});
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


export const findUsers = (req,res)=>
{
    // console.log(process.env.password);
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database

        }
    );
    let email = req.body.email;
    let password = req.body.password;
    let message ="";
    let isSuccessful = false;
    connectionString.connect((err)=>{
        if(err)
        {
            console.log("Error found");
            console.log(err);
            message = "Connect to db failed";
            res.send(
                {
                    'isSuccessful':isSuccessful,
                    'message':message
                }
            )
            connectionString.end();
        }
        else
        {
           let loginQuery = `SELECT  account.accountID, account.currentPassword, account.accountType FROM account WHERE account.emailAddress="${email}"`;
           connectionString.query(loginQuery,(err,result)=>{
               if(err)
               {
                console.log("No user found");
                console.log(err);
                isSuccessful = false;
                message = "No account with this email address found";
                res.send(
                {
                    'isSuccessful':isSuccessful,
                    'message':message
                });
                connectionString.end();
               }
               else
               {
                   if(result.length===0)
                   {
                       isSuccessful = false;
                       message = "NO user found"
                       res.send(
                           {
                                'isSuccessful':isSuccessful,
                                 'message':message
                           }
                       );
                   }
                    console.log("User found");
                    console.log(result);
                    let queryPassword = result[0].currentPassword;
                    let accountType = result[0].accountType;
                    let ID = result[0].accountID;
                    if(sha1(password)===queryPassword)
                    {
                        isSuccessful = true;
                        message = "Login successful";
                        res.send(
                            {
                            'isSuccessful':isSuccessful,
                            'message':message,
                            'role':accountType,
                            'ID':ID
                        });
                        connectionString.end();
                    }
                    else
                    {
                        isSuccessful = false;
                        message = "Invalid Credentials";
                        res.send(
                            {
                                'isSuccessful':isSuccessful,
                                'message':message,
                            }
                        );
                        connectionString.end();
                    }    
               }
           });

        }
       
    });
}
export const addUser = (req,res)=>{
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
    let currPass = sha1(req.body.currentPassword);
    let validateQuery =  `SELECT * FROM account WHERE emailAddress="${req.body.emailAddress}"`;
    // let bankaccount = sha1(req.body.bankAccountNumber);
    let addAccountquery =
    `INSERT INTO account (userName,accountType,currentPassword,emailAddress,securityQuestions,createdAt)
        VALUES("${req.body.userName}","${req.body.accountType}","${currPass}","${req.body.emailAddress}","${req.body.securityQuestions}",NOW());`;
    let addEmployeequery = `INSERT INTO dumpling.employee (employeeName,dateOfBirth,phoneNumber,address,position,salary,bankAccountNumber,createdAt,accountId)
    VALUES("${req.body.employeeName}","${req.body.dateOfBirth}","${req.body.phoneNumber}","${req.body.address}","${req.body.position}","${req.body.salary}","${req.body.bankAccountNumber}",NOW(),(SELECT accountId from account where account.emailAddress="${req.body.emailAddress}"));`
    connectionString.connect((err)=>
    {
        if(err)
        {
            console.log("Error found");
            console.log(err);
            message = "Connect to db failed";
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
            console.log("Connection made with database");
            connectionString.query(validateQuery,(errval,result)=>
            {
                if(errval)
                {
                    console.log("validateQuery failed");
                    console.log(errval)
                    message = "Unable to validate email address atm";
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
                        // console.log("validation passed");
                        connectionString.query(addAccountquery,(errUser,result)=>
                        {
                            if(errUser)
                            {
                                console.log("Failed to create account");
                                console.log(errUser);
                                message ="Failed to create user account";
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
                                connectionString.query(addEmployeequery,(errUser,result)=>
                                {
                                    if(errUser)
                                    {
                                        console.log("Failed to create account");
                                        console.log(errUser);
                                        message="Failed to create user account";
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
                                        console.log("User DataBase Created");
                                        isSuccessful=true;
                                        message="User has been created";
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
                    else{
                        console.log("Account already exist");
                        message = "Account with this email address already exist";
                        res.send(
                            {
                                "isSuccessful":isSuccessful,
                                "message":message
                            }
                        );
                        connectionString.end();
                    }
                }
            });

        }
    });
}
export const getSQ = (req,res)=>{
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
    let emailAdress = req.body.email;
    let emailQuery = `SELECT securityQuestions FROM account WHERE emailAddress="${emailAdress}"`;
    connectionString.connect((err)=>{
        if(err)
        {
            console.log(err);
            message = "Network error";
            res.send({
                'isSuccessful':isSuccessful,
                'message':message
            });
            connectionString.end()
        }
        else
        {
            connectionString.query(emailQuery,(err,result)=>{
                console.log("Connection made with database");
                if(err)
                {
                    console.log("Error found");
                    // console.log(err);
                    message = "email not found";
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
                    if(result.length!=0)
                    {
                        console.log(result);
                        message = "Questions found";
                        isSuccessful = true;
                        res.send({
                            'isSuccessful':isSuccessful,
                            'message':message,
                            'questions':result[0].securityQuestions
                        });
                        connectionString.end();
                    }
                    else
                    {
                        message = "No account with this email address exist";
                        console.log("No User found");
                        res.send({
                            'isSuccessful':isSuccessful,
                            'message':message
                        });
                    }

                }
            });
        }
    });
}

export const changePassword = (req,res) =>{
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database

        }
    );
    let ID = req.body.ID;
    let newPassword = sha1(req.body.newPassword);
    let message ="";
    let isSuccessful = false;
    let role = "";
    let currentPassword = sha1(req.body.currentPassword);

    let validateID = `SELECT account.currentPassword,account.previousPassword FROM account WHERE account.accountId =${ID}`;
    connectionString.query(validateID, (err,result)=>{
        if (err)
        {
            console.log(err);
            message = "user does not exist";
            res.send({
                'isSuccessful' : isSuccessful,
                'message' : message

            });
            connectionString.end();
        }
        else
        {
            if(result.length === 0)
            {
                isSuccessful = false;
                message = "the user does not exists";
                res.send({
                    'isSuccessful':isSuccessful,
                    'message':message
                });
                connectionString.end();
            }
            console.log(result);
            console.log(result[0].previousPassword);
            if(result[0].previousPassword !== null)
            {
                let prevPrevPassword = result[0].previousPassword;
                let currentPassword1 = result[0].currentPassword;
                if(currentPassword1 === currentPassword)
                {
                    console.log("password matched");
                    prevPrevPassword = currentPassword;
                    currentPassword1 = newPassword;
                    let updatePassQuery = `UPDATE dumpling.account SET account.currentPassword = "${currentPassword1}", account.previousPassword = "${prevPrevPassword}",account.updatedAt = NOW() WHERE account.accountId = ${ID}`;
                    connectionString.query(updatePassQuery, (err,result)=>{
                    if(err)
                    {
                        console.log(err);
                        message = "updation failed";
                        res.send({
                            'isSuccessful':isSuccessful,
                            'message':message

                        });
                        connectionString.end();
                    }
                    else
                    {
                        message = "updated successfully";
                        isSuccessful = true;
                        res.send({
                            'isSuccessful' : isSuccessful,
                            'message': message
                        });
                        connectionString.end();
                    }
                });
                }
                else
                {
                    isSuccessful = false;
                    message = "Password dont match";
                    res.send({
                        'isSuccessful':isSuccessful,
                        'message':message

                    });
                    connectionString.end();
                }
            }
                else
                {
                    console.log("password is NULL");
                    let currentPassword1 = result[0].currentPassword;
                    if(currentPassword1 === currentPassword)
                    {
                        console.log("password matched");
                        let prevPrevPassword = currentPassword;
                        currentPassword1 = newPassword;
                        let updatePassQuery = `UPDATE dumpling.account SET account.currentPassword = "${currentPassword1}", account.previousPassword = "${prevPrevPassword}",account.updatedAt=NOW() WHERE account.accountId = ${ID}`;
                        connectionString.query(updatePassQuery, (err,result)=>{
                            if(err)
                            {
                                console.log(err);
                                message = "updation failed";
                                res.send({
                                    'isSuccessful':isSuccessful,
                                    'message':message

                                });
                                connectionString.end();
                            }
                            else
                            {
                                message = "updated successfully";
                                isSuccessful = true;
                                res.send({
                                    'isSuccessful' : isSuccessful,
                                    'message': message
                                });
                                connectionString.end();
                            }
                    });
                }
                else{
                    isSuccessful = false;
                    message = "Password dont match";
                    res.send({
                        'isSuccessful':isSuccessful,
                        'message':message

                    });
                    connectionString.end();
                }


            }

    }

    });
}

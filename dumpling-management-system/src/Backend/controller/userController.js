import mysql from 'mysql';
import express from 'express';
import bodyParser from "body-parser";
import sha1 from 'sha1';
const app = express();
app.use(bodyParser.urlencoded({extended:true}));



export const findUsers = (req,res)=>
{   
    var connectionString = mysql.createConnection(
        {
            host:'localhost',
            user: 'root',
            password:'Emaan@123!',
            database: 'dumpling'
            
        }
    );
    let email = req.body.email;
    let password = req.body.password;
    let message ="";
    let isSuccessful = false;
    let role = "";
    connectionString.connect((err)=>{
        if(err)
        {
            console.log("Error found");
            console.log(err);
            message = "Connect to db failed";
            connectionString.end((err)=>
            {
                if(err)
                {
                    console.log("Connection to db failed to close");
                    res.send({
                    'isSuccessful':false,
                    'message':"Network error"
                });
                }
                else
                {
                console.log("Connection successfully closed");
                res.send({
                    'isSuccessful':isSuccessful,
                    'message':message,
                    'accountRole':role
                });
                
                }
            });
        }
        else
        {
           let loginQuery = `Select account.currentPassword, account.accountType from account where account.emailAddress="${email}"`;
           connectionString.query(loginQuery,(err,result)=>{
               if(err)
               {
                console.log("No user found");
                console.log(err);
                isSuccessful = false;
                message = "No account with this email address found";
                connectionString.end((err)=>
                {
                    if(err)
                    {
                        console.log("Connection to db failed to close");
                        res.send({
                         'isSuccessful':false,
                         'message':"Network error"
                    });
                    }
                    else
                    {
                     console.log("Connection successfully closed");
                     res.send({
                         'isSuccessful':isSuccessful,
                         'message':message,
                         'accountRole':role
                     });
                     
                    }
                });          
               }
               else
               {
                    console.log("User found");
                    console.log(result);
                    let queryPassword = result[0].currentPassword;
                    let accountType = result[0].accountType;
                    if(sha1(password)===queryPassword)
                    {
                        isSuccessful = true;
                        message = "Login successful";
                        role = accountType;
                        connectionString.end((err)=>
                        {
                            if(err)
                            {
                                console.log("Connection to db failed to close");
                                res.send({
                                'isSuccessful':false,
                                'message':"Network error"
                            });
                            }
                            else
                            {
                            console.log("Connection successfully closed");
                            res.send({
                                'isSuccessful':isSuccessful,
                                'message':message,
                                'accountRole':role
                            });
                            
                            }
                        });    
                    }
                    else
                    {
                        isSuccessful = false;
                        message = "Invalid Credentials";
                        connectionString.end((err)=>
                        {
                            if(err)
                            {
                                console.log("Connection to db failed to close");
                                res.send({
                                'isSuccessful':false,
                                'message':"Network error"
                            });
                            }
                            else
                            {
                            console.log("Connection successfully closed");
                            res.send({
                                'isSuccessful':isSuccessful,
                                'message':message,
                                'accountRole':role
                            });
                            
                            }
                        });
                    } 
                     
               }
           });  
           
        }

       
    });
}
export const addUser = (req,res)=>{
    var connectionString = mysql.createConnection(
        {
            host:'localhost',
            user: 'root',
            password:'Emaan@123',
            database: 'dumpling'
            
        }
    );
    let message ="";
    let isSuccessful = false;
    let validateQuery =  `SELECT * FROM account WHERE emailAddress="${req.body.emailAddress}"`;
    // let bankaccount = sha1(req.body.bankAccountNumber);
    let addAccountquery = 
    `INSERT INTO account (userName,accountType,currentPassword,emailAddress,securityQuestions,createdAt) 
        VALUES("${req.body.userName}","${req.body.accountType}","${req.body.currentPassword}","${req.body.emailAddress}","${req.body.securityQuestions}",NOW());`;
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
                        console.log("validation passed");
                        connectionString.query(addAccountquery,(errUser,result)=>
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
            host:'localhost',
            user: 'root',
            password:'Emaan@123!',
            database: 'dumpling'
            
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
                    if(result.length!==0)
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
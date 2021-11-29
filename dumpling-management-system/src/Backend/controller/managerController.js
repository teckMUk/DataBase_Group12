import dotenv from "dotenv";
import mysql from 'mysql';
import express from 'express';
import bodyParser from "body-parser";
dotenv.config({path:"./src/Backend/.env"});
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

export const updateEmployeeSalary = (req,res)=>
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
    let employeeId = req.body.employeeId;
    let updatedSalary = req.body.updatedSalary;
    let checkForId = req.body.checkId;
    let checkForIdQuery = `SELECT account.accountType FROM dumpling.account WHERE account.accountId=${checkForId}`;
    let updateSalaryQuery = `UPDATE dumpling.employee SET employee.salary=${updatedSalary},employee.updatedAt=NOW() WHERE employee.employeeId =${employeeId}`;
    connectionString.query(checkForIdQuery,(err,result)=>
    {
        if(err)
        {
            message = "Cannot get the employees";
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
            if(result[0].accountType === "admin"|| result[0].accountType === "Admin"  || result[0].accountType === "manager"||  result[0].accountType === "Manager")
            {
                console.log("Manager or admin role found");
                var connectionString1= mysql.createConnection(
                    {
                        host:process.env.host,
                        user: process.env.user,
                        password:process.env.password,
                        database:process.env.database
                    }
            
                );
                connectionString1.query(updateSalaryQuery,(err,result)=>
                {
                    if(err)
                    {
                        message = "Failed to update the salary";
                        res.send(
                            {
                                "isSuccessful":isSuccessful,
                                "message":message 
                            }
                        );
                        connectionString1.end();
                    }
                    else
                    {
                        message = "Successfully updated the salary of the given employee";
                        isSuccessful = true;
                        res.send(
                            {
                                "isSuccessful":isSuccessful,
                                "message":message 
                            }
                        );
                        connectionString1.end();
                    }
                });
            }
            else
            {
                message = "Not an admin or Manager";
                isSuccessful = false;
                res.send({
                    "isSuccessful":isSuccessful,
                    "message":message 
                });
                connectionString.end();
            }
        }
    }); 
}
export const fetchAllEmployee = (req,res)=>
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
    let fetchQuery = `SELECT employee.employeeId, employee.employeeName, employee.salary , employee.position, employee.archived FROM dumpling.employee`;
    connectionString.query(fetchQuery,(err,result)=>
    {
        if(err)
        {
            message = "Could not fetch the details for the employees";
            res.send(
                {
                    "isSuccessful":isSuccessful,
                    "message":message 
                }
            )
        }
        else
        {
            message = "Successfully fetched the details of the employees";
            // console.log(result);
            // console.log(result.length);
            isSuccessful = true;
            let result1 = [];
            let isArchived = [];
            for(var i=0;i<result.length;i++)
            {
                // console.log(result)
                isArchived.push(result[i].archived);
            }
            for(var i=0;i<result.length;i++)
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
        }
    });
}
export const giveBonuses = (req,res)=>
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
    let checkForId = req.body.checkId;
    let giveBonusToEmployeeId= req.body.employeeId;
    let reason = req.body.reason;
    let date = req.body.date;
    let checkForIdQuery = `SELECT account.accountType FROM dumpling.account WHERE account.accountId=${checkForId}`;
    let giveBonus = `INSERT INTO dumpling.bonus(employeeId,reason,date,createdAt) VALUES (${giveBonusToEmployeeId},${reason},"${date}",NOW())`;
    connectionString.query(checkForIdQuery,(err,result)=>
    {
        if(err)
        {
            message = "Cannot get any employee";
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
            if(result[0].accountType === "admin"|| result[0].accountType === "Admin"  || result[0].accountType === "manager"||  result[0].accountType === "Manager")
            {
                console.log("Manager or admin found");
                var connectionString1= mysql.createConnection(
                    {
                        host:process.env.host,
                        user: process.env.user,
                        password:process.env.password,
                        database:process.env.database
                    }
                );
                connectionString1.query(giveBonus,(err1,result1)=>
                {
                    if(err1)
                    {
                        message = "Cannot give bonus to the employee";
                        console.log(err1);
                        res.send({
                            "isSuccessful":isSuccessful,
                            "message":message 
                        });
                    }
                    else
                    {
                        message = "Given the bonus and made an entry in the bonus table";
                        isSuccessful = true;
                        res.send({
                            "isSuccessful":isSuccessful,
                            "message":message 
                        });
                    }
                });

            }
            else
            {
                message = "Not an admin or manager";    
                res.send({
                    "isSuccessful":isSuccessful,
                    "message":message 
                });
            connectionString.end();
            }
        }
    });
}
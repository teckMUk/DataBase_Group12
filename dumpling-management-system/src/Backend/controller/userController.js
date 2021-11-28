import dotenv from "dotenv";
import mysql from 'mysql';
import express from 'express';
import bodyParser from "body-parser";
import sha1 from 'sha1';
dotenv.config({path:"./src/Backend/.env"});
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


export const findUsers = (req,res)=>
{
    console.log(req.body);
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
    connectionString.connect((err) => {
        if (err) {
            console.log("Error found");
            console.log(err);
            message = "Connect to db failed";
            res.send(
                {
                    'isSuccessful': isSuccessful,
                    'message': message
                }
            );
            connectionString.end();
        }
        else {
            let loginQuery = `SELECT account.accountId,account.currentPassword, account.accountType FROM account WHERE account.emailAddress="${email}" and account.archived=0`;
            connectionString.query(loginQuery, (err, result) => {
                if (err) {
                    console.log("No user found");
                    console.log(err);
                    isSuccessful = false;
                    message = "Query execution failed";
                    res.send(
                        {
                            'isSuccessful': isSuccessful,
                            'message': message
                        });
                    connectionString.end();
                }
                else {
                    if (result.length === 0) {
                        isSuccessful = false;
                        message = "No user found";
                        res.send(
                            {
                                'isSuccessful': isSuccessful,
                                'message': message
                            }
                        );
                        connectionString.end();
                    }
                    else {
                        console.log("User found");
                        console.log(result);
                        let queryPassword = result[0].currentPassword;
                        let accountType = result[0].accountType;
                        let ID = result[0].accountId;
                        if (sha1(password) === queryPassword) {
                            isSuccessful = true;
                            message = "Login successful";
                            res.send(
                                {
                                    'isSuccessful': isSuccessful,
                                    'message': message,
                                    'role': accountType,
                                    'Id': ID
                                });
                            connectionString.end();
                        }
                        else {
                            isSuccessful = false;
                            message = "Invalid Credentials";
                            res.send(
                                {
                                    'isSuccessful': isSuccessful,
                                    'message': message,
                                }
                            );
                            connectionString.end();
                        }
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
    let validateQuery =  `SELECT * FROM account WHERE emailAddress="${req.body.emailAddress}" and archived=0`;
    let secQuestions = req.body.securityQuestions;
    console.log('bef',secQuestions);
    let stringifysecQuestions = JSON.stringify(secQuestions);
    stringifysecQuestions = JSON.stringify(stringifysecQuestions);
    console.log('aft', stringifysecQuestions);
    let addAccountquery =
    `INSERT INTO account (userName,accountType,currentPassword,emailAddress,securityQuestions,createdAt)
        VALUES("${req.body.userName}","${req.body.accountType}","${currPass}","${req.body.emailAddress}",${stringifysecQuestions},NOW());`;
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
                    if(result.length!==0)
                    {
                        console.log(result);
                        let questions = Object.keys(JSON.parse(result[0].securityQuestions));
                        message = "Questions found";
                        isSuccessful = true;
                        res.send({
                            'isSuccessful':isSuccessful,
                            'message':message,
                            'questions': questions
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
    let currentPassword = sha1(req.body.currentPassword);
    console.log(currentPassword);

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
            console.log(result);
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
            else
            {
                console.log(result);
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
                    console.log("prevpassword is NULL");
                    let currentPassword1 = result[0].currentPassword;
                    console.log(currentPassword1);
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
            }

        }

    });
}
export const validateSecurity = (req,res)=>{
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database

        }
    );

    let answerOne = req.body.answerOne;
    let answerTwo = req.body.answerTwo;
    let message = "";
    let email = req.body.email;
    let isSuccessful = false;
    let queryValidate = `SELECT securityQuestions from dumpling.account WHERE account.emailAddress="${email}"`;
    connectionString.query(queryValidate,(err,result)=>{
        if(err)
        {
            message = "No email address found";
            res.send({
                'isSuccessful':isSuccessful,
                'message':message
            });
            connectionString.end();
        }
        else
        {
            if(result.length === 0)
            {
                message = "No user exists";
                res.send({
                    'isSuccessful':isSuccessful,
                    'message':message
                });
                connectionString.end();
            }
            else{
                // let securityQuestions = JSON.parse(result[0].securityQuestions);
                // console.log();
                let securityQuestions = JSON.parse(result[0].securityQuestions);
                console.log(securityQuestions);
                let answers = Object.values(securityQuestions);
                console.log(answers);
                if(answers[0]===answerOne && answerTwo === answers[1])
                {
                    message= "Answers matched";
                    isSuccessful = true;
                    res.send({
                        'isSuccessful':isSuccessful,
                        'message':message
                    });
                    connectionString.end();

                }
                else
                {
                    message = "Answers dont match";
                    isSuccessful = false;
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

export const accountExistence = (req, res) =>{

    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database

        }
    );
    let message = "";
    let testEmail = req.body.email;
    let isSuccessful = false;
    let checkExistence = `SELECT account.emailAddress FROM account WHERE account.emailAddress = "${testEmail}"`;
    connectionString.query(checkExistence,(err,result)=>{

        if(err)
        {  
            message = "Query execution failed";
            res.send({
                'isSuccessful':isSuccessful,
                'message':message
            });
            connectionString.end();

        }
        else
        {
            if(result.length === 0)
            {
                message = "No user found with the email given";
                res.send({
                    'isSuccessful':isSuccessful,
                    'message':message
                });
                connectionString.end();
            }

            else
            {
                message = "Account Exists";
                isSuccessful = true;
                res.send({
                    'isSuccessful':isSuccessful,
                    'message':message
                });
                connectionString.end();

            }
            
        

        }

    });

}


export const forgetPassword = (req,res)=>{
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database

        }
    );
    let email = req.body.email;
    let newPass = sha1(req.body.newPass);
    let message = "";
    let isSuccessful = false;
    let queryPass = `SELECT account.currentPassword, account.previousPassword FROM account WHERE account.emailAddress="${email}"`;
    connectionString.query(queryPass,(err,result)=>{
        if(err)
        {  
            message = "Query execution failed";
            res.send({
                'isSuccessful':isSuccessful,
                'message':message
            });
            connectionString.end();

        }
        else
        {
            if(result.length === 0)
            {
                message = "No user found with the email given";
                res.send({
                    'isSuccessful':isSuccessful,
                    'message':message
                });
                connectionString.end();
            }
            else
            {
                let prevPass = result[0].currentPassword;
                let queryUpdatePass = `UPDATE dumpling.account SET account.currentPassword="${newPass}",account.previousPassword="${prevPass}",account.createdAt=NOW() WHERE account.emailAddress="${email}"`;
                connectionString.query(queryUpdatePass,(err,result)=>{
                    if(err)
                    {
                        message = "Updation failed";
                        res.send({
                            'isSuccessful':isSuccessful,
                            'message':message
                        });
                    }
                    else
                    {
                       message = "Updation Succeeded";
                       isSuccessful = true;
                       res.send({
                           'isSuccessful':isSuccessful,
                           'message':message
                       });
                    }

           
                });
            }
        }
    });
   


}

export const updateAccount = (req,res) =>
{
    console.log('im called');
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database

        }
    );
    //check if person is admin
    
    let position = req.body.id;
    let emailCheck =  `SELECT * FROM account WHERE emailAddress="${req.body.emailAddress}"`;
    let updateQuery = `UPDATE account
                        SET accountType  = "${req.body.empPosition}",  updatedAt= NOW()
                        WHERE emailAddress = "${req.body.emailAddress}";`;
    let message ="";
    let isSuccessful = false;
    console.log(emailCheck);
    if(position === 'Admin' || position === 'admin' )
    {
        connectionString.connect((err) => {

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
            else{

           
            connectionString.query(emailCheck,(errEmail,result)=>{

                if(errEmail)
                {
                    console.log("validateQuery failed");
               
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
                    if(result.length !== 0)
                    {
                        
                        connectionString.query(updateQuery ,(errUser,result1)=>{
                            if(errUser)
                            {
                                console.log("Failed to update account");
                                console.log(errUser);
                                message ="Failed to update user account";
                                res.send(
                                    {
                                        "isSuccessful":isSuccessful,
                                        "message":message
                                    }
                                );
                                connectionString.end();
                            }
                            else{

                                    //email exists so update employee here
                                    console.log("User account updated");
                                    isSuccessful=true;
                                    message="User has been updated";
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
                    else{
                        console.log(result)
                        console.log("no email");
                        message = "this employee does not exist";
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
            //if it is admin write update query 
           
            }


        });
    
    }
    else
    {
        return;
    }

}


export const deleteAccount = (req,res) =>
{
   
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database

        }
    );
    //check if person is admin
  
    let emailCheck =  `SELECT * FROM account WHERE emailAddress="${req.body.emailAddress}"`;
    let updateQuery = `UPDATE account
                    SET archived=1
                    WHERE emailAddress="${req.body.emailAddress}";`;
    let updateEmp = `UPDATE employee
                    SET archived=1
                    WHERE accountId in (SELECT accountId FROM account WHERE emailAddress="${req.body.emailAddress}");`

    let message ="";
    let isSuccessful = false;
    console.log(emailCheck);
   
        connectionString.connect((err) => {

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
            else{

           
            connectionString.query(emailCheck,(errEmail,result)=>{

                if(errEmail)
                {
                    console.log("validateQuery failed");
               
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
                    if(result.length !== 0)
                    {
                        connectionString.query(updateQuery ,(errUser,result1)=>{
                            if(errUser)
                            {
                                console.log("Failed to delete account");
                                console.log(errUser);
                                message ="Failed to delete user account";
                                res.send(
                                    {
                                        "isSuccessful":isSuccessful,
                                        "message":message
                                    }
                                );
                                connectionString.end();
                            }
                            else{

                                    connectionString.query(updateEmp, (errEmp, res2)=> {
                                        if(errEmp)
                                        {
                                            console.log("Failed to delete account from employee");
                                            console.log(errUser);
                                            message ="Failed to delete employee account";
                                            res.send(
                                                {
                                                    "isSuccessful":isSuccessful,
                                                    "message":message
                                                }
                                            );
                                            connectionString.end();
                                        }

                                        else{
                                             //email exists so update employee here
                                            console.log("User account deleted");
                                            isSuccessful=true;
                                            message="User has been deleted";
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
                        console.log(result)
                        console.log("no email");
                        message = "this employee does not exist";
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
            //if it is admin write update query 
           
            }
        });
    
}
   
           

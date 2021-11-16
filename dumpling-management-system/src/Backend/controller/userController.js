import mysql from 'mysql';
import express from 'express';
import bodyParser from "body-parser";
import sha1 from 'sha1';
import express from 'express';
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

export const findUsers = (req,res)=>
{   
    var connectionString = mysql.createConnection(
        {
            host:'localhost',
            user: 'root',
            password:'Abdulmuizz30!',
            database: 'dumpling2'
            
        }
    );
    // console.log(req);
    let email = req.body.email;
    let password = req.body.password;
    let message ="";
    let isSuccessful = false;
    let role = "";
    console.log(email,password);
    connectionString.connect((err)=>{
        if(err)
        {
            console.log("Error found");
            // res.send({
            //     'isSuccessful':false,
            //     'message': "Connect to db failed"
            // });
            console.log(err);
            message = "Connect to db failed";
            
        }
        else
        {
           let loginQuery = `Select account.currentPassword, account.accountType from account where account.emailAddress="${email}"`;
           let message ="";
           let isSuccessful = false;
           let role = "";
           connectionString.query(loginQuery,(err,result)=>{
               if(err)
               {
                   console.log("No user found");
                   console.log(err);
                //    res.send({
                //        'isSuccessful':true,
                //        'message':"No account with this email address found"
                //    });
                isSuccessful = false;
                message = "No account with this email address found";
                   
               }
               else
               {
                    console.log("User found");
                    console.log(result);
                    let queryPassword = result[0].currentPassword;
                    let accountType = result[0].accountType;
                    if(sha1(password)==queryPassword)
                    {
                        // res.send({
                        //     'isSuccessful':true,
                        //     'message':"Login successful" ,
                        //     'accountRole':accountType  
                        // });
                        isSuccessful = true;
                        message = "Login successful";
                        role = accountType;

                        
                        
                    }
                    else
                    {
                        // res.send({
                        //     'isSuccessful':false,
                        //     'message':"Invalid Credentials"
                        // });
                        isSuccessful = false;
                        message = "Invalid Credentials";
                        
                    } 
                    connectionString.end((err)=>{
                        if(err){
                            console.log("Connection to db failed to close");
                            res.send({
                             'isSuccessful':false,
                             'message':"Network error"
                            })
                        }
                        else{
                         console.log("Connection successfully closed");
                         res.send({
                             'isSuccessful':isSuccessful,
                             'message':message,
                             'accountRole':role
                         });
                         
                        }
                    });        
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
            password:'Abdulmuizz30!',
            database: 'dumpling2'
            
        }
    );
    
    let addAccountQuery = `INSERT INTO account VALUES(1,"${req.body.accountId}","${req.body.accountType}","${req.body.createPassword}","${req.body.previousPassword}","${req.body.emailAddress}",${req.body.securityQuestions},NOW(),NULL,0)`;
    
}
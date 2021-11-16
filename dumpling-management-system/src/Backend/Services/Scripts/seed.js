import mysql from 'mysql';
import express from 'express';
import bodyParser from 'body-parser';
import sha1 from 'sha1';
var app = express();
app.use(bodyParser.urlencoded({extended:true}));

var connectionString = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password:'Abdulmuizz30!',
        database:'dumpling2'
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
const addAdminaccount = `INSERT INTO dumpling2.account VALUES(1,"admin","admin","${hash}",NULL,"dumpling@gmail.com","None",NOW(),NOW(),0);`;
const addAmdinemployee = `INSERT INTO dumpling2.employee VALUES(1,"MEANE",'2001-7-01',"+92321456789","Street 10,DHA phase 5 lums","CEO",105000,011401533,NOW(),NOW(),0,(SELECT accountId from account where account.accountType="admin"));`;
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
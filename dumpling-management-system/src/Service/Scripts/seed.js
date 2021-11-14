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
        database:'dumpling'
    }
);
function seedData(q)
{
    connectionString.query(q,
    (err2,result)=>
    {
        if(err2)
        {
            console.log("Seeding Faileds");
            console.log(err2);
        }
        else
        {
            console.log("Seeding done");
            //console.log(result);
        }
     });
}
const addAdminaccount = `INSERT INTO dumpling.account VALUES(1,"admin","admin","dumpling@123","dumpling@123","dumpling@gmail.com","None",NOW(),NOW(),0);`;
const addAmdinemployee = `INSERT INTO dumpling.employee VALUES(1,"MEANE",'2001-7-01',"+92321456789","Street 10,DHA phase 5 lums","CEO",105000,011401533,NOW(),NOW(),0,(SELECT accountId from account where account.accountType="admin"));`;
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
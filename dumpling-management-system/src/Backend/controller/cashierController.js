import dotenv from "dotenv";
import mysql from 'mysql';
import express, { response } from 'express';
import {v4 as uuidv4} from "uuid";
dotenv.config({path:"./src/Backend/.env"});
const app = express();
app.use(express.json({extended:true}));
app.use(express.urlencoded({ extended: true }));
function findid()

{

    return new Promise((resolve,reject)=>

    {

        var connectionString1 = mysql.createConnection(

            {

                    host:process.env.host,

                    user: process.env.user,

                    password:process.env.password,

                    database:process.env.database

       

            }

            );

        let orderId = uuidv4();

        let checkQuery =`SELECT * FROM dumpling.orders WHERE orders.orderId = "${orderId}"`;

        connectionString1.query(checkQuery, (err,res)=>

        {

            if(err)

            {

                console.log("error");
                console.log(err);

                reject("querry failed");

                connectionString1.end();

            }

            else

            {

                if(res.length===0)

                {

                    resolve(orderId);

                    connectionString1.end();

                }

                else

                {

                    reject("order id in use");

                    connectionString1.end();

                }

            }

        });

    });

}

function addIntoDA(orderId,toAddintoDA,quantity)

{

    return new Promise((resolve,reject)=>

    {

        var connectionString2 = mysql.createConnection(

            {

                host:process.env.host,

                user: process.env.user,

                password:process.env.password,

                database:process.env.database

   

            }

        );

        let addIntoDishAss = `INSERT INTO dumpling.dishassignment(orderNo,dishNo,quantity) VALUES("${orderId}","${toAddintoDA}",${quantity});`;

        connectionString2.query(addIntoDishAss,(err,result)=>

        {

            if(err)

            {

                console.log("Error");
                console.log(err);

                reject("Query failed");

                connectionString2.end();

            }

            else

            {

                resolve(result);

                connectionString2.end();

            }

        });

    });

}
function iffound(element,noOfOrders,finalDishIds)
{
    for(var j=0;j<noOfOrders;j++)
    {
        if(element===finalDishIds[j])
        {
            return true;
        }
        else
        {
            return finalDishIds[j];
        }
    }
}






export const placeOrder = async (req,res)=>

{

    var connectionString = mysql.createConnection(

        {

            host:process.env.host,

            user: process.env.user,

            password:process.env.password,

            database:process.env.database

 

        }

    );

    let bit = true;

    let orderId;

    while(bit)

    {

        console.log("In while");

        await findid().then((response)=>

        {

            orderId = response;

            bit = false;

        }).catch((err)=>

        {

            console.log(err);

        });

    }

    let message = "";

    let isSuccessful=false;

    let typeOfOrder = req.body.typeOfOrder;

    let orderStatus = req.body.orderStatus;

    let totalBill = req.body.totalBill;

    let listOrders = req.body.listOrders;

    let dishIds = Object.values((JSON.parse(JSON.stringify(listOrders))));
    // let dishIds = Object.values(JSON.parse(listOrders));
    console.log(dishIds);
    // console.log(dishIds);

    let finalDishIds = dishIds[0];
    let noOfOrders = finalDishIds.length;
    const toFindDuplicates = finalDishIds => finalDishIds.filter((item,index,ar)=> ar.indexOf(item) ===index);
    var duplicateElements = toFindDuplicates(finalDishIds);
    const counts = {};
    console.log(duplicateElements);
    for (var i=0;i<duplicateElements.length;i++)
    {
        if (iffound(duplicateElements[i],noOfOrders,finalDishIds)===true)
        {
            continue;
        }
        else if (iffound(duplicateElements[i],noOfOrders,finalDishIds)!==true )
        {
            let ans = iffound(duplicateElements[i],noOfOrders,finalDishIds);
            // duplicateElements.push(ans);
            if(duplicateElements.find(element => element===ans))
            {
                continue;
            }
            else
            {
                duplicateElements.push(ans);
            }
        }
       
    }
    console.log("This is the final array",duplicateElements);
    let finalLengthToinsert = duplicateElements.length;
    finalDishIds.forEach(element => {
        counts[element] = (counts[element]||0)+1; 
    });
    console.log("counts");
    console.log(counts);
    // console.log("This is the number of orders",noOfOrders);

    // console.log(typeOfOrder,orderStatus,totalBill,listOrders,noOfOrders,finalDishIds);

    let addOrderQuery =

    `INSERT INTO dumpling.orders(orderId,typeOfOrder,OrderStatus,totalBill,createdAt)

    VALUES("${orderId}","${typeOfOrder}","${orderStatus}",${totalBill},NOW());`;

 

    connectionString.query(addOrderQuery,(err,result)=>

    {

        if(err)

        {

            message = "Cannot add order to the order table";

            console.log(err);

            res.send({

                'isSuccessful':isSuccessful,

                'message':message

            });

            connectionString.end();

        }

        else

        {

            console.log("Now adding into dish assignment");

           

            for(var i=0;i<finalLengthToinsert;i++)

            {

                // console.log("Here is the first dish id",finalDishIds[i]);
                console.log("This is the count",counts[duplicateElements[i]]);

                addIntoDA(orderId,duplicateElements[i],counts[duplicateElements[i]]).then((response)=>

                {

                   console.log("Successfully added into DA");

                //    console.log(response);

 

                }).catch((err)=>

                {

                    console.log(err);

                    message = "Error encountered while adding into dish assignment";

                    res.send({

                        'isSuccessful':isSuccessful,

                        'message':message

                    });

                   connectionString.end();

                });

            }

            message = "Succesfully added";

            isSuccessful = true;

            res.send({

                'isSuccessful':isSuccessful,

                'message':message

            });
        }

    });

}
export const viewOrderSummary = (req,res)=>{
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database
        }

    )
    let message = "";
    let isSuccessful = false;
    let orderId = req.body.orderId;
    let orderSummary = `SELECT * FROM orders INNER JOIN dishassignment on orders.orderId = dishassignment.orderNo INNER JOIN menu on menu.dishId = dishassignment.dishNo WHERE orders.orderId = "${orderId}";`;
    connectionString.query(orderSummary,(err,result)=>{
        if(err)
        {
            message = "Cannot display order summary";
            res.send({
                'isSuccessful':isSuccessful,
                'message':message
            });

        }
        else
        {
            message = "Sucessfully displaying the order summary";
            isSuccessful = true;
            res.send({
                'isSuccessful':isSuccessful,
                'message':message,
                'result':result
            });
        }
    })
}
export const dailySaleReport = (req,res) =>
{
    
    var today = new Date();
    let month = today.getMonth()+1;
    let day = today.getDate();
    let year = today.getFullYear();
    let querry =`Select dishassignment.orderNo,menu.dishName,orders.totalBill from orders inner join dishassignment on dishassignment.orderNo=orders.orderId inner join menu on dishassignment.dishNo=menu.dishId where menu.archived=0 and orders.orderId=(select salesrecord.orderId from salesrecord where DAY(salesrecord.date)=${day} and MONTH(salesrecord.date)=${month} and YEAR(salesrecord.date)=${year} and salesrecord.archived=0);`
    console.log(querry)
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
    connectionString.query(querry,(err,result)=>
    {
        if(err){
            message = "querry failed";
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
            if(result.length === 0)
            {
                message = "No sale today";
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
                message = "sale record for day found";
                isSuccessful = true;
                console.log(result);
                res.send(
                    {
                        "isSuccessful":isSuccessful,
                        "message":message,
                        'result':result
                    }
                );
                connectionString.end();
            }
        }
    })
}



export const viewEditableOrders = (req,res) =>
{
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database
        }

    )
    let a = "placed";
    let b = "created";

    let query = 
    `SELECT * FROM dumpling.orders WHERE orderStatus = "${a}" OR orderStatus = "${b}";`;
    let message = "";
    let isSuccessful = false;

    connectionString.query(query,(err,result)=>
    {
        if(err)
        {
            message = "query failed";
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
            if(result.length === 0)
            {
                message = "No orders placed or created";
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
                message = "Orders found that were created or placed";
                res.send(
                    {
                        "isSuccessful":true,
                        "message":message,
                        'result':result
                    }
                );
                connectionString.end();


            }


        }


    });



}

export const deleteOrder = (req,res) =>
{
    var connectionString = mysql.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            database:process.env.database
        }

    )
    let message = "";
    let isSuccessful = false;
    let orderId = req.body.orderId;
    




    let foreignDelete = 
    `DELETE FROM dumpling.dishassignment WHERE orderNo = "${orderId}";`;
    connectionString.query(foreignDelete,(err,result)=>{
        if(err)
        {
            message = "Query failed";
            console.log(err);
            res.send({
                'isSuccessful':isSuccessful,
                'message':message
            });
            connectionString.end();

        }
        else
        {
            console.log("Deletion from the dish assignment table succeeded");
            //now set the archive bit of that particular orderId to be 1
            connectionString.end();
            var connectionString2 = mysql.createConnection(
                {
                    host:process.env.host,
                    user: process.env.user,
                    password:process.env.password,
                    database:process.env.database
                }
        
            )
            let n = 1;
            let orderArchive = 
            `UPDATE dumpling.orders SET archived =${n} WHERE orderId = "${orderId}";`;
            connectionString2.query(orderArchive,(err,result)=>
            {
                if(err)
                {
                    message = "Failed to set archive";
                    console.log(err);
                    res.send({
                    'isSuccessful':false,
                    'message':message
                    });
                    connectionString2.end();

                }
                else
                {
                    message = "Archive set successfully";
                    res.send({
                        'isSuccessful':true,
                        'message':message
                        });
                    connectionString2.end();


                }

            });

           

        }



    });

    //u will get in the body the order id that u wanna wipe off fully

}


import dotenv from 'dotenv';
import mysql2 from 'mysql2';
import express from 'express';
import bodyParser from 'body-parser';
dotenv.config({path:'./src/Backend/.env'});
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

export const updateEmployeeSalary = (req,res)=>
{
    
    var connectionString = mysql2.createConnection(
        {
            host:process.env.host,
                user: process.env.user,
                password:process.env.password,
                port:process.env.port1,
                database:process.env.database
        }
    );
    let message = '';
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
            message = 'Cannot get the employees';
            console.log(err);
            res.send(
                { 
                    'isSuccessful':isSuccessful,
                    'message':message    
                }
            );
            connectionString.end();
        }
        else
        {
            if(result[0].accountType === 'admin'|| result[0].accountType === 'Admin'  || result[0].accountType === 'manager'||  result[0].accountType === 'Manager')
            {
                console.log('Manager or admin role found');
                var connectionString1= mysql2.createConnection(
                    {
                        host:process.env.host,
                        user: process.env.user,
                        password:process.env.password,
                        port:process.env.port1,
                        database:process.env.database
                    }
            
                );
                connectionString1.query(updateSalaryQuery,(err,result)=>
                {
                    if(err)
                    {
                        message = 'Failed to update the salary';
                        console.log(err);
                        res.send(
                            {
                                'isSuccessful':isSuccessful,
                                'message':message 
                            }
                        );
                        connectionString1.end();
                    }
                    else
                    {
                        message = 'Successfully updated the salary of the given employee';
                        isSuccessful = true;
                        res.send(
                            {
                                'isSuccessful':isSuccessful,
                                'message':message 
                            }
                        );
                        connectionString1.end();
                    }
                });
            }
            else
            {
                message = 'Not an admin or Manager';
                isSuccessful = false;
                res.send({
                    'isSuccessful':isSuccessful,
                    'message':message 
                });
                connectionString.end();
            }
        }
    }); 
}
export const fetchAllEmployee = (req,res)=>
{
    var connectionString = mysql2.createConnection(
        {
            host:process.env.host,
                user: process.env.user,
                password:process.env.password,
                port:process.env.port1,
                database:process.env.database
        }
    );
    let message = '';
    let isSuccessful = false;
    let fetchQuery = `SELECT employee.employeeId, employee.employeeName, employee.salary , employee.position, employee.archived FROM dumpling.employee`;
    connectionString.query(fetchQuery,(err,result)=>
    {
        if(err)
        {
            message = 'Could not fetch the details for the employees';
            res.send(
                {
                    'isSuccessful':isSuccessful,
                    'message':message 
                }
            )
        }
        else
        {
            message = 'Successfully fetched the details of the employees';
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
    var connectionString = mysql2.createConnection(
        {
            host:process.env.host,
                user: process.env.user,
                password:process.env.password,
                port:process.env.port1,
                database:process.env.database
        }
    );
    let message = '';
    let isSuccessful = false;
    let checkForId = req.body.checkId;
    let giveBonusToEmployeeId= req.body.employeeId;
    let reason = req.body.reason;
    let date = req.body.date;
    let checkForIdQuery = `SELECT account.accountType FROM dumpling.account WHERE account.accountId=${checkForId}`;
    let giveBonus = `INSERT INTO dumpling.bonus(employeeId,reason,date,createdAt) VALUES (${giveBonusToEmployeeId},'${reason}','${date}',NOW())`;
    connectionString.query(checkForIdQuery,(err,result)=>
    {
        if(err)
        {
            message = 'Cannot get any employee';
            res.send(
                {
                    'isSuccessful':isSuccessful,
                    'message':message 
                }
            );
            connectionString.end();
        }
        else
        {
            if(result[0].accountType === 'admin'|| result[0].accountType === 'Admin'  || result[0].accountType === 'manager'||  result[0].accountType === 'Manager')
            {
                console.log('Manager or admin found');
                var connectionString1= mysql2.createConnection(
                    {
                        host:process.env.host,
                        user: process.env.user,
                        password:process.env.password,
                        port:process.env.port1,
                        database:process.env.database
                    }
                );
                connectionString1.query(giveBonus,(err1,result1)=>
                {
                    if(err1)
                    {
                        message = 'Cannot give bonus to the employee';
                        console.log(err1);
                        res.send({
                            'isSuccessful':isSuccessful,
                            'message':message 
                        });
                    }
                    else
                    {
                        message = 'Given the bonus and made an entry in the bonus table';
                        isSuccessful = true;
                        res.send({
                            'isSuccessful':isSuccessful,
                            'message':message 
                        });
                    }
                });

            }
            else
            {
                message = 'Not an admin or manager';    
                res.send({
                    'isSuccessful':isSuccessful,
                    'message':message 
                });
            connectionString.end();
            }
        }
    });
}

export const addCoupon = (req,res)=>
{
    var connectionString = mysql2.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            port:process.env.port1,
            database:process.env.database
        }

    );

    let message ='';
    let isSuccessful = false;

    let couponId = req.body.couponId;
    let couponName = req.body.couponName;
    let discount = req.body.discount;
    let issueDate = req.body.issueDate;
    let expiryDate = req.body.expiryDate;
    let addCouponQuery = 
    `INSERT INTO dumpling.coupons(couponId,couponName,discount,issueDate,expiryDate,createdAt)
    VALUES(${couponId},'${couponName}',${discount},'${issueDate}','${expiryDate}',NOW());`; 

    connectionString.connect((error)=>{
        if(error)
        {

            console.log(error);

        }
        else
        {
            connectionString.query(addCouponQuery,(err,result)=>
            {
                if(err)
                {
                    console.log('Error found');
                    console.log(err);
                    message = 'Failed to insert coupon into the menu';
                    res.send(
                        {
                            'isSuccessful':isSuccessful,
                            'message':message
                        }

                    );

                    connectionString.end();

                }
                else
                {
                    console.log('Coupon has been added successfully');
                    isSuccessful = true;
                    message='Coupon has been added';
                    res.send(
                        {
                            'isSuccessful':isSuccessful,
                            'message':message
                        }
                    );

                    connectionString.end();
                }
            });

        }

    });


}


export const applyCoupon = (req,res)=>
{

    var connectionString = mysql2.createConnection(
        {
            host:process.env.host,
                user: process.env.user,
                password:process.env.password,
                port:process.env.port1,
                database:process.env.database
        }

    );

    let message ='';
    let isSuccessful = false;
    let couponId = req.body.couponId;
    let orderId = req.body.orderId;
    let coupon_percentage;
    let lucky_bill;
    let new_bill;
    let check_coupon_existence = false;
    let check_coupon_existence_query = 
    `SELECT * FROM dumpling.coupons WHERE dumpling.coupons.couponId = ${couponId};`;

    connectionString.connect((error)=>{
        if(error)
        {

            console.log(error);


        }
        else
        {
            connectionString.query(check_coupon_existence_query,(err,result)=>
            {
                if(err)
                {
                    console.log('Error found in querying the coupons table for coupon existnce');
                    console.log(err);
                    message = 'Error found in querying the coupons table for coupon existnce';
                    res.send(
                        {
                            'isSuccessful':isSuccessful,
                            'message':message
                        }

                    );
                    connectionString.end();


                }
                else
                {
                    if(result.length === 0)
                    {
                        //this means that no coupons of this kind were found
                        console.log('No matching coupon found');
                        message = 'No coupon with this ID found';
                        res.send(
                            {
                                'isSuccessful':isSuccessful,
                                'message':message
                            }

                        );
                        connectionString.end();
                        
                    }
                    else
                    {
                        let list_split = result[0].expiryDate.toISOString().split( 'T' );
                        let exp_date = list_split[0];
                        let today = ((new Date()).toISOString().split( 'T' ))[0];
                        let exp_date_date = new Date(exp_date);
                        let today_date = new Date(today);
                        coupon_percentage = result[0].discount;
                        console.log(coupon_percentage);
                        
                        if(today>list_split)
                        {
                            console.log('expired');
                            message = 'Coupon expired';
                            res.send(
                                {
                                    'isSuccessful':false,
                                    'message':message
                                }

                        );
                        connectionString.end();
                        }
                        else
                        {
                        
                            // connectionString.end();
                            console.log(' not expired');
                            var connectionString2 = mysql2.createConnection(
                                {
                                    host:process.env.host,
                user: process.env.user,
                password:process.env.password,
                port:process.env.port1,
                database:process.env.database
                                }
                        
                            );
                            //now extract the total bill
                            let extract_bill = 
                            `SELECT * FROM dumpling.orders WHERE dumpling.orders.orderId = '${orderId}';`;
                            connectionString2.connect((error)=>{
                                if(error)
                                {
                        
                                    console.log(error);
                        
                        
                                }
                                else
                                {

                                    connectionString2.query(extract_bill,(err,result)=>
                                    {

                                        if(err)
                                        {
                                            console.log('Error found in querying the orders table for bill');
                                            console.log(err);
                                            message = 'Error found in querying the orders table for bill';
                                            res.send(
                                                {
                                                    'isSuccessful':isSuccessful,
                                                    'message':message
                                                }

                                            );
                                            connectionString2.end();
                                            connectionString.end();


                                        }
                                        else
                                        {
                                            
                                            console.log(result)
                                            lucky_bill = result[0].totalBill;
                                            console.log('here');
                                            console.log(lucky_bill);
                                            new_bill = lucky_bill - ((coupon_percentage*1.0/100)*lucky_bill)
                                            console.log(new_bill);
                                            connectionString2.end();
                                            //now we have the new bill...just update the total bill in the orders table.
                                            //now create another connection string
                                            var connectionString3 = mysql2.createConnection(
                                                {
                                                    host:process.env.host,
                                                    user: process.env.user,
                                                    password:process.env.password,
                                                    port:process.env.port1,
                                                    database:process.env.database
                                                }
                                        
                                            );
                                            let update_bill = 
                                            `UPDATE dumpling.orders SET orders.totalBill=${new_bill},orders.updatedAt=NOW() WHERE orders.orderId ='${orderId}'`;
                                            connectionString3.connect((error)=>{
                                                if(error)
                                                {
                                        
                                                    console.log(error);
                                        
                                        
                                                }
                                                else
                                                {
                                                    connectionString3.query(update_bill,(err,result)=>
                                                    {
                                                        if(err)
                                                        {
                                                                
                                                                console.log(err);
                                                                message = 'Error in applying coupon';
                                                                res.send(
                                                                    {
                                                                        'isSuccessful':false,
                                                                        'message':message
                                                                    }

                                                                );
                                                                connectionString3.end();

                                                        }
                                                        else
                                                        {
                                                                message = 'Coupon applied';
                                                                res.send(
                                                                    {
                                                                        "isSuccessful":true,
                                                                        "message":message,
                                                                        "newBill" : new_bill
                                                                    }

                                                                );
                                                                connectionString3.end();


                                                        }

                                                    });



                                                }
                                            });







                                        }
                                        

                                    });

                                }



                            });



    



                        }
                        
                        
                        // now create another connection string...
                        // check the validity of the coupon
                        
                        

                    }

                }




            });


        }

    });


}

export const monthYearSale = (req, res) =>
{
    //req will have month and year
    let month = req.body.month;
    let year = req.body.year;
    console.log('month: ', month);
    console.log('year: ', year);
    console.log(month);
    console.log(year);
    let big_query;
    if(month != 0)
    {
        let query_mon = `Select dishassignment.orderNo,GROUP_CONCAT(menu.dishName SEPARATOR ', ') as dishNames,orders.totalBill from orders inner join dishassignment on dishassignment.orderNo=orders.orderId inner join menu on dishassignment.dishNo=menu.dishId where menu.archived=0 and orders.orderId in (select salesrecord.orderId from salesrecord where MONTH(salesrecord.date)=${month} and YEAR(salesrecord.date)=${year} and salesrecord.archived=0) GROUP BY dishassignment.orderNo;`
        console.log(query_mon);
        big_query = query_mon;
    }
    else
    {
        let query_year = `Select dishassignment.orderNo,GROUP_CONCAT(menu.dishName SEPARATOR ', ') as dishNames,orders.totalBill from orders inner join dishassignment on dishassignment.orderNo=orders.orderId inner join menu on dishassignment.dishNo=menu.dishId where menu.archived=0 and orders.orderId in (select salesrecord.orderId from salesrecord where YEAR(salesrecord.date)=${year} and salesrecord.archived=0) GROUP BY dishassignment.orderNo;`
        console.log(query_year);
        big_query = query_year;
    }

    var connectionString = mysql2.createConnection(
        {
            host:process.env.host,
            user: process.env.user,
            password:process.env.password,
            port:process.env.port1,
            database:process.env.database

        }
    );

    let message = '';
    let isSuccessful = false;
    connectionString.query(big_query,(err,result)=>
    {
        if(err){
            message = 'query failed';
            console.log(err);
            res.send(
                {
                    'isSuccessful':isSuccessful,
                    'message':message
                }
            );
            connectionString.end();
        }
        else
        {
            console.log('res is', result);
            if(result.length === 0)
            {
                message = 'No sale';
                res.send(
                    {
                        'isSuccessful':isSuccessful,
                        'message':message
                    }
                );
                connectionString.end();

            }
            else
            {
                message = 'sale record found';
                isSuccessful = true;
                console.log(result);
                res.send(
                    {
                        'isSuccessful':isSuccessful,
                        'message':message,
                        'result':result
                    }
                );
                connectionString.end();
            }
        }
    })

}


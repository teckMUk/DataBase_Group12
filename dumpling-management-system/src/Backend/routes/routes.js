import dotenv from "dotenv";
import express from 'express';
import {findUsers,addUser,getSQ,changePassword,forgetPassword,validateSecurity, accountExistence, updateAccount, deleteAccount,getEmployeeDetails} from "../../Backend/controller/userController.js";
import {addMenuItem,removeMenuItem,fetchDishIds,viewPlacedOrders,changeOrderStatus,dishOfTheDay} from "../../Backend/controller/chefController.js";
import {updateEmployeeSalary,fetchAllEmployee, giveBonuses, applyCoupon,addCoupon,monthYearSale } from "../../Backend/controller/managerController.js";
import {placeOrder,viewOrderSummary,dailySaleReport,viewEditableOrders,deleteOrder, editOrder, getOrder} from "../../Backend/controller/cashierController.js";
dotenv.config({path:"./src/Backend/.env"});
const route = express.Router();
route.post("/api/userController/login",findUsers);
route.post("/api/userController/createAccount",addUser);
route.post("/api/userController/updateAccount",updateAccount);
route.post("/api/userController/deleteAccount",deleteAccount);
route.post("/api/userController/securityQuestions",getSQ);
route.post("/api/userController/changePassword",changePassword);
route.post("/api/userController/forgetPassword",forgetPassword);
route.post("/api/userController/accountExistence",accountExistence);
route.post("/api/userController/validateSecurity",validateSecurity);
route.post("/api/chefController/removeMenuItem",removeMenuItem);
route.post("/api/chefController/addMenuItem",addMenuItem);
route.post("/api/cashierController/placeOrder",placeOrder);
route.post("/api/chefController/fetchDishIds",fetchDishIds);
route.post("/api/chefController/viewPlacedOrders",viewPlacedOrders);
route.post("/api/managerController/fetchAllEmployee",fetchAllEmployee);
route.post("/api/managerController/updateEmployeeSalary",updateEmployeeSalary);
route.post("/api/managerController/giveBonuses",giveBonuses);
route.get("/api/userController/employeeDetails",getEmployeeDetails);
route.post("/api/managerController/addCoupon",addCoupon);
route.post("/api/managerController/applyCoupon",applyCoupon);
route.post("/api/managerController/updateOrderStatus",changeOrderStatus)
route.post("/api/cashierController/viewOrderSummary",viewOrderSummary);
route.get("/api/cashierController/dailySaleReport",dailySaleReport);
route.get("/api/cashierController/viewEditableOrders",viewEditableOrders);
route.post("/api/cashierController/deleteOrder",deleteOrder);
route.post("/api/managerController/monthYearSale",monthYearSale);
route.post("/api/cashierController/editOrder",editOrder);
route.post("/api/chefController/dishOfTheDay",dishOfTheDay);
route.post("/api/cashierController/getOrder",getOrder);



export default route;
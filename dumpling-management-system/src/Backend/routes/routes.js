import dotenv from "dotenv";
import express from 'express';
import {findUsers,addUser,getSQ,changePassword,forgetPassword,validateSecurity, accountExistence, updateAccount} from "../../Backend/controller/userController.js";
import {addMenuItem,removeMenuItem,fetchDishIds} from "../../Backend/controller/chefController.js";
dotenv.config({path:"./src/Backend/.env"});
const route = express.Router();
route.post("/api/userController/login",findUsers);
route.post("/api/userController/createAccount",addUser);
route.post("/api/userController/updateAccount",updateAccount);
route.post("/api/userController/securityQuestions",getSQ);
route.post("/api/userController/changePassword",changePassword);
route.post("/api/userController/forgetPassword",forgetPassword);
route.post("/api/userController/accountExistence",accountExistence);
route.post("/api/userController/validateSecurity",validateSecurity);
route.post("/api/chefController/removeMenuItem",removeMenuItem);
route.post("/api/chefController/addMenuItem",addMenuItem);
route.post("/api/chefController/fetchDishIds",fetchDishIds);

export default route;
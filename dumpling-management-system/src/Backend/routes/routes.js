import dotenv from "dotenv";
import express from 'express';
import {findUsers,addUser,getSQ,changePassword,forgetPassword,validateSecurity} from "../../Backend/controller/userController.js";
dotenv.config({path:"./src/Backend/.env"});
const route = express.Router();
route.post("/api/userController/login",findUsers);
route.post("/api/userController/createAccount",addUser);
route.post("/api/userController/securityQuestions",getSQ);
route.post("/api/userController/changePassword",changePassword);
route.post("/api/userController/forgetPassword",forgetPassword);
route.post("/api/userController/validateSecurity",validateSecurity);

export default route;
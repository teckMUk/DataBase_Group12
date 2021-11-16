import express from 'express';
import {findUsers,addUser,getSQ,changePassword} from "../../Backend/controller/userController.js";
const route = express.Router();

route.post("/api/userController/login",findUsers);
route.post("/api/userController/createAccount",addUser);
route.post("/api/userController/securityQuestions",getSQ);
route.post("/api/userController/changePassword",changePassword);

export default route;
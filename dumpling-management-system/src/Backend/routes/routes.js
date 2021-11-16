import express from 'express';
import {findUsers,addUser,getSQ} from "../../Backend/controller/userController.js";
const route = express.Router();

route.post("/api/userController/login",findUsers);
route.post("/api/userController/createAccount",addUser);
route.post("/api/userController/securityQuestions",getSQ);

export default route;
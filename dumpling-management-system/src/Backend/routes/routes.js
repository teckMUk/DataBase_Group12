import express from 'express';
import {findUsers,addUser} from "../../Backend/controller/userController.js";
const route = express.Router();

route.post("/api/userController/login",findUsers);
route.post("/api/userController/createAccount",addUser);

export default route;
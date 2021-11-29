import dotenv from "dotenv";
import express  from "express";
import bodyParser from "body-parser";
import route from "./routes/routes.js";
import cors from 'cors';
dotenv.config();
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/userController/login",route);
app.post("/api/userController/createAccount",route);
app.post("/api/userController/updateAccount",route);
app.post("/api/userController/deleteAccount",route);
app.post("/api/userController/securityQuestions",route);
app.post("/api/userController/changePassword",route);
app.post("/api/userController/forgetPassword",route);
app.post("/api/userController/validateSecurity", route);
app.post("/api/userController/accountExistence", route);
app.post("/api/chefController/removeMenuItem",route);
app.post("/api/chefController/addMenuItem", route);
app.post("/api/chefController/fetchDishIds", route);
app.post("/api/chefController/viewPlacedOrders",route);
app.post("/api/managerController/updateEmployeeSalary",route);
app.post("/api/managerController/fetchAllEmployee",route);
app.post("/api/managerController/giveBonuses",route);

app.post("/api/cashierController/placeOrder", route);
const PORT =  process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});


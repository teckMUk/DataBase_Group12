import dotenv from "dotenv";
import express  from "express";
import bodyParser from "body-parser";
import route from "./routes/routes.js";
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.post("/api/userController/login",route);
app.post("/api/userController/createAccount",route);
app.post("/api/userController/securityQuestions",route);
app.post("/api/userController/changePassword",route);
app.post("/api/userController/forgetPassword",route);
app.post("/api/userController/validateSecurity", route)

const PORT =  process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});


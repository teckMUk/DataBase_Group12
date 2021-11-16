import express  from "express";
import bodyParser from "body-parser";
import route from "./routes/routes.js";
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.post("/api/userController/login",route);
app.post("/api/userController/createAccount",route);

const PORT =  process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})

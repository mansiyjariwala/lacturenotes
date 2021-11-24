require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");

const userModel= require("./models/user");



mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("mongo db connected"));

app.get("/", (req, res) => res.send("Hello Fullstack!"));
app.get("/list",async(req,res)=>{

    const userList=await userModel.find();

    if(userList.length==0)
    {
        return res.json({data:"no users in fullstack"});
    }

    return res.json({data:userList});
});
//register user
app.post("/registration",(req,res)=>
{
    const{newUser}=req.body;
    userModel.create(newUser);
    return res.json({data:"registered successfully"});
});
app.listen(port, () => console.log(`server running on port 5000`));

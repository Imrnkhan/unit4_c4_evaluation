const express=require("express");
const app=express();
const mongoose=require("mongoose");
const {register,login}=require("./middleware/authcontroller")
const todocontroller=require("./controller/todocontroller")
const connect=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/todo")
}

app.post("/register",register)
app.post("/login",login)
app.use("/todos",todocontroller);


app.listen(9500,async()=>{
    await connect();
    console.log("listening on port 9500")
})
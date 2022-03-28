const express=require("express");
const app=express();
app.use(express.json());
const Todo=require("../model/todomodel")
const authenticate=require("../middleware/authenticate");

app.get("",async(req,res)=>{
    try {
        const todos= await Todo.find({}).lean().exec();
        return res.status(200).send({todos:todos})
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})

app.post("",async(req,res)=>{
    try {
        const todo= await Todo.create(req.body);
        return res.status(201).send({todo:todo})
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})

app.get("/:id",authenticate,async(req,res)=>{
    try {
        const todo= await Todo.findById(req.params.id).lean().exec();
        return res.status(200).send({todo:todo})
    } catch (error) {
        return res.status(401).send({message:error.message})
    }
})

app.patch("/:id",authenticate,async(req,res)=>{
    try {
        const todo= await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).send({todo:todo})
    } catch (error) {
        return res.status(401).send({message:error.message})
    }
})


app.delete("/:id",authenticate,async(req,res)=>{
    try {
        const todo= await Todo.findByIdAndDelete(req.params.id);
        return res.status(200).send({todo:todo})
    } catch (error) {
        return res.status(401).send({message:error.message})
    }
})

module.exports=app;



const User=require("../model/usermodel")
const jwt=require("jsonwebtoken");
require("dotenv").config();

const newtoken=(user)=>{
    return jwt.sign({user},process.env.JWT_MASTER_KEY) 
}

const register=async(req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email}).lean().exec();
        if(user){
            return res.status(500).send({message:"Email already exist"});
        }

        user=await User.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
        })

        const token=newtoken(user);
        return res.status(201).send({user,token});
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}


const login=async(req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email}) 

        if(!user){
            return res.status(500).send({message:"Wrong email or password"});
        }

        let match=await checkpassword(req.body.password);
        if(!match){
            return res.status(500).send({message:"Wrong email or password"});
        }
        const token=newtoken(user);
        return res.status(201).send({token});
    } catch (error) {
        return res.status(500).send({message:error.message}); 
    }
}

module.exports={register,login}
const jwt=require("jsonwebtoken");
require("dotenv").config();

const verifyToken=(token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.JWT_MASTER_KEY,(err,decode)=>{
            if(err) return reject(err)
            return resolve(decode);
        })
    })
}



const authentication=async(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(500).send({message:"Token is not valid"})
    }
    if(!req.headers.authorization.startsWith("Bearer ")){
        return res.status(500).send({message:"Token is not valid"})
    }
    let token =req.header.authorization.split(" ")[1];
    let decode;
    try {
        decode=await verifyToken(token)
        return res.send({message:"Token is valid"})
    } catch (error) {
        return res.status(500).send({message:"Token is not valid"})
    }


    return next();
}

module.exports=authentication;





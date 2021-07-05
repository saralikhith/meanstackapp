//import json web token
const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
     //get token from req obj
     let tokenWithBearer=req.headers.authorization;
     let token;

     //if token is not present
     if(tokenWithBearer==undefined){
         res.send({message:"unauthorized access"})
     }
     else{
      token =tokenWithBearer.split(" ")[1]
         //verify the token
         jwt.verify(token,process.env.SECRETKEY,(err,decoded)=>{
               if(err){
                res.send({message:"session expires .... login to continue"})
               }
               else{
                   next();
               }
         })

     }
}

module.exports=verifyToken;
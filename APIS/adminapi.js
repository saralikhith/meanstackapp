//import express api
const exp=require('express')


adminApi=exp.Router();


//import expressasynhandler
const expAsyncHandler=require('express-async-handler')

//import bycrpytjs
const bcryptjs=require('bcryptjs')

//import jsonweb token
const jwt=require('jsonwebtoken')


//login handler
adminApi.post('/login',expAsyncHandler(async(req,res)=>{
    adminObj=req.app.get('adminObj')
           //get user credentials
           credentials=req.body;
              //search by username
    let user= await  adminObj.findOne({username:credentials.username})
    if(user===null){
          res.send({message:"username is invalid"})
    }
    else{
          //search by password
          let result=await bcryptjs.compare(credentials.Password,user.password)
          if(result===false){
             res.send({message:"password is invalid"})
          }
          else{
                  //create a token
               let signedToken =jwt.sign({username:credentials.username},'abcdef',{expiresIn:100})
                  //send token to client
                  res.send({message:"login success",token:signedToken,username:credentials.username,userObj:user})
          }
         }
 
 }))


module.exports=adminApi;
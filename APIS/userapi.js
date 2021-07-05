//import mini express
const exp=require('express')

//create the obj
const userApi=exp.Router();

//import verify token middleware
const verifyToken=require('./MiddleWares/verifyToken')

//import express asynchandler
const expAsyncHandler=require('express-async-handler')

//import bcryptjs
const bcryptjs=require('bcryptjs')

//import jsonwebtoken
const jwt=require('jsonwebtoken')
let collectionobj;

//import multerobj
const multerObj=require('./MiddleWares/multer')




//get handler 
userApi.get('/getuser',expAsyncHandler(async(req,res)=>{
   collectionobj=req.app.get('collectionobj')
  
            //get data from database
            let userList=  await  collectionobj.find().toArray()
            res.send({message:userList})
}))

//get user data by username
userApi.get('/getuser/:username',expAsyncHandler(async(req,res)=>{
   collectionobj=req.app.get('collectionobj')
    let un=req.params.username;
    //get the user from db
   let userObj= await collectionobj.findOne({username:un})
   if(userObj==null){
    res.send({message:"user not existed"})
   }
   else{
    res.send({message:userObj})
   }

}))

//create an user using async and await

userApi.post('/createuser',multerObj.single('photo'),expAsyncHandler(async(req,res)=>{

  let  collectionobj=req.app.get('collectionobj')


     //get obj 
     let newuser=JSON.parse(req.body.userobj);



      
     //check whether user is existed or not in in database
     let userObj=await collectionobj.findOne({username:newuser.username})
     if(userObj!==null){
        res.send({message:"username is existed already"})   
             
     }
     else{
         //hash th password
       let hashedpassword=await bcryptjs.hash(newuser.password,7)
        //replace text password with plain  hashed password
        newuser.password=hashedpassword;

        //before insert i should get the cdn lik
        newuser.profilePic=req.file.path;
        
       delete newuser.photo;
          //if no user existed then save the data 

        
            let success=await collectionobj.insertOne(newuser)
            res.send({message:"user created successfully"})
         
      
         
      
          
          
     }
    }))



//modify an user
userApi.put('/updateuser/:username',expAsyncHandler(async(req,res)=>{
   collectionobj=req.app.get('collectionobj')
    //get modified obj
    let modifiedObj=req.body;
    //update data in database
     await collectionobj.updateOne({username:modifiedObj.username},{$set:{...modifiedObj}})
    res.send({message:"user updated successfully"})  
 }))


 //delete an user
 
 userApi.delete('/deleteuser/:username',expAsyncHandler(async(req,res)=>{
   collectionobj=req.app.get('collectionobj')
    deleteUser=req.params.username;
    //check whether user existed or not
    let  deletedobj=await collectionobj.findOne({username:deleteUser})
    if(deletedobj==null){
          res.send({message:"user not existed"})  
    }
   else{
            //delete object in database
await collectionobj.deleteOne({username:deleteUser})
          res.send({message:"user deleted succsessfull"})
    }
}))

//login handler
userApi.post('/login',expAsyncHandler(async(req,res)=>{
   collectionobj=req.app.get('collectionobj')
          //get user credentials
          credentials=req.body;
             //search by username
   let user= await collectionobj.findOne({username:credentials.username})
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
              let signedToken =jwt.sign({username:credentials.username},process.env.SECRETKEY,{expiresIn:1000})
                 //send token to client
                 res.send({message:"login success",token:signedToken,username:credentials.username,userObj:user})
         }
        }

}))

userApi.get('/privatedata',verifyToken,(req,res)=>{
   res.send({message:"accessing private data"})
})

userApi.post('/verifypassword/:username',verifyToken,expAsyncHandler(async(req,res)=>{

   //connect
   collectionobj=req.app.get('collectionobj')
  // get password from user
     let currentPassword=(req.body);
//search
let user= await collectionobj.findOne({username:currentPassword.username})

let result=await bcryptjs.compare(currentPassword.password,user.password)

if(result===false){
   res.send({message:'enter valid password'})
}
else{
           res.send({message:"enter new password"})
          

}

}))

userApi.post('/passwordgeneration/:username',verifyToken,expAsyncHandler(async(req,res)=>{

   //connect collection object
   collectionobj=req.app.get('collectionobj')

   

   //get data 
   let newPasswordUser=req.body;

   if(newPasswordUser.newpassword===null || newPasswordUser.confirmpassword===null ){
      res.send({message:'password should contain atleast one character'})
   }

   if(newPasswordUser.newpassword!==newPasswordUser.confirmpassword){
      res.send({message:'password not matched'})
   }
   else{
             //hash th password
             let hashedpassword=await bcryptjs.hash(newPasswordUser.newpassword,7)
             //replace text password with plain  hashed password
             newPasswordUser.newpassword=hashedpassword;
      let success=await collectionobj.updateOne({username:newPasswordUser.username},{$set:{password:hashedpassword}})
      res.send({message:'password generated successfully'})
   }

}))


//add products to cart
userApi.post('/add-to-cart',expAsyncHandler(async(req,res)=>{

   //connect usercollection
   let userCartCollectionObj=req.app.get('userCartCollectionObj')
   //get prodobj
   let newProdObj=req.body;
   

   let products=[];

   let userCartObj=await userCartCollectionObj.findOne({username:newProdObj.username})

   //no product is added to cart
   if(userCartObj===null){
      //create an object
      products.push(newProdObj.prodObj)
      //create an object with username and products array
      newCartObj={username:newProdObj.username,products}
    
 //insert new cartobject to db
          await userCartCollectionObj.insertOne(newCartObj)
          res.send({message:'new product added to cart'})
   }
   else{
      //push product obj to products array 
      userCartObj.products.push(newProdObj.prodObj)
      //update in database
      await userCartCollectionObj.updateOne({username:newProdObj.username},{$set:{...userCartObj}})
      res.send({message:'new product added to cart'})
   }


}))


//get added products
userApi.get('/getproducts/:username',expAsyncHandler(async(req,res)=>{
     //connect usercollection
     let userCartCollectionObj=req.app.get('userCartCollectionObj')
   //get username from url
   let un=req.params.username;
   
   //search by user
   let userProdObj=await userCartCollectionObj.findOne({username:un})

   if(userProdObj===null){
      res.send({message:'cart is empty'})
   }
   else{
      res.send({message:userProdObj})
   }
}))

module.exports=userApi;












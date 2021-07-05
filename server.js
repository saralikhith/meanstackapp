//import express module
const exp=require('express')



//create express object so call the function
const app=exp();


//import path
const path=require('path')

//connect angular app with express server
app.use(exp.static(path.join(__dirname,'./dist/nodejsConnection/')))

//import userapi
const userApi=require('./APIS/userapi')

//import adminapi
const adminApi=require('./APIS/adminapi')

//import product api
const productApi=require('./APIS/productsapi')


//import mongoclient from mongodb
const mc=require('mongodb').MongoClient;

//import dotenv document
  require('dotenv').config()





//connect express server with database server
//connection string
const databaseUrl=process.env.DATABASE_URL

//establich communication
mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
      if(err){
          console.log("err at database connection",err)
      }
      else{
        //we need databaseobj from clientobj
        let  databaseobj=client.db("myfirstdb")
       let collectionobj=databaseobj.collection("usercollection")
       let adminObj=databaseobj.collection('admincollection')
       let productcollection=databaseobj.collection('productcollection')
       let userCartCollectionObj=databaseobj.collection('usercartcollection')
       //call the set method
       app.set('collectionobj',collectionobj)
       app.set('adminObj',adminObj)
       app.set('productcollection',productcollection)
       app.set('userCartCollectionObj',userCartCollectionObj)
        console.log("connected to database")
      }
})

//body parsing 
app.use(exp.json())



app.use('/user',userApi)
app.use('/admin',adminApi)
app.use('/products',productApi)



//middleware to handle invalid path
app.use((req,res,next)=>{
    res.send({ message: `path ${req.url} is invalid` })
})

//invalid syntax
app.use((err,req,res,next)=>{
    res.send({ message: `error is ${err.message}` })
})


//assign port number to server
port=process.env.PORT;
app.listen(3000,()=>{
    console.log(`server listening to ${port}...`)
})
//import express module

const exp=require('express')

const productApi=exp.Router();

//import error aync handler
const expressErrorHandler=require('express-async-handler');
const multerObj = require('./MiddleWares/multer');

productApi.post('/addproducts',multerObj.single('photo'),expressErrorHandler(async(req,res)=>{

    //get product collection
    let productcollection=req.app.get('productcollection')
          //get obj from body
          let newprodObj=JSON.parse(req.body.prodObj)

          let prodObj=await productcollection.findOne({model:newprodObj.model})

          if(prodObj!=null){
                    res.send({message:'product already existed'})
          }
          else{
                  newprodObj.profilePhoto=req.file.path;

                  delete newprodObj.photo;
                  await productcollection.insertOne(newprodObj)
                  res.send({message:'product created successfully'})
          }
          
          
}))


productApi.get('/getproducts',expressErrorHandler(async (req,res)=>{
        //get product collection
        let productcollection=req.app.get('productcollection')

        //we nees to save products to this array
       

    let prods= await productcollection.find().toArray()
   
     
         
        res.send({message:prods})
    
 

}))

//delete an product
productApi.delete('/delete/:model',expressErrorHandler(async(req,res)=>{
           //get product collection
           let productcollection=req.app.get('productcollection')

           //get username
           let mode=req.params.model;

           //delete in db
           await productcollection.deleteOne({model:mode})

           let newProducts=await productcollection.find().toArray()
           res.send({message:'product deleted  successfully',newProducts:newProducts})


}))


module.exports=productApi;
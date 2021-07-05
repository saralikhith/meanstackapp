

//import cloudinary
const cloudinary=require('cloudinary').v2;

//import multer
const multer=require('multer')

//import multer-storage-cloudinary
const { CloudinaryStorage }=require('multer-storage-cloudinary')

//configure cloudinary
cloudinary.config({
   cloud_name:'dgjsuikto',
   api_key:'129796368188119',
   api_secret:'aCB6iofKW1Olj2fYwIrYnlrd4hw'

})
//configure cloudinary storage
const cloudStorage=new CloudinaryStorage({
   cloudinary:cloudinary,
   params:async (req,file)=>{
      return {
         folder:'nodejs',
         public_id:file.fieldname+' '+Date.now()
      }
   }
})

//configure multer
const multerObj=multer({storage:cloudStorage})


module.exports=multerObj;
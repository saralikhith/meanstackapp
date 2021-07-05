import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

  constructor(private prObj:AdminService,private router:Router) { }

  ngOnInit(): void {
  }

  file:File;


  onSelectFile(eventObj){
         this.file= eventObj.target.files[0]
  }
  onClickAddProduct(ref){
         let prodObj=ref.value;

         //create formdata obj
         let formData=new FormData();

        //add file 
        formData.append('photo',this.file,this.file.name)

        //get username
        let username=localStorage.getItem('username')

        //add product obj
        formData.append('prodObj',JSON.stringify(prodObj))


        //make post req to product api
        this.prObj.addProductstoProdCollection(formData).subscribe(
          res=>{
              if(res.message=='product created successfully'){
                      alert('product added')
                      //navigate to view products

                      this.router.navigateByUrl(`admin/${username}/viewproducts`)

              }
              else{
                alert(res.message)
              }
          },
          err=>{
             console.log(err)
             alert('something went wrong in adding products')
          }
        )

  }
}

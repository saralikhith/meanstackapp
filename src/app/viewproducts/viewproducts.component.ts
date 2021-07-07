import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {

  constructor(private admin:AdminService,private user:UserService,private router:Router) { 
    
  }

login
  
  prod
  ngOnInit(): void {
  
    this.login=localStorage.getItem('username')


    
             this.admin.getProducts().subscribe(
               res=>{

                 this.admin.updateDataObservable(res.message)
                        
             
                 this.admin.dataObservable.subscribe(
                  prodObj=>{
                        
                          this.prod=prodObj
                  }
                )
  
                   }   
              
                   ,
               err=>{
                 console.log(err)
                 alert('something went wrong in viewing the products')
               }
             )
  }
  onDelete(products){
 
            this.admin.onDelete(products.model).subscribe(
              res=>{
                alert(res.message)
                this.admin.updateDataObservable(res.newProducts)
              },
              err=>{
                console.log(err.message)
               
                alert('something went wrong on deleting product')
              }
            )
  }

  onProductSelection(prodObj){
   
   let username=localStorage.getItem('username')

   let selectedProdObj={username,prodObj}

   this.user.onSelectionOfProduct(selectedProdObj).subscribe(
     res=>{
                alert(res.message)

                this.user.updateDataObservable(res.latestData)

                //navigate to cart
                this.router.navigateByUrl(`userProfile/${username}/addtocart`)

     },
     err=>{
       console.log('error at user cart collection',err)
       alert('something went wrong on adding products to cart')
     }
   )
           
  }


}

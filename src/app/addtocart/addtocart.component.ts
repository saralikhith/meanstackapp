import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {

  constructor(private user:UserService) { }
cartObj

  ngOnInit(): void {

  let  username=localStorage.getItem('username')
    this.user.getProductsInCart(username).subscribe(
      res=>{
                 if(res.message=='cart is empty'){
                   alert('cart is empty')
                 }    
                 else{
                   this.cartObj=res.message;
                 }
      },
      err=>{
        console.log(err.message)
        alert('something went wrong in cart collection')
      }
    )

  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private hc:HttpClient,private router:Router,private user:UserService) { }

  count
userObj
username
  ngOnInit(): void {
    //get data from local storage
    this.userObj=JSON.parse(localStorage.getItem('userObj'))

   this.user.getProductsInCart(this.userObj.username).subscribe(
     res=>{
              if(res.message=='cart is empty'){
                    this.user.updateDataObservable(0)
              }
              else{
                this.user.updateDataObservable(res.message)
              }

              this.user.dataObservable.subscribe(
                prodObj=>{
                  if(prodObj===0){
                 this.count=0
                  }
                  else{
                       
                     this.count=prodObj['products'].length;
                  }
                }
              )
     },
     err=>{
      console.log(err)
      alert(err.message)
     }
   )
  
  }
  getPrivateData(){
        this.hc.get('/user/privatedata').subscribe(
          res=>{
            alert(res['message'])
          },
          err=>{
            console.log(err)
            alert(err.message)
          }
        )
  }

  onClick(){
           this.username=localStorage.getItem('username')
           this.router.navigateByUrl(`passwordverification/${this.username}`)
  }


}

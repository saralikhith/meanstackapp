import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private user:UserService,private router:Router) { }

  
  loginStatus:boolean=false;
 
  ngOnInit(): void {
    
  }
  onClickLogin(ref){
     
    let loginObj=ref.value;
  


  this.user.onLogin(loginObj).subscribe(
    res=>{
          if(res.message=="login success"){
            alert('login success') 
           localStorage.setItem("token",res.token)
           localStorage.setItem("username",res.username)
           localStorage.setItem("userObj",JSON.stringify(res.userObj))
          
  
           if(loginObj.type==="user"){
            //navigate to user profile
            this.router.navigateByUrl(`userProfile/${res.username}`)
            }
            if(loginObj.type==="admin"){
              //navigate to admin profile
              this.router.navigateByUrl(`admin/${res.username}`)
            
              }
          
      
       
           
       
         //change login status to true
         this.user.loginStatus=true;
         
           

          }
          else{
            alert(res.message)
        
         

          }
    },
    err=>{
      console.log(err)
      alert('something Went wrong on login')
     
    }
  )
  }

}

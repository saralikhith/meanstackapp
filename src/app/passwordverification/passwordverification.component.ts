import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-passwordverification',
  templateUrl: './passwordverification.component.html',
  styleUrls: ['./passwordverification.component.css']
})
export class PasswordverificationComponent implements OnInit {

  constructor(private user:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(ref){
   
  
   
   let passobj={
     username:`${localStorage.getItem(`username`)}`,
     password:`${ref.value.password}`
   }


  
  

  
   

   
        this.user.checkValidPasswordOrNot(passobj).subscribe(
          res=>{
             
            if(res.message=='enter valid password'){
                 alert('enter valid password')
            }
            else{
                       alert(res.message)
                      //navigate to new password 
                      this.router.navigateByUrl(`passwordgeneration/${passobj.username}`) 
            }
          },
          err=>{
            console.log(err)
            alert('something went wrong while changing password')
          }
        )
  }

}

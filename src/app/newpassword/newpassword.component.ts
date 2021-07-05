import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  constructor( private user:UserService,private router:Router) { }
  passwordNotMatched
  ngOnInit(): void {
  }
  onclickGenerate(ref){


    let passwordobj={
      username:`${localStorage.getItem(`username`)}`,
      newpassword:`${ref.newpassword}`,
      confirmpassword:`${ref.confirmpassword}`
    }

    this.user.onGeneratingPassword(passwordobj).subscribe(
      res=>{
          if(res.message=='password not matched'){
                this.passwordNotMatched=res.message
                
          }
          if(res.message=='password should contain atleast one character'){
            alert(res.message)
      }
          else{
            alert(res.message)
         
            //navigate to login component
            this.router.navigateByUrl(`userProfile/${passwordobj.username}`)
            
           }
      },
      err=>{
        console.log(err)
        alert('somethong went wrong on password generation')
      }
    )

    


  }
}

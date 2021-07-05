import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private user:UserService,private router:Router) { }

  ngOnInit(): void {
  }
 file:File
  selectFile(event){
       this.file=event.target.files[0]
          
       }

  onClickSubmit(ref){
  
        let userobj=ref.value;

     
        

        let formData=new FormData();

        //add file to form data obj
       formData.append('photo',this.file,this.file.name)

        //add user object
        formData.append('userobj',JSON.stringify(userobj))

       
   
        this.user.createUser(formData).subscribe(
          res=>{
                if(res.message=="user created successfully"){
                  alert('user created')
                  //navigate to login page
                  
                   this.router.navigateByUrl('/login')
                }
                else{
                  alert(res.message)
                  ref.reset()
                }
          },
          err=>{
                console.log(err)
                alert('something went wrong in user creation')
               
          }
        )

        

      
       
  }

}

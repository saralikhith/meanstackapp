import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private hc:HttpClient,private router:Router) { }
userObj
username
  ngOnInit(): void {
    //get data from local storage
    this.userObj=JSON.parse(localStorage.getItem('userObj'))
  
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

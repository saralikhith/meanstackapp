import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public us:UserService){
          
  }

  onLogOut(){
    localStorage.clear();
   this.us.loginStatus=false
  }
}

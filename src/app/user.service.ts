import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) {
    if(localStorage.getItem('username')!==null){
     this.loginStatus=true;
    
    }
    
   }

  loginStatus=false;
 
  


  createUser(userObj):Observable<any>{
    
   return  this.hc.post('/user/createuser',userObj)
  }
  deleteUser(){
    return this.hc.delete('')
  }

 

  onLogin(userObj):Observable<any>{
    if(userObj.type==='user'){
      return this.hc.post('/user/login',userObj)
    }
    else{
      return this.hc.post('/admin/login',userObj)
    }
    }

    checkValidPasswordOrNot(passobj):Observable<any>{
      return this.hc.post(`/user/verifypassword/${passobj.username}`,passobj)
    }

    onGeneratingPassword(pwobj):Observable<any>{
      return this.hc.post(`/user/passwordgeneration/${pwobj.username}`,pwobj)
    }

    onSelectionOfProduct(prodobj):Observable<any>{
      return this.hc.post('/user/add-to-cart',prodobj)
    }
    
   getProductsInCart(usernamne):Observable<any>{
     return this.hc.get(`/user/getproducts/${usernamne}`)
   }
    
}

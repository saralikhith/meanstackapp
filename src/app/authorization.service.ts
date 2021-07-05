import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
     
    //get token from local storage
    let token=localStorage.getItem('token')
    //if token is existed
    if(token!==null){
           //add token to header of req obj
       const clonedObj =  req.clone({
           headers:req.headers.set('Authorization',`Bearer ${token}`)
          
           })
           return next.handle(clonedObj)
    }
    //if token is not existed
    else{
      return next.handle(req)
    }
  }
}

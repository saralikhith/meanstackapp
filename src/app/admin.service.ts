
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private hc:HttpClient) { }

  dataSource=new BehaviorSubject(0);

  dataObservable=this.dataSource.asObservable();

  updateDataObservable(data){
    this.dataSource.next(data)
  }



  addProductstoProdCollection(prodobj):Observable<any>{
          return this.hc.post('/products/addproducts',prodobj)
  }

  getProducts():Observable<any>{
    return this.hc.get('/products/getproducts')
  }

  onDelete(model):Observable<any>{
    return this.hc.delete(`/products/delete/${model}`)
  }

 
}

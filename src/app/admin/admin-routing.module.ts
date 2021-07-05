import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductsComponent } from '../addproducts/addproducts.component';
import { ViewproductsComponent } from '../viewproducts/viewproducts.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [{ path:'', component: AdminComponent ,children:[
  {path:'addproducts',component:AddproductsComponent},
  {path:'viewproducts',component:ViewproductsComponent},
  {path:'',redirectTo:'viewproducts',pathMatch:"full"}
 
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

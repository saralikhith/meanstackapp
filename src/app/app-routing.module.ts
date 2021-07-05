import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtocartComponent } from './addtocart/addtocart.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { PasswordverificationComponent } from './passwordverification/passwordverification.component';

import { RegisterComponent } from './register/register.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'userProfile/:username',component:UserprofileComponent,children:[
    {path:'viewproducts',component:ViewproductsComponent},
    {path:'addtocart',component:AddtocartComponent},
    {path:'',redirectTo:'viewproducts',pathMatch:'full'}
  ]},
  {path:'passwordverification/:username',component:PasswordverificationComponent},
  {path:'passwordgeneration/:username',component:NewpasswordComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  { path: 'admin/:username', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

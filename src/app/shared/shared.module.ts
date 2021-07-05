import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewproductsComponent } from '../viewproducts/viewproducts.component';
import { PasswordverificationComponent } from '../passwordverification/passwordverification.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ViewproductsComponent,
    PasswordverificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }

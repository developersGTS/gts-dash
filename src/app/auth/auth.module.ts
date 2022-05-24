import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AngularMaterialModule } from '../core/modules/angular-material/angular-material.module';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularMaterialModule
  ]
})
export class AuthModule { }

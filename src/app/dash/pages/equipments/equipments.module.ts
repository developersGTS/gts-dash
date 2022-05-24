import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentsRoutingModule } from './equipments-routing.module';
import { EquipmentsComponent } from '../equipments.component';


@NgModule({
  declarations: [
    EquipmentsComponent
  ],
  imports: [
    CommonModule,
    EquipmentsRoutingModule
  ]
})
export class EquipmentsModule { }

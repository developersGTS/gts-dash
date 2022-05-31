import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { EquipmentsRoutingModule } from './equipments-routing.module';
import { AngularMaterialModule } from '../../../core/modules/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import { CompanysModule } from '../companys/companys.module';
import { ContactsModule } from '../contacts/contacts.module';

// COMPONENTS
import { EquipmentsComponent } from './equipments.component';
import { ContractComponent } from './pages/contract/contract.component';
import { ListComponent } from './pages/list/list.component';
import { HomeComponent } from './pages/home/home.component';
import { EquipAddComponent } from './components/modals/equip-add/equip-add.component';
import { EquipCardDetailsV1Component } from './components/cards/details/equip-card-details-v1/equip-card-details-v1.component';

@NgModule({
  declarations: [
    EquipmentsComponent,
    ContractComponent,
    ListComponent,
    HomeComponent,
    EquipAddComponent,
    EquipCardDetailsV1Component,
  ],
  imports: [
    CommonModule,
    EquipmentsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    HttpClientModule,
    CompanysModule,
    ContactsModule,
  ],
})
export class EquipmentsModule {}

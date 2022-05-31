import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTS
import { EquipmentsComponent } from './equipments.component';
import { ContractComponent } from './pages/contract/contract.component';
import { ListComponent } from './pages/list/list.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentsComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
      ,{
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'contract',
        component: ContractComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentsRoutingModule {}

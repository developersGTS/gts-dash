import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignedComponent } from './pages/assigned/assigned.component';
import { HomeComponent } from './pages/home/home.component';
import { LabComponent } from './pages/lab/lab.component';
import { OnsiteComponent } from './pages/onsite/onsite.component';
import { PendingComponent } from './pages/pending/pending.component';
import { ServicesComponent } from './services.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'assigned',
        component: AssignedComponent,
      },
      {
        path: 'onsite',
        component: OnsiteComponent,
      },
      {
        path: 'lab',
        component: LabComponent,
      },
      {
        path: 'pending',
        component: PendingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}

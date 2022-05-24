import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AuthComponent
      },
      {
        path: '',
        redirectTo: 'login'
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

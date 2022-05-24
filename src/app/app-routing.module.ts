import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'dash',
    loadChildren: () => import('./dash/dash.module').then( m => m.DashModule )
  },
  {
    path: 'pub',
    loadChildren: () => import('./public/public.module').then( m => m.PublicModule )
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

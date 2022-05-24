import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'quotes',
        loadChildren: () =>
          import('./pages/quotes/quotes.module').then((m) => m.QuotesModule),
      },
      {
        path: 'collection',
        loadChildren: () =>
          import('./pages/collection/collection.module').then(
            (m) => m.CollectionModule
          ),
      },
      {
        path: 'home',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashRoutingModule {}

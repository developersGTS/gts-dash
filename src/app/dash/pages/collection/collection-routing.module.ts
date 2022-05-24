import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CollectionComponent } from './collection.component';
import { CollArchiveComponent } from './pages/quotes-tabs/coll-archive/coll-archive.component';
import { CollAssignedsComponent } from './pages/quotes-tabs/coll-assigneds/coll-assigneds.component';
import { CollPendingComponent } from './pages/quotes-tabs/coll-pending/coll-pending.component';
import { CollReceiptComponent } from './pages/quotes-tabs/coll-receipt/coll-receipt.component';
import { CollResumenComponent } from './pages/quotes-tabs/coll-resumen/coll-resumen.component';

const routes: Routes = [
  {
    path: '',
    component: CollectionComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'pending',
        component: CollPendingComponent,
      },
      {
        path: 'assigned',
        component: CollAssignedsComponent,
      },
      {
        path: 'receipt',
        component: CollReceiptComponent,
      },
      {
        path: 'resumen',
        component: CollResumenComponent,
      },
      {
        path: 'archive',
        component: CollArchiveComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionRoutingModule {}

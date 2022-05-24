import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuoteDesgloseComponent } from './pages/quote-desglose/quote-desglose.component';
import { QuotesManagerComponent } from './pages/quotes-manager/quotes-manager.component';
import { QtArchiveComponent } from './pages/quotes-tabs/qt-archive/qt-archive.component';
import { QtAssignedsComponent } from './pages/quotes-tabs/qt-assigneds/qt-assigneds.component';
import { QtFollowupComponent } from './pages/quotes-tabs/qt-followup/qt-followup.component';
import { QtPendingComponent } from './pages/quotes-tabs/qt-pending/qt-pending.component';
import { QtResumenComponent } from './pages/quotes-tabs/qt-resumen/qt-resumen.component';
import { QuotesComponent } from './quotes.component';

const routes: Routes = [
  {
    path: '',
    component: QuotesComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'assigned',
        component: QtAssignedsComponent,
      },
      {
        path: 'pending',
        component: QtPendingComponent,
      },
      {
        path: 'followup',
        component: QtFollowupComponent,
      },
      {
        path: 'resumen',
        component: QtResumenComponent,
      },
      {
        path: 'archive',
        component: QtArchiveComponent,
      },
      {
        path: 'add',
        component: QuotesManagerComponent,
      },
      {
        path: 'edit/:id',
        component: QuotesManagerComponent,
      },
    ],
  },
  {
    path: 'resumen/:quote',
    component: QuoteDesgloseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesRoutingModule {}

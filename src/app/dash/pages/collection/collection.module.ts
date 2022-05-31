import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { CollectionRoutingModule } from './collection-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { CompanysModule } from '../companys/companys.module';
import { ContactsModule } from '../contacts/contacts.module';
import { ServicesModule } from '../services/services.module';
import { QuotesModule } from '../quotes/quotes.module';

// PERFECT SCROLLBAR
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// COMPONENTS
import { CollectionComponent } from './collection.component';
import { HomeComponent } from './pages/home/home.component';
import { CollAssignedsComponent } from './pages/quotes-tabs/coll-assigneds/coll-assigneds.component';
import { CollPendingComponent } from './pages/quotes-tabs/coll-pending/coll-pending.component';
import { CollReceiptComponent } from './pages/quotes-tabs/coll-receipt/coll-receipt.component';
import { CollResumenComponent } from './pages/quotes-tabs/coll-resumen/coll-resumen.component';
import { CollArchiveComponent } from './pages/quotes-tabs/coll-archive/coll-archive.component';
import { CollCardDetailsV1Component } from './components/cards/details/coll-card-details-v1/coll-card-details-v1.component';
import { CollInvoiceAddV1Component } from './components/modals/coll-invoice-add-v1/coll-invoice-add-v1.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    CollectionComponent,
    HomeComponent,
    CollAssignedsComponent,
    CollPendingComponent,
    CollReceiptComponent,
    CollResumenComponent,
    CollArchiveComponent,
    CollCardDetailsV1Component,
    CollInvoiceAddV1Component,
  ],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    HttpClientModule,
    CompanysModule,
    ContactsModule,
    ServicesModule,
    QuotesModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class CollectionModule {}

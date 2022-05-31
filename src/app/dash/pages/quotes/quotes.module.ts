import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// MODULES
import { CompanysModule } from '../companys/companys.module';
import { ContactsModule } from '../contacts/contacts.module';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { QuotesRoutingModule } from './quotes-routing.module';
import { ServicesModule } from '../services/services.module';

// PERFECT SCROLLBAR
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

// DIRECTIVES
import { QtStatusV1Directive } from './directives/qt-status-v1.directive';

// COMPONENTS
import { QuotesComponent } from './quotes.component';
import { HomeComponent } from './pages/home/home.component';
import { QtAssignedsComponent } from './pages/quotes-tabs/qt-assigneds/qt-assigneds.component';
import { QtPendingComponent } from './pages/quotes-tabs/qt-pending/qt-pending.component';
import { QtFollowupComponent } from './pages/quotes-tabs/qt-followup/qt-followup.component';
import { QtResumenComponent } from './pages/quotes-tabs/qt-resumen/qt-resumen.component';
import { QtArchiveComponent } from './pages/quotes-tabs/qt-archive/qt-archive.component';
import { QtFilterComponent } from './components/searchers/qt-filter/qt-filter.component';
import { QtCardDetailsV1Component } from './components/cards/details/qt-card-details-v1/qt-card-details-v1.component';
import { QtCardResumenV1Component } from './components/cards/resumen/qt-card-resumen-v1/qt-card-resumen-v1.component';
import { QtSearcherV1Component } from './components/searchers/qt-searcher-v1/qt-searcher-v1.component';
import { QuotesManagerComponent } from './pages/quotes-manager/quotes-manager.component';
import { QtItemsComponent } from './pages/quotes-manager/qt-items/qt-items.component';
import { QtNotesComponent } from './pages/quotes-manager/qt-notes/qt-notes.component';
import { QtPreviewComponent } from './pages/quotes-manager/qt-preview/qt-preview.component';
import { QtAddItemComponent } from './components/cards/add/qt-add-item/qt-add-item.component';
import { QtPurcharseDetailsV1Component } from './components/modals/qt-purcharse-details-v1/qt-purcharse-details-v1.component';
import { QtCardItemDetailsV1Component } from './components/cards/details/qt-card-item-details-v1/qt-card-item-details-v1.component';
import { QtCardNotesItemComponent } from './components/cards/notes/qt-card-notes-item/qt-card-notes-item.component';
import { QtCardNoteResumenV1Component } from './components/cards/notes/qt-card-note-resumen-v1/qt-card-note-resumen-v1.component';
import { QtCardNoteAddComponent } from './components/cards/notes/qt-card-note-add/qt-card-note-add.component';
import { QtAddPurcharseOptionComponent } from './components/cards/add/qt-add-purcharse-option/qt-add-purcharse-option.component';
import { QtGeneralInfoComponent } from './pages/quotes-manager/qt-general-info/qt-general-info.component';
import { QtCardPurchaseOptionV1Component } from './components/cards/details/qt-card-purchase-option-v1/qt-card-purchase-option-v1.component';
import { QtUpdateStatusV1Component } from './components/modals/qt-update-status-v1/qt-update-status-v1.component';
import { QtFastviewComponent } from './components/modals/qt-fastview/qt-fastview.component';
import { QuoteDesgloseComponent } from './pages/quote-desglose/quote-desglose.component';
import { QtSearcherItemsV1Component } from './components/searchers/qt-searcher-items-v1/qt-searcher-items-v1.component';

@NgModule({
  declarations: [
    QuotesComponent,
    HomeComponent,
    QtAssignedsComponent,
    QtPendingComponent,
    QtFollowupComponent,
    QtResumenComponent,
    QtArchiveComponent,
    QtFilterComponent,
    QtCardDetailsV1Component,
    QtCardResumenV1Component,
    QtSearcherV1Component,
    QuotesManagerComponent,
    QtGeneralInfoComponent,
    QtItemsComponent,
    QtNotesComponent,
    QtPreviewComponent,
    QtAddItemComponent,
    QtPurcharseDetailsV1Component,
    QtCardItemDetailsV1Component,
    QtCardNotesItemComponent,
    QtCardNoteResumenV1Component,
    QtCardNoteAddComponent,
    QtAddPurcharseOptionComponent,
    QtCardPurchaseOptionV1Component,
    QtUpdateStatusV1Component,
    QtFastviewComponent,
    QuoteDesgloseComponent,
    QtStatusV1Directive,
    QtSearcherItemsV1Component,
  ],
  imports: [
    CommonModule,
    QuotesRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    HttpClientModule,
    CompanysModule,
    ContactsModule,
    ServicesModule,
  ],
  exports: [
    QtFilterComponent,
    QtCardDetailsV1Component,
    QtCardResumenV1Component,
    QtSearcherV1Component,
    QtAddItemComponent,
    QtPurcharseDetailsV1Component,
    QtCardItemDetailsV1Component,
    QtCardNotesItemComponent,
    QtCardNoteResumenV1Component,
    QtCardNoteAddComponent,
    QtAddPurcharseOptionComponent,
    QtCardPurchaseOptionV1Component,
    QtUpdateStatusV1Component,
    QtFastviewComponent,
    QuoteDesgloseComponent,
    QtStatusV1Directive,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class QuotesModule {}

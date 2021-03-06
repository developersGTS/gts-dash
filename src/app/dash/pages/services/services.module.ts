import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { ServicesRoutingModule } from './services-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// PERFECT SCROLLBAR
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

// COMPONENTS
import { SerPreviewComponent } from './components/modals/ser-preview/ser-preview.component';
import { ServicesComponent } from './services.component';
import { HomeComponent } from './pages/home/home.component';
import { AssignedComponent } from './pages/assigned/assigned.component';
import { OnsiteComponent } from './pages/onsite/onsite.component';
import { LabComponent } from './pages/lab/lab.component';
import { PendingComponent } from './pages/pending/pending.component';
import { SerCardDetailsV1Component } from './components/cards/details/ser-card-details-v1/ser-card-details-v1.component';
import { SerAddComponent } from './components/modals/ser-add/ser-add.component';
import { SerUpdateStatusV1Component } from './components/modals/ser-update-status-v1/ser-update-status-v1.component';
import { SerFilterV1Component } from './components/searchers/ser-filter-v1/ser-filter-v1.component';
import { SerSearcherV1Component } from './components/searchers/ser-searcher-v1/ser-searcher-v1.component';
import { SerSelectServiceByFilterV1Component } from './components/modals/ser-select-service-by-filter-v1/ser-select-service-by-filter-v1.component';
import { SerCardDetailsV2Component } from './components/cards/details/ser-card-details-v2/ser-card-details-v2.component';
import { SerCardDetailsResumenV1Component } from './components/cards/details/ser-card-details-resumen-v1/ser-card-details-resumen-v1.component';
import { SerPreviewPartsListComponent } from './components/modals/ser-preview-parts-list/ser-preview-parts-list.component';
import { SerCardPartDetailsV1Component } from './components/cards/details/ser-card-part-details-v1/ser-card-part-details-v1.component';

@NgModule({
  declarations: [
    SerPreviewComponent,
    ServicesComponent,
    HomeComponent,
    AssignedComponent,
    OnsiteComponent,
    LabComponent,
    PendingComponent,
    SerCardDetailsV1Component,
    SerAddComponent,
    SerUpdateStatusV1Component,
    SerFilterV1Component,
    SerSearcherV1Component,
    SerSelectServiceByFilterV1Component,
    SerCardDetailsV2Component,
    SerCardDetailsResumenV1Component,
    SerPreviewPartsListComponent,
    SerCardPartDetailsV1Component,
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
  ],
  exports: [SerPreviewComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class ServicesModule {}

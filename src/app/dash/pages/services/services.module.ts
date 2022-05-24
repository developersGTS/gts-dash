import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SerPreviewComponent } from './components/modals/ser-preview/ser-preview.component';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';

@NgModule({
  declarations: [SerPreviewComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
  ],
  exports: [SerPreviewComponent],
})
export class ServicesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanysRoutingModule } from './companys-routing.module';
import { CompanysComponent } from './companys.component';
import { HttpClientModule } from '@angular/common/http';
import { CompanyAddComponent } from './pages/company-add/company-add.component';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComPreviewComponent } from './components/modals/com-preview/com-preview.component';

@NgModule({
  declarations: [CompanysComponent, CompanyAddComponent, ComPreviewComponent],
  imports: [
    CommonModule,
    CompanysRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [CompanyAddComponent, ComPreviewComponent],
})
export class CompanysModule {}

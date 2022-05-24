import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactAddComponent } from './pages/contact-add/contact-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { ConPreviewComponent } from './components/modals/con-preview/con-preview.component';

@NgModule({
  declarations: [ContactsComponent, ContactAddComponent, ConPreviewComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  exports: [ContactAddComponent],
})
export class ContactsModule {}

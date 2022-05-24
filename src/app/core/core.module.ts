import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page404Component } from './page404/page404.component';
import { DashCardV1Component } from './components/cards/dash/dash-card-v1/dash-card-v1.component';
import { DgConfirmationV1Component } from './components/dialogs/dg-confirmation-v1/dg-confirmation-v1.component';
import { DgMessageV1Component } from './components/dialogs/dg-message-v1/dg-message-v1.component';
import { DgNotificationV1Component } from './components/dialogs/dg-notification-v1/dg-notification-v1.component';
import { DgSubmitV1Component } from './components/dialogs/dg-submit-v1/dg-submit-v1.component';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';



@NgModule({
  declarations: [
    Page404Component,
    DashCardV1Component,
    DgConfirmationV1Component,
    DgMessageV1Component,
    DgNotificationV1Component,
    DgSubmitV1Component
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    Page404Component,
    DashCardV1Component,
    DgConfirmationV1Component,
    DgMessageV1Component,
    DgNotificationV1Component,
    DgSubmitV1Component
  ]
})
export class CoreModule { }

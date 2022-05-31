import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { DashRoutingModule } from './dash-routing.module';
import { AngularMaterialModule } from '../core/modules/angular-material/angular-material.module';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';

// PERFECT SCROLLBAR
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// COMPONENTS
import { DashComponent } from './dash.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarClassicComponent } from './components/navbars/navbar-classic/navbar-classic.component';
import { SidebarClassicComponent } from './components/sidebars/sidebar-classic/sidebar-classic.component';
import { FooterClassicComponent } from './components/footers/footer-classic/footer-classic.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    DashComponent,
    FooterClassicComponent,
    NavbarClassicComponent,
    SidebarClassicComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    DashRoutingModule,
    AngularMaterialModule,
    PerfectScrollbarModule,
    CoreModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class DashModule {}

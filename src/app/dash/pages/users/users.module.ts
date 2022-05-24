import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, UsersRoutingModule, HttpClientModule],
})
export class UsersModule {}

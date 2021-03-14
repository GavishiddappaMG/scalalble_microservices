import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { environment } from '../../environments/environment';
import { UploadComponent } from './upload/upload.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { FunctionListComponent } from './function-list/function-list.component';

@NgModule({
  declarations: [HomeComponent, DashboardComponent, UploadComponent, FunctionListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    WidgetsModule
  ]
})
export class HomeModule { }


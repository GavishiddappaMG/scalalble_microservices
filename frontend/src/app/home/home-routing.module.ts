import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { FunctionListComponent } from './function-list/function-list.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          breadcrumb: 'Dashboard'
        }
      },
      {
        path: 'create',
        component: UploadComponent,
        data: {
          breadcrumb: 'Create'
        }
      },
      {
        path: 'functions',
        component: FunctionListComponent,
        data: {
          breadcrumb: 'Functions'
        }
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

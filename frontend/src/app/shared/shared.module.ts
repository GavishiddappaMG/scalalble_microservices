import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { NotificationDialogComponent } from '../shared/notification-dialog/notification-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    ConfirmPopupComponent,
    NotificationDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    ConfirmPopupComponent,
    NotificationDialogComponent
  ],
  providers: [],
  entryComponents: [
    ConfirmPopupComponent,
    NotificationDialogComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProgressComponent } from './progress/progress.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [FileUploadComponent, ProgressComponent, CardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FileUploadComponent,
    CardComponent
  ]
})
export class WidgetsModule { }

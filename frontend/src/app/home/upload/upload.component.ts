import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { requiredFileType, requiredFileTypes } from 'src/app/widgets/file-upload/extention.validator';
import { MatStepper } from '@angular/material';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  isFileSaved = false;
  enableFunctionPackage = false;
  form: FormGroup;
  uploadForm: FormGroup;
  codeFile: string;


  constructor(
    private uploadService: UploadService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      functionEnv: ['', [Validators.required]],
      functionBuilder: ['', [Validators.required]],
      clusterIp: ['', [Validators.required, Validators.pattern(/^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$/)]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      functionURL: ['', [Validators.required], this.validateNameViaServer.bind(this)],
      functionMethod: ['', [Validators.required]],
      functionName: ['', [Validators.required], this.validateURLViaServer.bind(this)],
      file: [null, [Validators.required, requiredFileTypes(['js', 'zip', 'py'])]],
    });
  }

  updateData() {
    console.log(this.form);
    if (this.form.valid) {
      this.uploadService.postFunctionInfo(this.form.value)
        .subscribe((response) => {
          this.form.reset();
          this.enableFunctionPackage = false;
        });
    }
  }

  onFileSelect(event: any) {
    if (event.type === 'application/x-zip-compressed') {
      this.form.addControl('functionPackage', new FormControl('', Validators.required));
      this.enableFunctionPackage = true;
    } else {
      this.form.removeControl('functionPackage');
      this.enableFunctionPackage = false;
    }
  }

  hasError(field: string, error: string) {
    const control = this.form.get(field);
    return control.dirty && control.hasError(error);
  }

  reset() {
    this.form.reset();
  }

  validateNameViaServer({ value }: AbstractControl): Observable<ValidationErrors | null> {
    return this.uploadService.isNameExists(value)
      .pipe(debounceTime(500), map((data: any) => {
        if (data.exists) {
          return {
            isExists: true
          };
        }
        return null;
      }));
  }

  validateURLViaServer({ value }: AbstractControl): Observable<ValidationErrors | null> {
    return this.uploadService.isURLExists(value)
      .pipe(debounceTime(500), map((data: any) => {
        if (data.exists) {
          return {
            isExists: true
          };
        }
        return null;
      }));
  }

  downloadFunction(filename: string) {
    this.uploadService.downloadSample(filename).subscribe(data => {
      const blob = new Blob([data], {
        type: 'application/javascript'
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  downloadZip(filename: string) {
    this.uploadService.downloadSample(filename).subscribe(data => {
      const blob = new Blob([data], {
        type: 'application/zip'
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }



}

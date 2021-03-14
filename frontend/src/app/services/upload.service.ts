import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }


  // uploadFunctionFile(file: any) {
  //   let formData = new FormData();
  //   formData.append('file', file);
  //   console.log(file);
  //   return this.http.post('http://localhost:3000/api/v1/sample/upload', formData);
  // }



  postFunctionInfo(data: any) {
    let formData = new FormData();
    let keys =  Object.keys(data);
    for (let key of keys) {
      formData.append(key, data[key]);
    }
    console.log(formData);
    return this.http.post('http://localhost:3003/api/v1/serverless/createFn', formData);
  }

  isURLExists(value: string) {
    return this.http.get(`http://localhost:3003/api/v1/serverless/checkFnNameExists/${value}`);
  }

  isNameExists(value: string) {
    return this.http.get(`http://localhost:3003/api/v1/serverless/checkFnUrlExists/${value}`);
  }

  getAllFunctions() {
    return this.http.get('http://localhost:3003/api/v1/serverless/getAllFunctions');
  }

  downloadSample(fileName: string) {
    return this.http.get(`http://localhost:3003/api/v1/serverless/download/sampleFile/${fileName}`, {
      responseType: 'arraybuffer'
    });
  }
}

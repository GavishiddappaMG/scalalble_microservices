import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorService: ErrorService
  ) { }

  login(userName: string, password: string) {
    const data = {
      userName,
      password
    }
    const url = `${environment.apiEndPoint}`;

    localStorage.setItem('access_token', userName);
    localStorage.setItem('userId', '1234');
    this.router.navigate(['/home']);

    // const url = 'http://localhost:4000/';
    // this.http.post(`${url}${environment.apis.auth}`, data)
    // .subscribe((response) => {
    //   localStorage.setItem('access_token', response['token']);
    //   localStorage.setItem('userId', response['userId']);
    //     this.router.navigate(['/home']);
    // }, err => {
    //    this.errorService.thorwError('Invalid username or password!');
    // });
  }

  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}

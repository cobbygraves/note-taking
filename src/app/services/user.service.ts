import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userToken: string = localStorage.getItem('token') || '';
  constructor(private router: Router, private http: HttpClient) {}

  setUserToken(token: string) {
    this.userToken = token;
  }

  getUserToken() {
    return this.userToken;
  }

  clearUserToken() {
    localStorage.removeItem('token');
    this.userToken = '';
  }

  isLoggedIn() {
    return this.userToken ? true : false;
  }

  loginUser(userData: { username: string; password: string }) {
    this.http.post(`${environment.baseURL}/user/login`, userData).subscribe({
      next: (res: any) => {
        this.setUserToken(res.accessToken);
        localStorage.setItem('token', res.accessToken);
        this.router.navigate(['notes']);
      },
      error: (err) => console.log(err), // create error service to handle errors
    });
  }

  logoutUser() {
    this.userToken = '';
    this.router.navigate(['login']);
    localStorage.removeItem('token');
  }
}

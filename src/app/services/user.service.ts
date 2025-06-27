import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userToken: string = localStorage.getItem('token') || '';
  constructor(
    private router: Router,
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

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
    return this.http.post(`${environment.baseURL}/user/login`, userData);
  }

  logoutUser() {
    this.userToken = '';
    this.router.navigate(['login']);
    localStorage.removeItem('token');
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {}

  userToken: string = '';

  setUserToken(token: string) {
    this.userToken = token;
  }

  getUserToken() {
    return this.userToken;
  }

  clearUserToken() {
    this.userToken = '';
  }

  isLoggedIn() {
    return !!this.userToken;
  }

  loginUser(token: string) {
    this.userToken = token;
    this.router.navigate(['notes']);
  }
}

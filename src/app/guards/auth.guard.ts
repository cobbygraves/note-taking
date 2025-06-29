import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(): boolean {
    const token = this.userService.getUserToken();

    if (token) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}

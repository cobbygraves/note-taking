import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from '../../services/error.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, ReactiveFormsModule, Toast],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    public errorService: ErrorService,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['notes']);
    }
  }

  loginUser() {
    this.userService
      .loginUser({
        username: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe({
        next: (res: any) => {
          this.userService.setUserToken(res.accessToken);
          localStorage.setItem('token', res.accessToken);
          this.router.navigate(['notes']);
        },
        error: ({ error }: any) => {
          this.errorService.setMessage(error);
          this.show();
        },
      });
  }

  show() {
    this.messageService.add({
      severity: 'contrast',
      summary: this.errorService.error()?.error,
      detail: this.errorService.error()?.message,
      life: 3000,
    });
  }
}

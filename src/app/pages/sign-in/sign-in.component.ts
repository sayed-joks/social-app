import { Component, inject } from '@angular/core';
import { UsersService } from '../../core/Services/useres/users.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
  errorMsg: string = '';
  isLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this.isLoading = true;
      this.usersService.signin(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
          if (response.message == 'success') {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/feed']);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.errorMsg = error.error.error;
          console.error(error);
        },
      });
    }
  }
}

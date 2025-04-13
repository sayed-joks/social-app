import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../core/Services/useres/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  private readonly id = inject(PLATFORM_ID);
  private readonly usersService = inject(UsersService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  check: string = '';
  errorMsg: string = '';
  isLoading: boolean = false;
  ngOnInit(): void {
    if (isPlatformBrowser(this.id)) {
      if (localStorage.getItem('theme') == 'dark') {
        this.check = 'dark';
      } else if (localStorage.getItem('theme') == 'light') {
        this.check = 'light';
      } else {
        this.check = 'default';
      }
    }
  }
  darkMode(): void {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  }

  lightMode(): void {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }

  defaultMode(): void {
    localStorage.removeItem('theme');
    document.documentElement.classList.remove('dark', 'light');

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
  }

  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
    ]),
  });
  get passwordErrorMessage(): string {
    if (this.changePasswordForm.get('newPassword')?.hasError('required')) {
      return 'Password is required.';
    }
    if (this.changePasswordForm.get('newPassword')?.hasError('pattern')) {
      return 'Password must be at least 8 characters and include at least one letter and one number.';
    }
    return '';
  }
  change(): void {
    console.log(this.changePasswordForm.value);
    this.isLoading = true;
    this.usersService.changePassword(this.changePasswordForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);
        this.errorMsg = '';
        this.changePasswordForm.reset();
        localStorage.removeItem('token');
        this.router.navigate(['/sign-in']);
        this.toastrService.success('Password Changed Successfully', '', {
          progressBar: true,
          timeOut: 1500,
        });
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
        this.errorMsg = err.error.error;
      },
    });
  }
}

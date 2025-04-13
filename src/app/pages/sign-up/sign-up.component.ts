import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { minimumAgeValidator } from './custom-DOB';
import { UsersService } from '../../core/Services/useres/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private readonly router = inject(Router);
  private readonly usersService = inject(UsersService);
  errorMsg: string = '';
  isSuccess: string = '';
  isLoading: boolean = false;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
      rePassword: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', [
        Validators.required,
        minimumAgeValidator(18),
      ]),
      gender: new FormControl('', Validators.required),
    },
    { validators: this.passwordMatchValidator }
  );
  passwordMatchValidator(g: AbstractControl) {
    return g.get('password')?.value === g.get('rePassword')?.value
      ? null
      : { missmatch: true };
  }
  addSubmit(): void {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.usersService.signup(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.isSuccess = 'Registration successful!';
            setTimeout(() => {
              this.router.navigate(['/sign-in']);
            }, 1500);
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          console.log(err);
          this.errorMsg = err.error.error;
        },
      });
    }
  }
  get nameErrorMessage(): string {
    if (this.registerForm.get('name')?.hasError('required')) {
      return 'Name is required.';
    }
    if (this.registerForm.get('name')?.hasError('minlength')) {
      return 'Name must be at least 3 characters long.';
    }
    if (this.registerForm.get('name')?.hasError('maxlength')) {
      return 'Name must be less than 20 characters.';
    }
    return '';
  }

  get emailErrorMessage(): string {
    if (this.registerForm.get('email')?.hasError('required')) {
      return 'Email is required.';
    }
    if (this.registerForm.get('email')?.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    return '';
  }

  get passwordErrorMessage(): string {
    if (this.registerForm.get('password')?.hasError('required')) {
      return 'Password is required.';
    }
    if (this.registerForm.get('password')?.hasError('pattern')) {
      return 'Password must be at least 8 characters and include at least one letter and one number.';
    }
    return '';
  }

  get rePasswordErrorMessage(): string {
    if (this.registerForm.get('rePassword')?.hasError('required')) {
      return 'Password confirmation is required.';
    }
    if (this.registerForm.hasError('missmatch')) {
      return 'Passwords do not match.';
    }
    return '';
  }

  get dateOfBirthErrorMessage(): string {
    if (this.registerForm.get('dateOfBirth')?.hasError('required')) {
      return 'Date of birth is required.';
    }
    if (this.registerForm.get('dateOfBirth')?.errors?.['minimumAge']) {
      return 'Date of birth is invalid or you must be at least 18 years old.';
    }
    return '';
  }

  get genderErrorMessage(): string {
    if (this.registerForm.get('gender')?.hasError('required')) {
      return 'Gender is required.';
    }
    return '';
  }
}

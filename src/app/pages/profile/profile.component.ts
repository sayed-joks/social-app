import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../core/Services/useres/users.service';
import { IUser } from '../../shared/interfaces/iuser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  userData: IUser = {} as IUser;
  image!: File;
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData(): void {
    this.usersService.GetloggedUserData().subscribe({
      next: (res) => {
        console.log(res.user);
        this.userData = res.user;
      },
    });
  }
  changeImage(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
    }
  }
  changeProfilePhoto(): void {
    const formData = new FormData();
    formData.append('photo', this.image);
    this.usersService.uploadProfilePhoto(formData).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}

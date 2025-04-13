import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LoadingBarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input({ required: true }) isLogin: boolean = true;
  private readonly router = inject(Router);
  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
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
}

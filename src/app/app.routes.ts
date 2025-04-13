import { Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { MainComponent } from './layout/main/main.component';
import { mainGuard } from './core/guards/main/main.guard';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  {
    path: '',
    component: AuthComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./pages/sign-in/sign-in.component').then(
            (m) => m.SignInComponent
          ),
        title: 'Sign-in',
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./pages/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
        title: 'Sign-up',
      },
    ],
  },
  {
    path: '',
    canActivate: [mainGuard],
    component: MainComponent,
    children: [
      {
        path: 'feed',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'Friends.',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
        title: 'Profile',
      },
      {
        path: 'setting',
        loadComponent: () =>
          import('./pages/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
        title: 'Setting',
      },
    ],
  },
];

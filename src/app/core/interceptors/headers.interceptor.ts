import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const id = inject(PLATFORM_ID);

  if (isPlatformBrowser(id)) {
    if (localStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem('token')!,
        },
      });
    }
  }
  return next(req);
};

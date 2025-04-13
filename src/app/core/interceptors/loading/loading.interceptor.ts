import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingBar = inject(LoadingBarService);
  loadingBar.start();
  return next(req).pipe(
    finalize(() => {
      loadingBar.stop();
    })
  );
};

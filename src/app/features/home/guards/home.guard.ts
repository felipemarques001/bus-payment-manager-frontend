import { inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { catchError, map, of } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';

export const homeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (hasToken(authService)) {
    return true;
  }

  return authService.refreshToken()
    .pipe(
      map(() => hasToken(authService)),
      catchError(() => {
        router.navigate(['/login']);
        return of(false);
      })
    );
};

function hasToken(authService: AuthService): boolean {
  return authService.getToken !== null;
}

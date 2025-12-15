import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  console.log(auth);
  if (auth.getUserRole() === 'ROLE_ADMIN') {
    return true;
  }

  router.navigate(['/flights']);
  return false;
};

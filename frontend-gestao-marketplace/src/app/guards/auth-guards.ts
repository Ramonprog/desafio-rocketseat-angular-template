import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth';
import { UserService } from '../services/user';

export const authGuard: CanActivateFn = (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  // não possui token no localStorage
  if (!_userAuthService.getUserToken()) {
    return _router.navigate(['/login']);
  }
  return true;
};

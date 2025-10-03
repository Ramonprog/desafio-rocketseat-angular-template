import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth';
import { UserService } from '../services/user';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  // não possui token no localStorage
  if (!_userAuthService.getUserToken()) {
    return _router.navigate(['/login']);
  }

  try {
    //tenta validar o token no backend
    await firstValueFrom(_userService.validateUser());

    // se estiver na rota de login e o token for válido, redireciona para /products
    if (state.url === '/login') {
      return _router.navigate(['/products']);
    }
    // se o token for válido, permite o acesso a rota
    return true;
  } catch (error) {
    console.log('🚀 ~ authGuard ~ error:', error);
    return _router.navigate(['/login']);
  }
  return true;
};

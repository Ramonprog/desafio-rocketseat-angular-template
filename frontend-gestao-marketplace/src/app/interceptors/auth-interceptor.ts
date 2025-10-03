import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserAuthService } from '../services/user-auth';

/**
 *
 * Interceptor para adicionar o token de autenticação nas requisições HTTP.
 * Se o token estiver disponível, ele é adicionado ao cabeçalho 'Authorization'.
 * Caso contrário, a requisição é enviada sem modificações.
 * @param req A requisição HTTP original.
 * @param next A função que processa a requisição.
 * @returns A requisição HTTP, possivelmente modificada com o token de autenticação.
 *  headers: req.headers.append('Authorization', `Bearer ${HAS_TOKEN}`),
 * nessa parte, o header é clonado e o token é adicionado.
 * caso não tenha nenhum header, ele cria um novo com o token.
 */
export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const _userAuthService = inject(UserAuthService);
  const HAS_TOKEN = _userAuthService.getUserToken();
  if (HAS_TOKEN) {
    const authReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${HAS_TOKEN}`),
    });
    return next(authReq);
  }
  return next(req);
};

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthSuccessResponse } from '../interfaces/auth-success-response';

@Injectable({
  providedIn: 'root',
})
//é uma classe que pode ser ingetada em outros componentes ou serviços
//usado para gerenciar dados e lógica relacionada ao usuário
export class UserService {
  private readonly _httpClient = inject(HttpClient);
  //no angular não usamos fetch nem axios, usamos o HttpClient
  validateUser() {
    return this._httpClient.get<IAuthSuccessResponse>('http://localhost:3000/api/protected');
  }
}

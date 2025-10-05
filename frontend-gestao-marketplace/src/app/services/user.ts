import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthSuccessResponse } from '../interfaces/auth-success-response';
import { ILoginSuccessResponse } from '../interfaces/login-sucess-response';
import { Observable } from 'rxjs';

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

  login(email: string, password: string): Observable<ILoginSuccessResponse> {
    return this._httpClient.post<ILoginSuccessResponse>('http://localhost:3000/api/users/login', {
      email,
      password,
    });
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  getUserToken() {
    //TODO: pegar o token do local storage
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoibm92b0BleGFtcGxlLmNvbSIsImlhdCI6MTc1OTUwODY5MiwiZXhwIjoxNzU5NTk1MDkyfQ.DFmrB9Xcdb9ubTmUFp_hcD-dNVPKopEAzNpADkFPxGg';
  }
}

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user';
import { UserAuthService } from '../../services/user-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginErrorMessage = '';
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  private readonly _userService = inject(UserService);
  private readonly _userAuthService = inject(UserAuthService);
  private readonly _router = inject(Router);

  login() {
    if (this.userForm.invalid) return console.log('Formulário inválido');

    this._userService.login(this.userForm.value.email!, this.userForm.value.password!).subscribe({
      next: (response) => {
        const { token } = response.data;
        this.loginErrorMessage = '';
        this._userAuthService.setUserToken(token);
        this._router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Erro ao realizar login:', error);
        this.loginErrorMessage = error.error.message || 'Erro ao realizar login';
      },
    });
  }
}

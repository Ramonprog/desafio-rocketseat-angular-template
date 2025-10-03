import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Products } from './pages/products/products';
import { NewProduct } from './pages/new-product/new-product';
import { authGuard } from './guards/auth-guards';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'products', component: Products },
      { path: 'new-product', component: NewProduct },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

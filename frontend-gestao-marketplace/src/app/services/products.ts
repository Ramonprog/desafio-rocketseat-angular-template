import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { Observable } from 'rxjs';
import { IProductResponseSucess } from '../interfaces/IProduct-response-sucess';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _httpServide = inject(HttpClient);

  createProduct(payload: IProduct): Observable<IProductResponseSucess> {
    return this._httpServide.post<IProductResponseSucess>(
      'http://localhost:3000/api/products',
      payload
    );
  }

  getProducts(): Observable<IProductResponseSucess> {
    return this._httpServide.get<IProductResponseSucess>('http://localhost:3000/api/products');
  }
}

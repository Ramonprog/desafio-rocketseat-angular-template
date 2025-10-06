import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products';
import { take } from 'rxjs';
import { IProduct } from '../../interfaces/IProduct';
import { IProductResponseList } from '../../interfaces/product-response-list';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private readonly _productsService = inject(ProductsService);
  products: IProductResponseList[] = [];

  filterForm = new FormGroup({
    title: new FormControl(''),
    status: new FormControl(''),
  });

  //ngOnInit lifecycle que chama a func assim que o componente for iniciado
  ngOnInit() {
    this._productsService
      .getProducts()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.products = res.data;
        },
      });
  }
}

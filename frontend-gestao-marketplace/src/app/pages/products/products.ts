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
  filteredProducts: IProductResponseList[] = [];

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
          this.filteredProducts = res.data;
        },
      });
  }

  applyFilter() {
    const title = this.filterForm.value.title?.toLowerCase();
    const status = this.filterForm.value.status?.toLowerCase();

    this.filteredProducts = this.products.filter(
      (product) =>
        (!title || product.title.toLowerCase().includes(title)) &&
        (!status || product.status.toLowerCase() === status)
    );
  }

  resertFilter() {
    this.filteredProducts = this.products;
  }
}

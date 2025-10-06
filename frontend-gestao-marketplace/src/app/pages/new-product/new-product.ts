import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products';
import { take } from 'rxjs';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css',
})
export class NewProduct {
  productImageBase64 = '';
  successMessage = '';
  private readonly _ProductService = inject(ProductsService);

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  saveProduct() {
    if (this.productForm.invalid || !this.productImageBase64) return;
    const { title, price, description, category } = this.productForm.value;
    const payload = {
      title: title as string,
      price: price as number,
      description: description as string,
      category: category as string,
      imageBase64: this.productImageBase64,
    };
    //pipe(take(1)) para completar a subscrição após a primeira emissão e não ficar ouvindo indefinidamente
    this._ProductService
      .createProduct(payload)
      .pipe(take(1))
      .subscribe({
        next: (product) => {
          this.successMessage = product.message;
          this.productForm.reset();
          this.productImageBase64 = '';
        },
        error: (err) => {
          console.error('Erro ao criar produto', err);
        },
      });
  }

  onFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.convertFileToBase64(file);
    }
  }
  convertFileToBase64(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const imageBase64 = e.target.result as string;
      this.productImageBase64 = imageBase64;
    };

    reader.onerror = (e) => {
      console.error('Erro ao ler o arquivo', e);
      this.productImageBase64 = '';
    };

    reader.readAsDataURL(file);
  }
}

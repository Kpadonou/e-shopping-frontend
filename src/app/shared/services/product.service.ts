import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public getById(id: number) {
    return this.httpClient.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  public getAll() {
    return this.httpClient.get<Product[]>(`${environment.apiUrl}/products`);
  }

  public create(product: Product) {
    return this.httpClient.post(`${environment.apiUrl}/products`, product);
  }

  public update(product: Product) {
    return this.httpClient.put(
      `${environment.apiUrl}/products/${product.id}`,
      product
    );
  }

  public delete(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/products/${id}`);
  }
}

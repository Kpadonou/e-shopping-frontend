import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public getProductById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/product/id/${id}`);
  }

  public getProducts() {
    return this.httpClient.get<Product[]>(`${environment.apiUrl}/product/all`);
  }

  public createProduct(product: Product) {
    return this.httpClient.post(`${environment.apiUrl}/product/save`, product);
  }

  public updateProduct(product: Product) {
    return this.httpClient.put(`${environment.apiUrl}/product/update`, product);
  }

  public deleteProduct(id: number) {
    return this.httpClient.delete(
      `${environment.apiUrl}/product/delete/id/${id}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartItemService {
  constructor(private httpClient: HttpClient) {}
  public getById(id: number) {
    return this.httpClient.get<ShoppingCartItem>(
      `${environment.apiUrl}/shopping-cart-items/${id}`
    );
  }

  public getAll() {
    return this.httpClient.get<ShoppingCartItem[]>(
      `${environment.apiUrl}/shopping-cart-items`
    );
  }

  public create(item: ShoppingCartItem) {
    return this.httpClient.post<ShoppingCartItem>(
      `${environment.apiUrl}/shopping-cart-items`,
      item
    );
  }

  public update(item: ShoppingCartItem) {
    return this.httpClient.put<ShoppingCartItem>(
      `${environment.apiUrl}/shopping-cart-items/${item.id}`,
      item
    );
  }

  public delete(id: number) {
    return this.httpClient.delete(
      `${environment.apiUrl}/shopping-cart-items/${id}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private httpClient: HttpClient) {}

  public getShoppingCartById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/shopping-cart/id/${id}`);
  }

  public getShoppingCarts() {
    return this.httpClient.get<ShoppingCart[]>(
      `${environment.apiUrl}/shopping-cart/all`
    );
  }

  public createShoppingCart(shoppingCart: ShoppingCart) {
    return this.httpClient.post(
      `${environment.apiUrl}/shopping-cart/save`,
      shoppingCart
    );
  }

  public updateShoppingCart(shoppingCart: ShoppingCart) {
    return this.httpClient.put(
      `${environment.apiUrl}/shopping-cart/update`,
      shoppingCart
    );
  }

  public deleteShoppingCart(id: number) {
    return this.httpClient.delete(
      `${environment.apiUrl}/shopping-cart/delete/id/${id}`
    );
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    /* let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove(); */
  }

  private getItem(cartId: string, productId: string) {
    // return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    /* let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key; */
    return '';
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);
    /* item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change;
      if (quantity === 0) item$.remove();
      else item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    }); */
  }
}

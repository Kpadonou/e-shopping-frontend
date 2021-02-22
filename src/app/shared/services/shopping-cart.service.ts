import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCartItemService } from './shopping-cart-item.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  shoppinCart: ShoppingCart;
  constructor(
    private httpClient: HttpClient,
    private cartItemService: ShoppingCartItemService
  ) {}

  public getCarts() {
    return this.httpClient.get<ShoppingCart[]>(
      `${environment.apiUrl}/shopping-cart/all`
    );
  }

  private create(shoppingCart: ShoppingCart) {
    return this.httpClient.post<ShoppingCart>(
      `${environment.apiUrl}/shopping-carts`,
      shoppingCart
    );
  }

  getItemsOfCart(cartId: number) {
    return this.httpClient.get<ShoppingCartItem[]>(
      `${environment.apiUrl}/cart/${cartId}/shopping-cart-items`
    );
  }

  public getCartById(id: number) {
    return this.httpClient.get<ShoppingCart>(
      `${environment.apiUrl}/shopping-carts/${id}`
    );
  }

  public getOrCreateCart(): Observable<ShoppingCart> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return this.getCartById(+cartId).pipe(
        switchMap((cart) => this.getItemsOfCart(cart.id)),
        map((items) => {
          const sortedItems = items.sort((a, b) => {
            if (a.product.title.toLowerCase() < b.product.title.toLowerCase()) {
              return -1;
            }
            if (a.product.title.toLowerCase() > b.product.title.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          let c = new ShoppingCart(sortedItems, +cartId);
          return c;
        })
      );
    }
    let cart = new ShoppingCart([]);
    return this.create(cart).pipe(
      map((createdCart) => {
        localStorage.setItem('cartId', `${createdCart.id}`);
        let c = new ShoppingCart([], createdCart.id);
        return c;
      })
    );
  }

  addToCart(
    cart: ShoppingCart,
    product: Product
  ): Observable<ShoppingCartItem> {
    let item = cart.items.find((item) => item.product.id === product.id);
    // If product already exists in the ShoppingCart
    if (item) {
      item.quantity++;
      return this.cartItemService.update(item);
    } else {
      item = new ShoppingCartItem();
      item.product = product;
      item.quantity = 1;
      item.shoppingCart = cart;
      return this.cartItemService.create(item);
    }
  }

  removeFromCart(
    cart: ShoppingCart,
    product: Product
  ): Observable<ShoppingCartItem> {
    let item = cart.items.find((item) => item.product.id === product.id);
    if (item && item.quantity === 1)
      return this.cartItemService
        .delete(item.id)
        .pipe(map(() => new ShoppingCartItem()));
    if (item) {
      item.quantity--;
      return this.cartItemService.update(item);
    }
  }

  updateShoppingCart(shoppingCart: ShoppingCart) {
    return this.httpClient.put(
      `${environment.apiUrl}/shopping-cart/update`,
      shoppingCart
    );
  }

  deleteShoppingCart(id: number) {
    return this.httpClient.delete(
      `${environment.apiUrl}/shopping-carts/delete/${id}`
    );
  }
}

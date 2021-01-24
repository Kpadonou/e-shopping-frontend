import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromEvent, interval, Observable, of } from 'rxjs';
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

  public getTotalItemsAndPrice(): Observable<{
    totalItems: number;
    totalPrice: number;
  }> {
    return this.getOrCreateCart().pipe(
      switchMap((cart) => {
        let totalItems = 0;
        let totalPrice = 0;
        for (const item of cart.items) {
          totalItems += item.quantity;
          totalPrice += item.quantity * item.product.price;
        }
        return of({ totalItems: totalItems, totalPrice: totalPrice });
      })
    );
  }

  public getOrCreateCart(): Observable<ShoppingCart> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return this.getCartById(+cartId).pipe(
        switchMap((cart) => this.getItemsOfCart(cart.id)),
        map((items) => {
          let c = new ShoppingCart(items, +cartId);
          console.log(c);

          return c;
        })
      );
    }

    let cart = new ShoppingCart([]);
    return this.create(cart);
  }

  addToCart(product: Product) {
    this.getOrCreateCart().pipe(
      map((cart) => {
        // If new cart
        if (!localStorage.getItem('cartId')) {
          localStorage.setItem('cartId', `${cart.id}`);
        }
        this.shoppinCart = cart;
        let item = cart.items.find((item) => item.product.id === product.id);
        // If product already exists in the ShoppingCart
        if (item) {
          item.quantity++;
          this.cartItemService.update(item).pipe(
            map(() => {
              return true;
            })
          );
          // this.
        } else {
          item = new ShoppingCartItem();
          item.product = product;
          item.quantity = 1;
          item.shoppingCart = this.shoppinCart;
          this.cartItemService.create(item).pipe(
            map(() => {
              return true;
            })
          );
        }
      })
    );
  }

  removeFromCart(cart: ShoppingCart, product: Product) {
    let item = cart.items.find((item) => item.product.id === product.id);
    if (item) {
      item.quantity--;
      this.cartItemService.update(item).subscribe();
    }
  }

  public updateShoppingCart(shoppingCart: ShoppingCart) {
    return this.httpClient.put(
      `${environment.apiUrl}/shopping-cart/update`,
      shoppingCart
    );
  }

  public deleteShoppingCart(id: number) {
    return this.httpClient.delete(
      `${environment.apiUrl}/shopping-carts/delete/${id}`
    );
  }

  /* getQuantityOfAnItem(shoppingCart: ShoppingCart, product: Product): number {
    // if (!this.shoppingCart) return 0;
    const item = this.shoppingCart.items.find(
      (item) => item.product.id === this.product.id
    );
    return item ? item.quantity : 0;
  } */
}

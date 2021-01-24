import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.shoppingCart, this.product);
  }
  getQuantity(): number {
    if (!this.shoppingCart) return 0;
    const item = this.shoppingCart.items.find(
      (item) => item.product.id === this.product.id
    );
    return item ? item.quantity : 0;
  }
}

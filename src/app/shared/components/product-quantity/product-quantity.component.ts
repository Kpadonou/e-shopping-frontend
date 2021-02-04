import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
    this.cartService.getOrCreateCart().subscribe((cart) => {
      this.shoppingCart = cart;
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product).subscribe();
  }

  removeFromCart() {
    this.cartService
      .removeFromCart(this.shoppingCart, this.product)
      .subscribe();
  }
}

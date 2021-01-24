import { Component, Input, OnChanges } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnChanges {
  @Input('product') product: Product;
  @Input('showActions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  quantity = 0;
  constructor(private cartService: ShoppingCartService) {}

  ngOnChanges(): void {
    this.quantity = this.getQuantity();
  }

  addToCart() {
    // if (this.cartService.addToCart(product)) this.quantity = this.quantity + 1;
    this.cartService.addToCart(this.product);
    this.quantity++;
  }
  getQuantity(): number {
    if (!this.shoppingCart) return 0;
    const item = this.shoppingCart.items.find(
      (item) => item.product.id === this.product.id
    );
    return item ? item.quantity : 0;
  }
}

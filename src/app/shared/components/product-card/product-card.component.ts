import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('showActions') showActions = true;
  shoppingCart: ShoppingCart;
  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.cartService.getOrCreateCart().subscribe((cart) => {
      this.shoppingCart = cart;
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product).subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from '../shared/models/shopping-cart-item';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  totalItemsCount = 0;
  totalPrice = 0;
  cart$: Observable<ShoppingCart>;
  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.cartService.getTotalItemsAndPrice().subscribe((resp) => {
      this.totalItemsCount = resp.totalItems;
      this.totalPrice = resp.totalPrice;
    });
    this.cart$ = this.cartService.getOrCreateCart();
  }
}

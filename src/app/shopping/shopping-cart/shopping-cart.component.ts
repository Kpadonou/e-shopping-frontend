import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { ShoppingCartItemService } from '../../shared/services/shopping-cart-item.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  constructor(
    private cartService: ShoppingCartService,
    private itemsService: ShoppingCartItemService
  ) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.getOrCreateCart();
  }

  clearCart() {
    this.cart$.subscribe((cart) => {
      if (cart.items.length === 0) return;
      for (const item of cart.items) {
        this.itemsService.delete(item.id).subscribe();
      }
    });
  }
}

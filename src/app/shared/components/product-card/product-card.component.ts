import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { TotalItemNotifierService } from '../../services/total-item-notifier.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input('product') product: Product;
  @Input('showActions') showActions = true;
  shoppingCart: ShoppingCart;

  private subs = new SubSink();

  constructor(
    private cartService: ShoppingCartService,
    private totalItemNotifierService: TotalItemNotifierService
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.cartService.getOrCreateCart().subscribe((cart) => {
      this.shoppingCart = cart;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  addToCart() {
    this.cartService
      .addToCart(this.shoppingCart, this.product)
      .subscribe(() => {
        this.ngOnInit();
        this.totalItemNotifierService.changeSubject.next(1);
      });
  }

  showAddButton() {
    this.ngOnInit();
  }
}

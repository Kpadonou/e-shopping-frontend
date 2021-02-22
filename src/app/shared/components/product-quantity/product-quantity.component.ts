import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
} from '@angular/core';

import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { TotalItemNotifierService } from '../../services/total-item-notifier.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent implements OnDestroy {
  @Input('product') product: Product;
  shoppingCart: ShoppingCart;
  subs = new SubSink();
  @Output() onItemDelete: EventEmitter<Boolean> = new EventEmitter(false);
  @Output() onQuantityChange: EventEmitter<Boolean> = new EventEmitter(false);

  constructor(
    private cartService: ShoppingCartService,
    private totalItemNotifierService: TotalItemNotifierService
  ) {
    this.subs.sink = this.cartService.getOrCreateCart().subscribe((cart) => {
      this.shoppingCart = cart;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  addToCart() {
    this.subs.sink = this.cartService
      .addToCart(this.shoppingCart, this.product)
      .subscribe(() => {
        this.totalItemNotifierService.changeSubject.next(1);
        //Update quantity on shopping-cart page
        this.onQuantityChange.emit(true);
      });
  }

  removeFromCart() {
    this.subs.sink = this.cartService
      .removeFromCart(this.shoppingCart, this.product)
      .subscribe((resp) => {
        // If item has been deleted
        if (!resp.quantity) this.onItemDelete.emit(true);
        //Update cart item in navbar component
        this.totalItemNotifierService.changeSubject.next(-1);
        //Update quantity on shopping-cart page
        this.onQuantityChange.emit(true);
      });
  }
}

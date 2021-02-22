import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { ShoppingCartItemService } from '../../shared/services/shopping-cart-item.service';
import { SubSink } from 'subsink';
import { TotalItemNotifierService } from 'src/app/shared/services/total-item-notifier.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart$: Observable<ShoppingCart>;
  subs = new SubSink();
  constructor(
    private cartService: ShoppingCartService,
    private itemsService: ShoppingCartItemService,
    private totalItemNotifierService: TotalItemNotifierService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.getOrCreateCart();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  clearCart() {
    this.subs.sink = this.cart$.subscribe((cart) => {
      if (cart.items.length === 0) return;
      for (const item of cart.items) {
        this.subs.sink = this.itemsService.delete(item.id).subscribe(() => {
          this.totalItemNotifierService.changeSubject.next(2);
          this.toastService.showSuccess('Shopping cart cleared successfully');
          this.ngOnInit();
        });
      }
    });
  }

  updateQuantity(event: boolean) {
    if (event) this.ngOnInit();
  }
}

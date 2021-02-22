import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { AuthService } from '../shared/services/auth.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { TotalItemNotifierService } from '../shared/services/total-item-notifier.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  totalItem = 0;
  subs = new SubSink();
  constructor(
    public authService: AuthService,
    private cartService: ShoppingCartService,
    private totalItemNotifierService: TotalItemNotifierService
  ) {}

  ngOnInit() {
    let cart$ = this.cartService.getOrCreateCart();
    this.subs.sink = cart$.subscribe(
      (cart) => (this.totalItem = cart.totalItemsCount)
    );
    this.totalItemNotifierService.change$.subscribe((change) => {
      // Reset totalItem If order is placed otherwise update it
      this.totalItem = change === 2 ? 0 : (this.totalItem += change);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  logout() {
    this.authService.logout();
  }
}

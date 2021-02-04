import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { AuthService } from '../shared/services/auth.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  constructor(
    public authService: AuthService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.getOrCreateCart();
  }
  logout() {
    this.authService.logout();
  }
}

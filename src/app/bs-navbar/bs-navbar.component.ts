import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit {
  shoppingCartItemCount: number;
  constructor(
    public authService: AuthService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.cartService
      .getTotalItemsAndPrice()
      .subscribe((resp) => (this.shoppingCartItemCount = resp.totalItems));
  }
  logout() {
    this.authService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit {
  shoppingCartItemCount = 0;
  constructor(
    public authService: AuthService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.cartService
      .getItemsOfCart(+localStorage.getItem('cartId'))
      .subscribe((items) => {
        console.log(items);

        this.shoppingCartItemCount = 0;
        for (const item of items) {
          this.shoppingCartItemCount += item.quantity;
        }
      });
    /* this.cartService.getOrCreateCart().subscribe((cart) => {
      console.log(cart);

      this.cartService.getItemsOfCart(cart.id).subscribe((items) => {
        this.shoppingCartItemCount = 0;
        for (const item of items) {
          this.shoppingCartItemCount += item.quantity;
        }
      });
    }); */
  }
  logout() {
    this.authService.logout();
  }
}
